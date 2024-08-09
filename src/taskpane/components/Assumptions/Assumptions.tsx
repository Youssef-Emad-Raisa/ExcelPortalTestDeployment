import React from "react";
import "./Assumptions.scss";
import { APP_NS } from "..";
import useWorksheets from "../../../hooks/useWorksheets";
import useDefinitions from "../../../hooks/useDefinitions";
import { Switch } from "@fluentui/react-components";
import DataTransformForm from "../DataTransformForm/DataTransformForm";
import DataValidation from "../DataValidationForm/DataValidation";
import UploadForm from "../DataTransferForm/UploadForm";
import Label from "../common/Label";

const Assumptions = () => {
  const [state] = useWorksheets();
  const { definitionsInfoList } = useDefinitions();
  const [showMapper, setShowMapper] = React.useState(false);
  return (
    <>
      <section className={APP_NS.assumptionsContainer.$}>
        <article>
          <Label>
            Target Sheet:&nbsp;
            {state.availableWorksheets.find((worksheetInfo) => state.activeWorksheetID === worksheetInfo.id)?.name}
          </Label>
        </article>
        <Switch label="Show Mapper" checked={showMapper} onChange={(ev) => setShowMapper(ev.target.checked)} />
        {showMapper && (
          <DataTransformForm worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
        )}
        <DataValidation worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
        <UploadForm worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
      </section>
    </>
  );
};

export default Assumptions;
