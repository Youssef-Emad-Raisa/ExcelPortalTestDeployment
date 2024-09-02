import React from "react";
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
import { useWorksheetRelation } from "../../../../../contexts/WorksheetContext";
import Field from "../../poc-common/Field";
import useWorksheets from "../../../../../hooks/useWorksheets";
import Button from "../../poc-common/Button";
import { activateWorksheet } from "../../../../../services/Excel services/Excel";
const ColumnMapping = () => {
  const { lookup } = useLookup();
  const definitionInfo = PARAMETERS.find((parameter) => parameter.id === lookup.parameterID).definitionInfo;
  const definition = definitionInfo.definition as Definition<FlattenedRecord>[];
  const [state] = useWorksheets();
  const { relations, setRelations } = useWorksheetRelation();
  const relation = relations.find((relation) => relation.lookupID === lookup.id);
  const {
    worksheetHeaders,
    setDefinitionKeysHeaderEquivalant,
    definitionKeysHeaderEquivalant,
    createTransformedWorkSheet,
  } = useWorksheetTransformation(state.activeWorksheetID, definitionInfo);
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
                <Combobox
                  placeholder="Select header"
                  value={definitionKeysHeaderEquivalant[item.accessorKey]}
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
                </Combobox>
              </Field>
            ))}
          </div>
        </div>
      ))}
      <div>
        <Button
          onClick={async () => {
            const transformedWorksheet = await createTransformedWorkSheet();
            setDefinitionKeysHeaderEquivalant({});
            activateWorksheet(transformedWorksheet);
          }}
        >
          Transform
        </Button>
      </div>
    </div>
  );
};

export default ColumnMapping;
