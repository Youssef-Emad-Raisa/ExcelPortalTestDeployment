import React from "react";
import { APP_NS, FORM_NS } from "..";
import Label from "../common/Label";
import Button from "../common/Button";
import "./DataValidation.scss";
import { DefinitionInfo } from "../../../common/Definitions/types";
import useWorksheetValidation from "../../../hooks/useWorksheetValidation";
type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const DataValidation = ({ worksheetID, definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;
  const { isValidating, setIsValidating, errorsCount } = useWorksheetValidation(worksheetID, definitionInfo);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsValidating((prev) => !prev);
  };
  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Data Validation</Label>
      </div>
      <div>
        <Button appearance={isValidating ? "secondary" : "primary"} type="submit">
          {isValidating ? "Stop Validating" : "Start Validating"}
        </Button>
      </div>
      {isValidating && (
        <div>
          <Label className={APP_NS.label._.red(errorsCount > 0).green(errorsCount === 0).$}>
            Found {errorsCount} {errorsCount === 1 ? "Error" : "Errors"}!
          </Label>
        </div>
      )}
    </form>
  );
};

export default DataValidation;
