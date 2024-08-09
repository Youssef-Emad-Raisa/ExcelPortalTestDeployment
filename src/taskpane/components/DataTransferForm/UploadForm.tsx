import React from "react";
import { APP_NS, FORM_NS } from "..";
import { getUsedRows } from "../../../services/Excel services/Excel";
import { createRecordFromDefinitonValueRows } from "../../../utils/definition-utils";
import Label from "../common/Label";
import Button from "../common/Button";
import { DefinitionInfo } from "../../../common/Definitions/types";

type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const UploadForm = ({ worksheetID, definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    getUsedRows(worksheetID, definitionInfo.headerRowSpan).then((values) => {
      const definition = definitionInfo.definition;
      values = values.map((row) => row.map((item) => (item === "" ? null : item)));
      const data = values.map((row) => createRecordFromDefinitonValueRows(definition, row));
      definitionInfo
        .post(data)
        .then()
        .catch((err) => console.dir(err))
        .finally(() => setIsLoading(false));
    });
  };
  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Data Upload</Label>
      </div>
      <div>
        <Button disabled={isLoading} type="submit">
          Uplaod Data
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
