import React from "react";
import { APP_NS } from "../../..";
import { Lookup, useLookup } from "../../../../../contexts/LookupContext";
import "./LookupsList.scss";
import Field from "../../poc-common/Field";
import ActionLink from "../../poc-common/ActionLink";
import { useWorksheetRelation } from "../../../../../contexts/WorksheetContext";
import {
  activateWorksheet,
  addMergedRow,
  addRange,
  createNewWorksheet,
} from "../../../../../services/Excel services/Excel";
import {
  convertSchemaIntoDefinitionColumnsArray,
  createArrayOfDefinitionColumnHeader,
  createMergedFieldsFromDefinitionHeaders,
} from "../../../../../utils/definition-utils";
import { HEADER_OPTIONS, MERGED_HEADER_OPTIONS } from "../../../../../services/Excel services/ExcelOptions";
import assumptions from "../../../../../../assumptions";
import { PARAMETERS } from "../../../../../../poc-data";
import { Definition } from "../../../../../common/Definitions/types";

type Props = {
  items: Lookup[];
  currentParameter: number;
};
function buildWorksheet<T>(targetWorksheet: string, definition: Definition<T>[], data: any[][]) {
  return Promise.all([
    addMergedRow(0, 0, targetWorksheet, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS),
    addRange(1, 0, targetWorksheet, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS),
    addRange(2, 0, targetWorksheet, data, { format: { columnWidth: 80 } }),
  ]);
}

const LookupsList = ({ items, currentParameter }: Props) => {
  const [activeLookup, setActiveLookup] = React.useState(-1);
  const { lookup, setLookup } = useLookup();
  const { relations, setRelations } = useWorksheetRelation();
  return (
    <div className={APP_NS.listActionContainer.$}>
      <Field label="Parameter Lookups">
        <div id="lookups-list" className={APP_NS.listContainer.$}>
          <div
            className={APP_NS.listContainer.item.active(activeLookup === -1).$}
            onClick={() => setActiveLookup(-1)}
            onDoubleClick={async () => {
              const filteredRelations = relations.filter((relation) => relation.lookupID !== -1);
              const parameter = PARAMETERS.find((param) => param.id === currentParameter);
              const fakeID = Date.now().toString();
              const worksheetID = await createNewWorksheet(
                "New Lookup" + " | " + fakeID.slice((2 * fakeID.length) / 3)
              );
              await activateWorksheet(worksheetID);
              await buildWorksheet(worksheetID, parameter.definitionInfo.definition, []).then();
              setLookup({ id: -1, parameterID: currentParameter, lookupName: "New Lookup" });
              setRelations([...filteredRelations, { lookupID: -1, worksheetID: worksheetID }]);
            }}
          >
            <p>+ New Lookup</p>
          </div>
          {items.map((lookup) => (
            <div
              className={APP_NS.listContainer.item.active(activeLookup === lookup.id).$}
              onClick={() => setActiveLookup(lookup.id)}
              onDoubleClick={async () => {
                const filteredRelations = relations.filter((relation) => relation.lookupID !== lookup.id);
                const fakeID = Date.now().toString();
                const worksheetID = await createNewWorksheet(
                  lookup.lookupName + " | " + fakeID.slice((2 * fakeID.length) / 3)
                );
                const parameter = PARAMETERS.find((param) => param.id === currentParameter);
                await activateWorksheet(worksheetID);
                await buildWorksheet(
                  worksheetID,
                  parameter.definitionInfo.definition,
                  lookup.assumptions
                    .map((assumption) => parameter.definitionInfo.flat(assumption))
                    .map((record) =>
                      convertSchemaIntoDefinitionColumnsArray(record, parameter.definitionInfo.definition)
                    )
                );
                setRelations([...filteredRelations, { lookupID: lookup.id, worksheetID: worksheetID }]);
                setLookup(lookup);
              }}
              key={lookup.id}
            >
              <p>{lookup.lookupName}</p>
            </div>
          ))}
        </div>
      </Field>
      <div>
        <ActionLink
          action={async () => {
            const parameter = PARAMETERS.find((param) => param.id === currentParameter);
            const fakeID = Date.now().toString();
            const targetWorksheet = await createNewWorksheet(
              "Assumptions Sheet" + " | " + fakeID.slice((2 * fakeID.length) / 3)
            );
            buildWorksheet(
              targetWorksheet,
              parameter.definitionInfo.definition,
              assumptions
                .map((assumption) => parameter.definitionInfo.flat(assumption))
                .map((record) => convertSchemaIntoDefinitionColumnsArray(record, parameter.definitionInfo.definition))
            );
            activateWorksheet(targetWorksheet);
          }}
        >
          Open Assumptions Sheet
        </ActionLink>
      </div>
    </div>
  );
};

export default LookupsList;
