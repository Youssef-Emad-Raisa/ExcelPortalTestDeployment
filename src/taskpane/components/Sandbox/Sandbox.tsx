import * as React from "react";
import "./Sandbox.scss";
import { DropDown, Option } from "../common/Lists";
import Label from "../common/Label";
import useWorksheets from "../../../hooks/useWorksheets";
import TemplateForm from "../TemplateForm";
import {
  CalendarMonthRegular,
  Checkbox1Regular,
  ArrowBidirectionalUpDownFilled,
  ShapeIntersectFilled,
} from "@fluentui/react-icons";
import { WorksheetInfo } from "../../../services/types";
import DataTransfer from "../DataTransferForm";
import { Tab, TabList } from "../common/TabList";
import DataValidation from "../DataValidationForm/DataValidation";
import DataTransformForm from "../DataTransformForm/DataTransformForm";
import { APP_NS } from "..";
import useDefinitions from "../../../hooks/useDefinitions";

interface Props {
  title: string;
}

const Sandbox = (props: Props) => {
  const container = APP_NS.headerContainer;
  const dropDownContainer = APP_NS.dropdownContainer;
  const sectionContainer = APP_NS.section;
  const [state] = useWorksheets();
  const [currentMode, setCurrentMode] = React.useState(0);
  const [targetSheet, setTargetSheet] = React.useState<WorksheetInfo>();
  const { currentDefinitionInfo, setCurrentDefinitionInfo, definitionsInfoList } = useDefinitions();
  const BUTTONNED_NAVIGATION = [
    {
      name: "Template Maker",
      icon: <CalendarMonthRegular />,
      component: <TemplateForm definitionInfo={currentDefinitionInfo} worksheetID={targetSheet?.id} />,
    },
    {
      name: "Data Validation",
      icon: <Checkbox1Regular />,
      component: <DataValidation definitionInfo={currentDefinitionInfo} worksheetID={targetSheet?.id} />,
    },
    {
      name: "Data Transfer",
      icon: <ArrowBidirectionalUpDownFilled />,
      component: <DataTransfer definitionInfo={currentDefinitionInfo} worksheetID={targetSheet?.id} />,
    },
    {
      name: "Data Transform",
      icon: <ShapeIntersectFilled />,
      component: <DataTransformForm definitionInfo={currentDefinitionInfo} worksheetID={targetSheet?.id} />,
    },
  ];
  return (
    <>
      <section>
        <div className={container.$}>
          <Label>{props.title}</Label>
        </div>
      </section>
      <section>
        <div className={dropDownContainer.$}>
          <Label weight="regular" size="small">
            Target Sheet
          </Label>
          <DropDown
            onOptionSelect={(_, data) =>
              setTargetSheet(state.availableWorksheets.find((worksheet) => worksheet.id === data.optionValue))
            }
            placeholder="Select Target Sheet"
          >
            {state.availableWorksheets.map((worksheet) => (
              <Option key={worksheet.id} value={worksheet.id}>
                {worksheet.name}
              </Option>
            ))}
          </DropDown>
        </div>
      </section>
      <section>
        <div className={dropDownContainer.$}>
          <Label weight="regular" size="small">
            Definition Type
          </Label>
          <DropDown
            onOptionSelect={(_, data) =>
              setCurrentDefinitionInfo(
                definitionsInfoList.find((definitionInfo) => definitionInfo.id === Number(data.optionValue))
              )
            }
            placeholder="Select Definition"
          >
            {definitionsInfoList.map((definition) => (
              <Option key={definition.id} value={definition.id.toString()}>
                {definition.name}
              </Option>
            ))}
          </DropDown>
        </div>
      </section>
      <section className={sectionContainer._.paddedBorder.$}>{BUTTONNED_NAVIGATION[currentMode].component}</section>
      <section className={sectionContainer._.paddedBorder.$}>
        <TabList
          defaultSelectedValue={currentMode}
          onTabSelect={(_, data) => setCurrentMode(data.value as number)}
          vertical
        >
          {BUTTONNED_NAVIGATION.map((mode, index) => (
            <Tab key={mode.name} icon={mode.icon} value={index}>
              {mode.name.toUpperCase()}
            </Tab>
          ))}
        </TabList>
      </section>
    </>
  );
};

export default Sandbox;
