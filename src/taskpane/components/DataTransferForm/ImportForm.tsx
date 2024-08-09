import React from "react";
import { APP_NS, FORM_NS } from "..";
import { addMergedRow, addRange, clearSheet } from "../../../services/Excel services/Excel";
import { HEADER_OPTIONS, MERGED_HEADER_OPTIONS } from "../../../services/Excel services/ExcelOptions";
import {
  createArrayOfDefinitionColumnHeader,
  createMergedFieldsFromDefinitionHeaders,
  convertSchemaIntoDefinitionColumnsArray,
} from "../../../utils/definition-utils";
import { ResponseType } from "../../../services/schemas/lookupSchema";
import Label from "../common/Label";
import Button from "../common/Button";
import { DefinitionInfo } from "../../../common/Definitions/types";

type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const ImportForm = ({ worksheetID, definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const definition = definitionInfo.definition;
    clearSheet(worksheetID);
    addMergedRow(0, 0, worksheetID, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS);
    addRange(1, 0, worksheetID, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS);
    definitionInfo
      .get()
      .then((data: ResponseType) => {
        const flattenedData = data.assumptions.map((record) => {
          return {
            ...record,
            ...record.cluster,
          };
        });
        return addRange(
          2,
          0,
          worksheetID,
          flattenedData.map((record) => convertSchemaIntoDefinitionColumnsArray(record, definition)),
          { format: { columnWidth: 80 } }
        );
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Data Import</Label>
      </div>
      <div>
        <Button disabled={isLoading} type="submit">
          Import Data
        </Button>
      </div>
    </form>
  );
};

export default ImportForm;
