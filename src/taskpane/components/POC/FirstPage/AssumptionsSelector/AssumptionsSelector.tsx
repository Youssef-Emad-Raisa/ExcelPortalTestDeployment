import React, { useEffect } from "react";
import "./AssumptionsSelector.scss";
import { APP_NS } from "../../..";
import { Dropdown, Option } from "../../poc-common/Lists";
import { Lookup, useLookup } from "../../../../../contexts/LookupContext";
import useLocalStorageState from "../../../../../../hooks/useLocalStorage";
import LookupsList from "../LookupsList/LookupsList";
import Field from "../../poc-common/Field/Field";
import { PARAMETERS, ParameterType } from "../../../../../../poc-data";

const AssumptionsSelector = () => {
  const [parameters] = useLocalStorageState<ParameterType<any>[]>("economicParameters", PARAMETERS);
  const [lookups] = useLocalStorageState<Lookup[]>("lookups", []);
  const { lookup, setLookup } = useLookup();
  const [currentParameter, setCurrentParameter] = React.useState(0);
  const filteredLookups = lookups.filter((lookup) => lookup.parameterID === currentParameter);
  useEffect(() => {
    setLookup({ ...lookup, parameterID: 0 });
  }, []);
  return (
    <article className={APP_NS.assumptionsSelectorContainer.$}>
      <Field label="Select Economic Parameter">
        <Dropdown
          onOptionSelect={(_, d) => {
            setCurrentParameter(Number(d.optionValue));
            setLookup({ ...lookup, parameterID: Number(d.optionValue) });
          }}
          defaultSelectedOptions={[parameters.find((parameter) => parameter.id === currentParameter).id.toString()]}
          defaultValue={parameters.find((parameter) => parameter.id === currentParameter).name}
        >
          {parameters.map((parameter) => (
            <Option key={parameter.id} value={parameter.id.toString()}>
              {parameter.name}
            </Option>
          ))}
        </Dropdown>
      </Field>
      <LookupsList items={filteredLookups} currentParameter={currentParameter} />
    </article>
  );
};

export default AssumptionsSelector;
