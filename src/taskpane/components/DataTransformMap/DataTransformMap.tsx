import React from "react";
import { APP_NS } from "..";
import { Option } from "../common/Lists";
import Label from "../common/Label";
import "./DataTransformMap.scss";
import ComboBox from "../common/Lists/ComboBox";

type Props = {
  definitionKeysHeaderEquivalant: {};
  setDefinitionKeysHeaderEquivalant: React.Dispatch<any>;
  accessKeys: any[];
  worksheetHeaders: any[];
};

const DataTransformMap = ({
  definitionKeysHeaderEquivalant,
  setDefinitionKeysHeaderEquivalant,
  accessKeys,
  worksheetHeaders,
}: Props) => {
  const dropDownContainer = APP_NS.dropdownContainer;

  return (
    <div className={APP_NS.transformMapContainer.$}>
      {accessKeys.map((key: string) => (
        <div className={dropDownContainer.$} key={key}>
          <Label weight="semibold" size="medium">
            {key}
          </Label>
          <ComboBox
            placeholder="Select Key"
            onOptionSelect={(_, data) =>
              setDefinitionKeysHeaderEquivalant({ ...definitionKeysHeaderEquivalant, [key]: data.optionValue })
            }
            clearable
          >
            {worksheetHeaders.map((header) => (
              <Option value={header} key={key + "|" + header}>
                {header}
              </Option>
            ))}
          </ComboBox>
        </div>
      ))}
    </div>
  );
};

export default DataTransformMap;
