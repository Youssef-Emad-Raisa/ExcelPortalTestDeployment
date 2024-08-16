import React from "react";
import { DefinitionInfo } from "../common/Definitions/types";
import { clearFormating, ListenToSheetOnChange } from "../services/Excel services/Excel";
import { validate } from "../common/Validations/Validation";

const useWorksheetValidation = <T>(worksheetID: string, definitionInfo: DefinitionInfo<T>) => {
  const [isValidating, setIsValidating] = React.useState(false);
  const [errorsCount, setErrorsCount] = React.useState(-1);

  // Usecallback is used because the validator function rarly changes on rerender.
  // So to avoid useless rerenders because of refrence changes,
  // we memoized it, as it only changes when the workSheet changes or currentDefiniton
  const validatorFunction = React.useCallback(async () => {
    // clears all validations in sheet
    await clearFormating(worksheetID, definitionInfo.headerRowSpan);
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
      setIsValidating(false);
      cleaner.then((clean) => clean()).then(() => clearFormating(worksheetID, definitionInfo.headerRowSpan));
    };
  }, [isValidating, worksheetID, validatorFunction]);
  return { isValidating, setIsValidating, errorsCount };
};

export default useWorksheetValidation;
