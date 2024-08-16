import React from "react";
import { addMergedRow, addRange, createNewWorksheet, getRow, getUsedRows } from "../services/Excel services/Excel";
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
  React.useEffect(() => {
    if (worksheetID === "" || worksheetID === undefined) return;
    getRow(worksheetID, 0).then((headers) => setWorksheetHeaders(headers));
  }, [worksheetID]);

  const accessKeys = definitonInfo ? createArrayOfDefinitionColumnAccessKey(definitonInfo.definition) : [];

  const createTransformedWorkSheet = async () => {
    const rows = await getUsedRows(worksheetID, 1);

    const altRecords = rows.map((row) =>
      row
        .map((item, index) => [worksheetHeaders[index], item])
        .reduce((result, [key, value]) => {
          result[key] = value;
          return result;
        }, {})
    );
    const newWorksheetID = await createNewWorksheet();

    const transformation = altRecords.map((record) =>
      accessKeys.map((key) => {
        if (definitionKeysHeaderEquivalant[key] === undefined) return "";
        return record[definitionKeysHeaderEquivalant[key] as string];
      })
    );
    const definition = definitonInfo.definition;
    addMergedRow(0, 0, newWorksheetID, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS);
    addRange(1, 0, newWorksheetID, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS);
    addRange(2, 0, newWorksheetID, transformation, { format: { columnWidth: 80 } });

    return newWorksheetID;
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
