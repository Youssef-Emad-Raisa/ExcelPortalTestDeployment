import React, { useEffect } from "react";
import { APP_NS } from "../../..";
import Button from "../../poc-common/Button";
import "./Footer.scss";
import { useWorksheetRelation } from "../../../../../contexts/WorksheetContext";
import { Lookup, useLookup } from "../../../../../contexts/LookupContext";
import { getUsedRows } from "../../../../../services/Excel services/Excel";
import { useSaveChanges } from "../../../../../contexts/SaveChangesContext";
import { PARAMETERS } from "../../../../../../poc-data";
import { createRecordFromDefinitonValueRows } from "../../../../../utils/definition-utils";
import useLocalStorageState from "../../../../../../hooks/useLocalStorage";
import { useLookupInfo } from "../../../../../contexts/LookupInfoContext";
import _ from "lodash";
import Toast from "../../poc-common/Toast/Toast";

const Footer = () => {
  const { lookup, setLookup } = useLookup();
  const { lookupInfo } = useLookupInfo();
  const [lookups, setLookups] = useLocalStorageState<Lookup[]>("lookups", {});

  const { isSaved, setIsSaved } = useSaveChanges();
  const { relations } = useWorksheetRelation();
  const definitionInfo = PARAMETERS.find((parameter) => parameter.id === lookup.parameterID).definitionInfo;
  const relation = relations.find((relation) => relation.lookupID === lookup.id);
  const [showToast, setShowToast] = React.useState(false);
  return (
    <div className={APP_NS.footer.$}>
      {showToast && <Toast title="The changes have been saved successfully."></Toast>}
      <Button
        className={APP_NS.footer.button.$}
        disabled={isSaved.content && isSaved.worksheet}
        onClick={() => {
          getUsedRows(relation.worksheetID, definitionInfo.headerRowSpan)
            .then((values) => {
              const definition = definitionInfo.definition;
              values = values.map((row) => row.map((item) => (item === "" ? null : item)));
              const assumptions = values.map((row) => createRecordFromDefinitonValueRows(definition, row));
              const localStorageLookup = lookups.find((look) => look.id === lookup.id) ?? {
                id: Date.now(),
              };
              if (localStorageLookup.createdOn === undefined)
                localStorageLookup.createdOn = new Date().toLocaleString();
              localStorageLookup.lastUpdatedAt = new Date().toLocaleString();
              localStorageLookup.lookupName = lookupInfo.lookupName;
              localStorageLookup.description = lookupInfo.description;
              localStorageLookup.tags = lookupInfo.tags;
              localStorageLookup.parameterID = lookup.parameterID;
              localStorageLookup.assumptions = assumptions;

              setLookups([...lookups.filter((lp) => lp.id !== lookup.id), localStorageLookup]);
              setLookup(_.cloneDeep(localStorageLookup));
            })
            .then(() => {
              setIsSaved({ worksheet: true, content: true });
            })
            .then(() => {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 5000);
            });
        }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default Footer;
