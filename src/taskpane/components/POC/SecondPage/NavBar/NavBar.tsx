import React from "react";
import { APP_NS } from "../../..";
import Label from "../../poc-common/Label/Label";
import Button from "../../poc-common/Button";
// @ts-ignore
import ArrowLeft from "../../../../../../assets/arrowLeft.svg";
import "./NavBar.scss";
import { Lookup, useLookup } from "../../../../../contexts/LookupContext";
import useLocalStorageState from "../../../../../../hooks/useLocalStorage";
import { useSaveChanges } from "../../../../../contexts/SaveChangesContext";
import _ from "lodash";
import Toast from "../../poc-common/Toast/Toast";
type Props = {
  title: string;
  onBackButtonClick(): void;
};

const NavBar = ({ title, onBackButtonClick }: Props) => {
  const { lookup, setLookup } = useLookup();

  const { isSaved, setIsSaved } = useSaveChanges();
  const [showToast, setShowToast] = React.useState(false);
  return (
    <div className={APP_NS.navContainer.$}>
      {showToast && <Toast title="The lookup has been pushed to the database successfully."></Toast>}
      <div className={APP_NS.navContainer.backButton.$} onClick={onBackButtonClick}>
        <img src={ArrowLeft} alt="Back" />
      </div>
      <div className={APP_NS.navContainer.header.$}>
        <Label>{title}</Label>
      </div>
      <div>
        <Button
          className={APP_NS.navContainer.button.$}
          disabled={!(isSaved.content && isSaved.worksheet)}
          onClick={() => {
            const lookups = JSON.parse(window.localStorage.getItem("lookups"));
            const localStorageLookup = lookups.find((look) => look.id === lookup.id);
            localStorageLookup.lastPushedAt = new Date().toLocaleString();
            window.localStorage.setItem(
              "lookups",
              JSON.stringify([...lookups.filter((lp) => lp.id !== lookup.id), localStorageLookup])
            );
            setLookup(_.cloneDeep(localStorageLookup));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
          }}
        >
          Push Lookup
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
