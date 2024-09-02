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
type Props = {
  title: string;
  onBackButtonClick(): void;
};

const NavBar = ({ title, onBackButtonClick }: Props) => {
  const { lookup, setLookup } = useLookup();

  const { isSaved, setIsSaved } = useSaveChanges();
  return (
    <div className={APP_NS.navContainer.$}>
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
          }}
        >
          Push Lookup
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
