import React from "react";

import { Tab, TabList } from "../common/TabList";
import { ArrowDownRegular, ArrowUpRegular } from "@fluentui/react-icons";
import ImportForm from "./ImportForm";
import UploadForm from "./UploadForm";
import { DefinitionInfo } from "../../../common/Definitions/types";

type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const DataTransfer = ({ worksheetID, definitionInfo }: Props) => {
  const MODES = [
    {
      name: "import",
      icon: <ArrowDownRegular />,
      component: <ImportForm definitionInfo={definitionInfo} worksheetID={worksheetID} />,
    },
    {
      name: "upload",
      icon: <ArrowUpRegular />,
      component: <UploadForm definitionInfo={definitionInfo} worksheetID={worksheetID} />,
    },
  ];
  const [currentMode, setCurrentMode] = React.useState(0);

  return (
    <>
      <TabList defaultSelectedValue={currentMode} onTabSelect={(_, data) => setCurrentMode(data.value as number)}>
        {MODES.map((mode, index) => (
          <Tab key={mode.name} icon={mode.icon} value={index}>
            {mode.name.toUpperCase()}
          </Tab>
        ))}
      </TabList>
      {MODES[currentMode].component}
    </>
  );
};

export default DataTransfer;
