import React from "react";
import "./Assumptions.scss";
import { APP_NS } from "../..";
import useWorksheets from "../../../../hooks/useWorksheets";
import useDefinitions from "../../../../hooks/useDefinitions";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "@fluentui/react-components";
import DataTransformForm from "../../DataTransformForm/DataTransformForm";
import DataValidation from "../../DataValidationForm/DataValidation";
import UploadForm from "../../DataTransferForm/UploadForm";
import Label from "../../common/Label";

const Assumptions = () => {
  const [state] = useWorksheets();
  const { definitionsInfoList } = useDefinitions();
  return (
    <>
      <section className={APP_NS.assumptionsContainer.$}>
        <article>
          <Label>
            Target Sheet:&nbsp;
            {state.availableWorksheets.find((worksheetInfo) => state.activeWorksheetID === worksheetInfo.id)?.name}
          </Label>
        </article>
        <Accordion collapsible>
          <AccordionItem value="1">
            <AccordionHeader>Key Mapper</AccordionHeader>
            <AccordionPanel>
              <DataTransformForm worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <DataValidation worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
        <UploadForm worksheetID={state.activeWorksheetID} definitionInfo={definitionsInfoList[0]} />
      </section>
    </>
  );
};

export default Assumptions;
