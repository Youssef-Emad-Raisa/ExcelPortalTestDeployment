import React from "react";
import "./LookupInfo.scss";
import { APP_NS } from "../../..";
import Field from "../../poc-common/Field";
import { Dropdown, Option } from "../../poc-common/Lists";
import { TAGS } from "../../../../../../poc-data";
import { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import Input from "../../poc-common/Input/Input";
import Textarea from "../../poc-common/Textarea";
import { useLookup } from "../../../../../contexts/ParametersContext";
import Label from "../../poc-common/Label";

const LookupInfo = () => {
  const { lookup } = useLookup();
  console.log(lookup);
  const placeholder = "Select Tags";
  const multiSelectRef = React.useRef<HTMLButtonElement>(null);
  const handleOptionSelect = (_: SelectionEvents, data: OptionOnSelectData) => {
    if (data.selectedOptions.length === 0) {
      multiSelectRef.current.replaceChild(document.createTextNode(placeholder), multiSelectRef.current.firstChild);
      return;
    }
    const items = data.selectedOptions.map((item) => TAGS.find((element) => element.id === Number(item)).name);
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("excel-addin-multiselect-container-poc");
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("excel-addin-multiselect-item-poc");
      div.textContent = item;
      parentDiv.appendChild(div);
    });
    multiSelectRef.current.replaceChild(parentDiv, multiSelectRef.current.firstChild);
  };
  return (
    <div className={APP_NS.lookupInfoContainer.$}>
      <Field label="Name">
        <Input placeholder="Lookup Name" />
      </Field>
      <Field label="Tags">
        <Dropdown
          ref={multiSelectRef}
          onOptionSelect={handleOptionSelect}
          multiselect
          clearable
          placeholder={placeholder}
        >
          {TAGS.map((tag) => (
            <Option key={tag.id} value={tag.id.toString()}>
              {tag.name}
            </Option>
          ))}
        </Dropdown>
      </Field>
      <Field label="Description">
        <Textarea placeholder="Enter Description" />
      </Field>
      <div className={APP_NS.metaContainer.$}>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Created by</Label>
          <Label>{lookup.createdBy}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Created on</Label>
          <Label>{lookup.createdOn ? new Date(lookup.createdOn).toDateString() : "Not yet"}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Last updated at</Label>
          <Label>{lookup.lastUpdatedAt ? new Date(lookup.lastUpdatedAt).toDateString() : "Not yet"}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Last pushed at</Label>
          <Label>{lookup.lastPushedAt ? new Date(lookup.lastPushedAt).toDateString() : "Not yet"}</Label>
        </div>
      </div>
    </div>
  );
};

export default LookupInfo;
