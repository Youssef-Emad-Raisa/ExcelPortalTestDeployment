import React from "react";
import "./Assumptions.scss";
import { APP_NS } from "../..";
import useWorksheets from "../../../../hooks/useWorksheets";
import useDefinitions from "../../../../hooks/useDefinitions";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Field, Input } from "@fluentui/react-components";
import Label from "../../common/Label";
import StepsProgressBar from "../../common/StepsProgressBar/StepsProgressBar";
import Step from "../../common/StepsProgressBar/Step/Step";
import Button from "../../common/Button";
import { TicketDiagonal16Filled } from "@fluentui/react-icons";
import DataTransformMap from "../../DataTransformMap/DataTransformMap";
import useWorksheetTransformation from "../../../../hooks/useWorksheetTransformation";
import { activateWorksheet, getUsedRows } from "../../../../services/Excel services/Excel";
import useWorksheetValidation from "../../../../hooks/useWorksheetValidation";
import { createRecordFromDefinitonValueRows } from "../../../../utils/definition-utils";
import ComboBox from "../../common/Lists/ComboBox";
import { DropDown, Option } from "../../common/Lists";

const Assumptions = () => {
  const labelContainer = APP_NS.labelContainer;
  const [state] = useWorksheets();
  const { definitionsInfoList } = useDefinitions();
  const {
    definitionKeysHeaderEquivalant,
    setDefinitionKeysHeaderEquivalant,
    accessKeys,
    worksheetHeaders,
    createTransformedWorkSheet,
  } = useWorksheetTransformation(state.activeWorksheetID, definitionsInfoList[0]);
  const { isValidating, setIsValidating, errorsCount } = useWorksheetValidation(
    state.activeWorksheetID,
    definitionsInfoList[0]
  );
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps = [
    {
      step: 1,
      label: "Data Transformation",
      button_label: "Transform",
      component: (
        <div className={APP_NS.flexGapped._.column.$}>
          <Accordion collapsible>
            <AccordionItem value="1">
              <AccordionHeader>Key Mapper</AccordionHeader>
              <AccordionPanel>
                <DataTransformMap
                  accessKeys={accessKeys}
                  worksheetHeaders={worksheetHeaders}
                  definitionKeysHeaderEquivalant={definitionKeysHeaderEquivalant}
                  setDefinitionKeysHeaderEquivalant={setDefinitionKeysHeaderEquivalant}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <div>
            <Button
              onClick={async () => {
                const transformedWorksheet = await createTransformedWorkSheet();
                setDefinitionKeysHeaderEquivalant({});
                activateWorksheet(transformedWorksheet);
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Transform
            </Button>
          </div>
        </div>
      ),
    },
    {
      step: 2,
      label: "Data Validation",
      button_label: "Next",
      component: (
        <>
          <div className={APP_NS.flexGapped.$}>
            <Button
              appearance={isValidating ? "secondary" : "primary"}
              onClick={() => {
                setIsValidating((prev) => !prev);
              }}
            >
              {isValidating ? "Stop Validating" : "Start Validating"}
            </Button>

            <Button
              disabled={!isValidating || errorsCount !== 0}
              onClick={() => {
                setIsValidating(false);
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Next
            </Button>
          </div>
          {isValidating && (
            <div>
              <Label className={APP_NS.label._.red(errorsCount > 0).green(errorsCount === 0).$}>
                Found {errorsCount} {errorsCount === 1 ? "Error" : "Errors"}!
              </Label>
            </div>
          )}
        </>
      ),
    },
    {
      step: 3,
      label: "Data Upload",
      button_label: "Upload",
      component: (
        <div className={APP_NS.flexGapped._.column.$}>
          <div>
            <Field label="Lookup Name">
              <Input type="text" placeholder="Enter Lookup Name" />
            </Field>
            <Field label="Tags">
              <DropDown placeholder="Select Tag" multiselect>
                <Option value="tag-1">Tag 1</Option>
                <Option value="tag-2">Tag 2</Option>
                <Option value="tag-3">Tag 3</Option>
              </DropDown>
            </Field>
          </div>
          <div>
            <Button
              disabled={errorsCount !== 0}
              onClick={() => {
                getUsedRows(state.activeWorksheetID, definitionsInfoList[0].headerRowSpan).then((values) => {
                  const definition = definitionsInfoList[0].definition;
                  values = values.map((row) => row.map((item) => (item === "" ? null : item)));
                  const data = values.map((row) => createRecordFromDefinitonValueRows(definition, row));
                  definitionsInfoList[0]
                    .post(data)
                    .then(() => setCurrentStep((prev) => prev + 1))
                    .catch((err) => console.dir(err));
                });
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      ),
    },
    {
      step: 4,
      label: "All Done!",
    },
  ];
  return (
    <section className={APP_NS.assumptionsContainer.$}>
      <div className={APP_NS.stepsContainer.$}>
        <Label>
          {state.availableWorksheets.find((worksheetInfo) => state.activeWorksheetID === worksheetInfo.id)?.name}
        </Label>
        <StepsProgressBar currentStep={currentStep}>
          <Step>
            <Label>1</Label>
          </Step>
          <Step>
            <Label>2</Label>
          </Step>
          <Step>
            <Label>3</Label>
          </Step>
          <Step>
            <TicketDiagonal16Filled />
          </Step>
        </StepsProgressBar>
        <div className={APP_NS.flexGapped._.column.$}>
          <div className={labelContainer.$}>
            <Label weight="semibold">{steps.find((step) => step.step === currentStep).label}</Label>
          </div>
          <div>{steps.find((step) => step.step === currentStep).component}</div>
        </div>
      </div>
      <div className={APP_NS.navigationButtonsContainer.$}>
        <Button disabled={currentStep === 1} onClick={() => setCurrentStep((prev) => prev - 1)}>
          Back
        </Button>
        <Button disabled={currentStep === steps.length} onClick={() => setCurrentStep((prev) => prev + 1)}>
          Skip
        </Button>
      </div>
    </section>
  );
};

export default Assumptions;
