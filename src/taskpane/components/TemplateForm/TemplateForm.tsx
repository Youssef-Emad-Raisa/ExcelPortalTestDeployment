import React from "react";
import { APP_NS, FORM_NS } from "..";
import { addMergedRow, addRange, clearSheet } from "../../../services/Excel services/Excel";
import { HEADER_OPTIONS, MERGED_HEADER_OPTIONS } from "../../../services/Excel services/ExcelOptions";
import "./TemplateForm.scss";
import {
  createArrayOfDefinitionColumnHeader,
  createMergedFieldsFromDefinitionHeaders,
} from "../../../utils/definition-utils";
import Label from "../common/Label";
import Button from "../common/Button";
import { DefinitionInfo } from "../../../common/Definitions/types";

type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const TemplateForm = ({ worksheetID, definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const definition = definitionInfo.definition;
    clearSheet(worksheetID);
    addMergedRow(0, 0, worksheetID, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS);
    addRange(1, 0, worksheetID, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS);
  };

  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Template Maker</Label>
      </div>
      <div>
        <Button type="submit">Pull Template</Button>
      </div>
    </form>
  );
};

export default TemplateForm;
function updateWorksheets() {
  throw new Error("Function not implemented.");
}
