import React from "react";
import { APP_NS, FORM_NS } from "..";
import Label from "../common/Label";
import Button from "../common/Button";
import "./DataTransformForm.scss";
import { Divider } from "@fluentui/react-components";
import { DefinitionInfo } from "../../../common/Definitions/types";
import useWorksheetTransformation from "../../../hooks/useWorksheetTransformation";
import { activateWorksheet } from "../../../services/Excel services/Excel";
import DataTransformMap from "../DataTransformMap/DataTransformMap";
type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const DataTransformForm = ({ worksheetID, definitionInfo: definitionInfo }: Props) => {
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;

  const {
    definitionKeysHeaderEquivalant,
    setDefinitionKeysHeaderEquivalant,
    accessKeys,
    worksheetHeaders,
    createTransformedWorkSheet,
  } = useWorksheetTransformation(worksheetID, definitionInfo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transformedWorksheet = await createTransformedWorkSheet();
    activateWorksheet(transformedWorksheet);
  };

  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Data Transform</Label>
      </div>
      {definitionInfo && (
        <>
          <Divider>Keys Map</Divider>
          <DataTransformMap
            accessKeys={accessKeys}
            worksheetHeaders={worksheetHeaders}
            definitionKeysHeaderEquivalant={definitionKeysHeaderEquivalant}
            setDefinitionKeysHeaderEquivalant={setDefinitionKeysHeaderEquivalant}
          />
        </>
      )}
      <div>
        <Button type="submit">Transform</Button>
      </div>
    </form>
  );
};

export default DataTransformForm;
