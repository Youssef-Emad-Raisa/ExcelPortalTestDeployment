import React from "react";
import "./AssumptionsSelector.scss";
import { APP_NS } from "../../..";
import { Dropdown, Option } from "../../poc-common/Lists";
import { Lookup, useLookup } from "../../../../../contexts/ParametersContext";
import useLocalStorageState from "../../../../../../hooks/useLocalStorage";
import LookupsList from "../LookupsList/LookupsList";
import Field from "../../poc-common/Field/Field";
import { LOOKUPS, PARAMETERS, ParameterType } from "../../../../../../poc-data";

const AssumptionsSelector = () => {
  const [parameters, setParameters] = useLocalStorageState<ParameterType[]>("economicParameters", PARAMETERS);
  const [lookups, setLookups] = useLocalStorageState<Lookup[]>("lookups", LOOKUPS);

  const { setLookup } = useLookup();
  React.useEffect(() => {
    // setLookup(LOOKUPS[0]);
  }, []);
  const [currentParameter, setCurrentParameter] = React.useState(0);
  console.log(typeof lookups);
  const filteredLookups = lookups ? lookups.filter((lookup) => lookup.parameterID === currentParameter) : [];
  return (
    <article className={APP_NS.assumptionsSelectorContainer.$}>
      <Field label="Select Economic Parameter">
        <Dropdown
          onOptionSelect={(_, d) => setCurrentParameter(Number(d.optionValue))}
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
