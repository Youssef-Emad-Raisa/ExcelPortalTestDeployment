import React from "react";
import {
  addMergedRow,
  addRange,
  appendRange,
  createNewWorksheet,
  getRow,
  getUsedRows,
  ListenToSheetOnChange,
} from "../services/Excel services/Excel";
import {
  createArrayOfDefinitionColumnAccessKey,
  createArrayOfDefinitionColumnHeader,
  createMergedFieldsFromDefinitionHeaders,
} from "../utils/definition-utils";
import { DefinitionInfo } from "../common/Definitions/types";
import { HEADER_OPTIONS, MERGED_HEADER_OPTIONS } from "../services/Excel services/ExcelOptions";

const useWorksheetTransformation = <T>(worksheetID: string, definitonInfo: DefinitionInfo<T>) => {
  const [worksheetHeaders, setWorksheetHeaders] = React.useState([]);
  const [definitionKeysHeaderEquivalant, setDefinitionKeysHeaderEquivalant] = React.useState<T>({} as T);
  const getHeadersFromSheet = React.useCallback(() => {
    getRow(worksheetID, 0).then((headers) => setWorksheetHeaders(headers.filter((header) => header !== "")));
  }, [worksheetID]);

  React.useEffect(() => {
    if (worksheetID === "" || worksheetID === undefined) return undefined;
    // gets the first row of the sheet and stores its values as the headers
    getHeadersFromSheet();
    const cleanerPromise = ListenToSheetOnChange(worksheetID, () => {
      getHeadersFromSheet();
    });
    return () => {
      cleanerPromise.then((cleanerFunc) => cleanerFunc());
    };
  }, [worksheetID]);

  // gets header keys from the definition passed
  const accessKeys = definitonInfo ? createArrayOfDefinitionColumnAccessKey(definitonInfo.definition) : [];

  // creates transformed worksheet based on the definition keys
  const createTransformedWorkSheet = async (targetWorksheetID: string = "") => {
    const rows = await getUsedRows(worksheetID, 1);

    const altRecords = rows.map((row) =>
      row
        .map((item, index) => [worksheetHeaders[index], item])
        .reduce((result, [key, value]) => {
          result[key] = value;
          return result;
        }, {})
    );
    const targetWorksheet = targetWorksheetID === "" ? await createNewWorksheet() : targetWorksheetID;

    const transformation = altRecords.map((record) =>
      accessKeys.map((key) => {
        if (definitionKeysHeaderEquivalant[key] === undefined) return "";
        return record[definitionKeysHeaderEquivalant[key] as string];
      })
    );
    const definition = definitonInfo.definition;
    if (!targetWorksheetID) {
      addMergedRow(0, 0, targetWorksheet, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS);
      addRange(1, 0, targetWorksheet, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS);
    }
    appendRange(targetWorksheet, transformation, { format: { columnWidth: 80 } });

    return targetWorksheet;
  };
  return {
    definitionKeysHeaderEquivalant,
    setDefinitionKeysHeaderEquivalant,
    accessKeys,
    worksheetHeaders,
    createTransformedWorkSheet,
  };
};

export default useWorksheetTransformation;
