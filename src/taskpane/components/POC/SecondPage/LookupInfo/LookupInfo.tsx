import React from "react";
import "./LookupInfo.scss";
import { APP_NS } from "../../..";
import Field from "../../poc-common/Field";
import { Dropdown, Option } from "../../poc-common/Lists";
import { TAGS } from "../../../../../../poc-data";
import { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import Input from "../../poc-common/Input/Input";
import Textarea from "../../poc-common/Textarea";
import { useLookup } from "../../../../../contexts/LookupContext";
import Label from "../../poc-common/Label/Label";
import { useSaveChanges } from "../../../../../contexts/SaveChangesContext";
import _ from "lodash";
import { useLookupInfo } from "../../../../../contexts/LookupInfoContext";

const LookupInfo = () => {
  const { lookup } = useLookup();
  const { isSaved, setIsSaved } = useSaveChanges();
  const { setLookupInfo } = useLookupInfo();
  const [lookupInfoState, setLookupInfoState] = React.useState({
    lookupName: lookup.lookupName,
    description: lookup.description,
    tags: lookup.tags,
  });
  const placeholder = "Select Tags";
  const multiSelectRef = React.useRef<HTMLButtonElement>(null);
  const handleOptionSelect = (_?: SelectionEvents, data?: OptionOnSelectData, directData?: string[]) => {
    const selectedOptions = directData ? directData : data?.selectedOptions;
    if (selectedOptions === undefined || selectedOptions.length === 0) {
      multiSelectRef.current.replaceChild(document.createTextNode(placeholder), multiSelectRef.current.firstChild);
      return;
    }
    const items = selectedOptions.map((item) => TAGS.find((element) => element.id === Number(item)).name);
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("excel-addin-multiselect-container-poc");
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("excel-addin-multiselect-item-poc");
      const p = document.createElement("p");
      p.textContent = item;
      div.appendChild(p);
      parentDiv.appendChild(div);
    });
    multiSelectRef.current.replaceChild(parentDiv, multiSelectRef.current.firstChild);
  };
  React.useEffect(() => {
    setLookupInfo(lookupInfoState);
    setIsSaved({
      ...isSaved,
      content: _.isEqual(lookupInfoState, {
        lookupName: lookup.lookupName,
        description: lookup.description,
        tags: lookup.tags,
      }),
    });
  }, [lookupInfoState]);
  React.useEffect(() => {
    handleOptionSelect(
      undefined,
      undefined,
      lookup.tags?.map((tag) => TAGS.find((t) => t.name === tag).id.toString())
    );
  }, []);
  return (
    <div className={APP_NS.lookupInfoContainer.$}>
      <Field label="Name">
        <Input
          value={lookupInfoState.lookupName}
          onChange={(e, d) => setLookupInfoState({ ...lookupInfoState, lookupName: d.value })}
          placeholder="Lookup Name"
        />
      </Field>
      <Field label="Tags">
        <Dropdown
          selectedOptions={lookupInfoState.tags?.map((tag) => TAGS.find((t) => t.name === tag).id.toString()) ?? []}
          ref={multiSelectRef}
          onOptionSelect={(e, d) => {
            setLookupInfoState({
              ...lookupInfoState,
              tags: d.selectedOptions.sort().map((tagID) => TAGS.find((t) => t.id === Number(tagID)).name),
            });
            handleOptionSelect(e, d);
          }}
          multiselect
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
        <Textarea
          value={lookupInfoState.description}
          onChange={(e, d) => setLookupInfoState({ ...lookupInfoState, description: d.value })}
          placeholder="Enter Description"
        />
      </Field>
      <div className={APP_NS.metaContainer.$}>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Created by</Label>
          <Label>{lookup.createdBy}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Created on</Label>
          <Label>{lookup.createdOn ? lookup.createdOn : "Not yet"}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Last updated at</Label>
          <Label>{lookup.lastUpdatedAt ? lookup.lastUpdatedAt : "Not yet"}</Label>
        </div>
        <div className={APP_NS.metaContainer.metaItem.$}>
          <Label>Last pushed at</Label>
          <Label>{lookup.lastPushedAt ? lookup.lastPushedAt : "Not yet"}</Label>
        </div>
      </div>
    </div>
  );
};

export default LookupInfo;
