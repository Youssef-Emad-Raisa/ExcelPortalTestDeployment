import React from "react";
import { APP_NS } from "../../..";
import { useLookup } from "../../../../../contexts/ParametersContext";
import "./LookupsList.scss";
import Field from "../../poc-common/Field";
import ActionLink from "../../poc-common/ActionLink";

type Props = {
  items: any[];
  currentParameter: number;
};

const LookupsList = ({ items, currentParameter }: Props) => {
  const [activeLookup, setActiveLookup] = React.useState(-1);
  const { setLookup } = useLookup();
  return (
    <div className={APP_NS.listActionContainer.$}>
      <Field label="Parameter Lookups">
        <div id="lookups-list" className={APP_NS.listContainer.$}>
          <div
            className={APP_NS.listContainer.item.active(activeLookup === -1).$}
            onClick={() => setActiveLookup(-1)}
            onDoubleClick={() => setLookup({ id: -1, parameterID: currentParameter, lookupName: "New Lookup" })}
          >
            <p>+ New Lookup</p>
          </div>
          {items.map((lookup) => (
            <div
              className={APP_NS.listContainer.item.active(activeLookup === lookup.id).$}
              onClick={() => setActiveLookup(lookup.id)}
              onDoubleClick={() => setLookup(lookup)}
              key={lookup.id}
            >
              <p>{lookup.lookupName}</p>
            </div>
          ))}
        </div>
      </Field>
      <div>
        <ActionLink action={() => console.log("Hello World")}>Open Assumptions Sheet</ActionLink>
      </div>
    </div>
  );
};

export default LookupsList;
