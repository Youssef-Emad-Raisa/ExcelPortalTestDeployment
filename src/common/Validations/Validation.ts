import { getContext, getUsedRows, formatCell } from "../../services/Excel services/Excel";
import { createRecordFromDefinitonValueRows, getAccessKeyIndexInDefinition } from "../../utils/definition-utils";
import { DefinitionInfo } from "../Definitions/types";

/**
 * Validate function that validates worksheet based on definiton and defintion validators
 *
 * @param {string} worksheetID
 * @param {DefinitionInfo<T>} definitionInfo
 * @returns {*} Count of invalid cells
 */
export const validate = async <T>(worksheetID: string, definitionInfo: DefinitionInfo<T>) => {
  // get all values in worksheet as 2d array except the offset of headerRowSpan which are the table headers
  const values = await getUsedRows(worksheetID, definitionInfo.headerRowSpan);
  // converts the 2d array into records array where each value has a key based on the Definiton used
  const records = values.map((row) => createRecordFromDefinitonValueRows(definitionInfo.definition, row));
  // creating a shared context for optimzation.
  const context = await getContext();
  // count of all invalid cells
  let invalidCellsCount = 0;
  // loop over each validator
  definitionInfo.validators.forEach((validator) => {
    // foreshadowing note: the row index would be based on array index
    // gets target cell columns indexs that would be formatted and colored if they are invalid
    const targetColumnsIndexs = validator.affectedFields.map((field) =>
      getAccessKeyIndexInDefinition(definitionInfo.definition, field)
    );
    // result array of validation results of column. If a cell is valid it will return null.
    const validationResults = records.map((record) => validator.validate(record));
    validationResults.forEach((result, index) => {
      // checks if the cell is valid
      if (result === null) return;
      // adds all affected cells from validation
      invalidCellsCount += targetColumnsIndexs.length;
      // loops over all columns that need to be formatted and formats them.
      targetColumnsIndexs.forEach((targetColumnIndex) =>
        formatCell(
          context,
          worksheetID,
          index + definitionInfo.headerRowSpan,
          targetColumnIndex,
          validator.errColor,
          result.errTitle,
          result.errMsg
        )
      );
    });
  });
  // syncing shared context.
  await context.sync();
  return invalidCellsCount;
};
