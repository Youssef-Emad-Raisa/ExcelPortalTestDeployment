import React from "react";
import { APP_NS, FORM_NS } from "..";
import { Option } from "../common/Lists";
import Label from "../common/Label";
import Button from "../common/Button";
import {
  createArrayOfDefinitionColumnAccessKey,
  createArrayOfDefinitionColumnHeader,
  createMergedFieldsFromDefinitionHeaders,
} from "../../../utils/definition-utils";
import "./DataTransformForm.scss";
import { Divider } from "@fluentui/react-components";
import {
  addMergedRow,
  addRange,
  createNewWorksheet,
  getRow,
  getUsedRows,
} from "../../../services/Excel services/Excel";
import { HEADER_OPTIONS, MERGED_HEADER_OPTIONS } from "../../../services/Excel services/ExcelOptions";
import ComboBox from "../common/Lists/ComboBox";
import { DefinitionInfo } from "../../../common/Definitions/types";
type Props = {
  worksheetID: string;
  definitionInfo: DefinitionInfo<any>;
};

const DataTransformForm = ({ worksheetID, definitionInfo: definitonInfo }: Props) => {
  const dropDownContainer = APP_NS.dropdownContainer;
  const labelContainer = APP_NS.labelContainer;
  const formContainer = FORM_NS.form;

  const [headers, setHeaders] = React.useState([]);
  const [keysMap, setKeysMap] = React.useState({});

  React.useEffect(() => {
    if (worksheetID === undefined) return;
    getRow(worksheetID, 0).then((headers) => setHeaders(headers));
  }, [worksheetID]);
  const accessKeys = definitonInfo ? createArrayOfDefinitionColumnAccessKey(definitonInfo.definition) : [];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rows = await getUsedRows(worksheetID, 1);

    const altRecords = rows.map((row) =>
      row
        .map((item, index) => [headers[index], item])
        .reduce((result, [key, value]) => {
          result[key] = value;
          return result;
        }, {})
    );
    createNewWorksheet().then((newWorksheetID) => {
      const transformation = altRecords.map((record) =>
        accessKeys.map((key) => {
          if (keysMap[key] === undefined) return "";
          return record[keysMap[key]];
        })
      );
      const definition = definitonInfo.definition;
      addMergedRow(0, 0, newWorksheetID, createMergedFieldsFromDefinitionHeaders(definition), MERGED_HEADER_OPTIONS);
      addRange(1, 0, newWorksheetID, [createArrayOfDefinitionColumnHeader(definition)], HEADER_OPTIONS);
      addRange(2, 0, newWorksheetID, transformation, { format: { columnWidth: 80 } });
    });
  };

  return (
    <form onSubmit={handleSubmit} className={formContainer.$}>
      <div className={labelContainer.$}>
        <Label weight="semibold">Data Transform</Label>
      </div>
      {definitonInfo && (
        <>
          <Divider>Keys Map</Divider>
          <div className={APP_NS.transformMapContainer.$}>
            {accessKeys.map((key: string) => (
              <div className={dropDownContainer.$} key={key}>
                <Label weight="semibold" size="medium">
                  {key}
                </Label>
                <ComboBox
                  placeholder="Select Key"
                  onOptionSelect={(_, data) => setKeysMap({ ...keysMap, [key]: data.optionValue })}
                  clearable
                >
                  {headers.map((header) => (
                    <Option value={header} key={key + "|" + header}>
                      {header}
                    </Option>
                  ))}
                </ComboBox>
              </div>
            ))}
          </div>
        </>
      )}
      <div>
        <Button type="submit">Transform</Button>
      </div>
    </form>
  );
};

export default DataTransformForm;
