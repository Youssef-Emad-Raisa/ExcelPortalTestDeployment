import React, { useEffect } from "react";
import "./ColumnMappin.scss";
import { APP_NS } from "../../..";
import { useLookup } from "../../../../../contexts/LookupContext";
import { PARAMETERS } from "../../../../../../poc-data";
import { Definition } from "../../../../../common/Definitions/types";
import { FlattenedRecord } from "../../../../../common/Definitions/Definitions";
import Label from "../../poc-common/Label/Label";
import Combobox from "../../poc-common/Lists/Option/Combobox";
import Option from "../../poc-common/Lists/Option/Option";
import useWorksheetTransformation from "../../../../../hooks/useWorksheetTransformation";
import Field from "../../poc-common/Field";
import useWorksheets from "../../../../../hooks/useWorksheets";
import Button from "../../poc-common/Button";
import { activateWorksheet } from "../../../../../services/Excel services/Excel";
import { Dropdown } from "../../poc-common/Lists";
const ColumnMapping = () => {
  const { lookup } = useLookup();
  const definitionInfo = PARAMETERS.find((parameter) => parameter.id === lookup.parameterID).definitionInfo;
  const definition = definitionInfo.definition as Definition<FlattenedRecord>[];
  const [state] = useWorksheets();
  const {
    worksheetHeaders,
    setDefinitionKeysHeaderEquivalant,
    definitionKeysHeaderEquivalant,
    createTransformedWorkSheet,
  } = useWorksheetTransformation(state.activeWorksheetID, definitionInfo);

  useEffect(() => {
    return () => setDefinitionKeysHeaderEquivalant({});
  }, []);
  return (
    <div className={APP_NS.columnMappingContainer.$}>
      {definition.map((group) => (
        <div className={APP_NS.group.$} key={group.header}>
          <div className={APP_NS.group.label.$}>
            <Label>{group.header}</Label>
          </div>
          <div className={APP_NS.group.fields.$}>
            {group.columns.map((item) => (
              <Field label={item.colHeaderTitle} key={item.accessorKey}>
                <Dropdown
                  placeholder="Select header"
                  onOptionSelect={(_, data) =>
                    setDefinitionKeysHeaderEquivalant({
                      ...definitionKeysHeaderEquivalant,
                      [item.accessorKey]: data.optionValue,
                    })
                  }
                  clearable
                >
                  {worksheetHeaders.map((header) => (
                    <Option value={header} key={item.accessorKey + "|" + header}>
                      {header}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
            ))}
          </div>
        </div>
      ))}
      <div>
        <Button
          onClick={async () => {
            const fakeID = Date.now().toString();
            // const name = state.availableWorksheets.find((worksheet) => worksheet.id === state.activeWorksheetID).name;
            const transformedWorksheet = await createTransformedWorkSheet(
              "Reformatted | " + fakeID.slice((2 * fakeID.length) / 3)
            );
            activateWorksheet(transformedWorksheet);
          }}
        >
          Reformat
        </Button>
      </div>
    </div>
  );
};

export default ColumnMapping;
