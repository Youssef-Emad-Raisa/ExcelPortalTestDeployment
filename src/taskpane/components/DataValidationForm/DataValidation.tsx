import React from "react";
import { ListenToSheetOnChange, clearValidations } from "../../../services/Excel services/Excel";
import { APP_NS, FORM_NS } from "..";
import Label from "../common/Label";
import Button from "../common/Button";
import { validate } from "../../../common/Validations/Validation";
import "./DataValidation.scss";
import { DefinitionInfo } from "../../../common/Definitions/types";
type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const DataValidation = ({ worksheetID, definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;
  const [isValidating, setIsValidating] = React.useState(false);
  const [errorsCount, setErrorsCount] = React.useState(0);

  // Usecallback is used because the validator function rarly changes on rerender.
  // So to avoid useless rerenders because of refrence changes,
  // we memoized it, as it only changes when the workSheet changes or currentDefiniton
  const validatorFunction = React.useCallback(async () => {
    // clears all validations in sheet
    await clearValidations(worksheetID, definitionInfo.headerRowSpan);
    // validates worksheet based on definiton validators
    const errCount = await validate(worksheetID, definitionInfo);
    setErrorsCount(errCount);
  }, [worksheetID, definitionInfo]);
  React.useEffect(() => {
    if (!isValidating) return undefined;
    // first validate of worksheet once validation is turned on
    validatorFunction();
    // attaching validator function to worksheet changes and storing
    // cleaner function used to dettach validatorFunction
    const cleaner = ListenToSheetOnChange(worksheetID, validatorFunction);

    // return cleaner function that dettaches worksheet listener and clears validations
    return () => {
      cleaner.then((clean) => clean()).then(() => clearValidations(worksheetID, definitionInfo.headerRowSpan));
    };
  }, [isValidating, worksheetID, validatorFunction]);
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
