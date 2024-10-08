import React, { useEffect } from "react";
import { Lookup, useLookup } from "../../../../contexts/LookupContext";
// @ts-ignore
import AUp from "../../../../../assets/arrowUp.svg";
// @ts-ignore
import ADown from "../../../../../assets/arrowDown.svg";
import { APP_NS } from "../..";
import "./SecondPage.scss";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "../poc-common/Accordion";
import ActionLink from "../poc-common/ActionLink";
import NavBar from "./NavBar";
import Footer from "./Footer";
import LookupInfo from "./LookupInfo";
import ColumnMapping from "./ColumnMapping/ColumnMapping";
import { ListenToSheetOnChange, listenToWorksheetChanges } from "../../../../services/Excel services/Excel";
import { useSaveChanges } from "../../../../contexts/SaveChangesContext";
import useLocalStorageState from "../../../../../hooks/useLocalStorage";
import useWorksheets from "../../../../hooks/useWorksheets";

const ArrowUp = <img src={AUp} alt="Arrow Up" />;
const ArrowDown = <img src={ADown} alt="Arrow Down" />;

const SecondPage = () => {
  const [openItems, setOpenItems] = React.useState(["1"]);
  const { lookup, setLookup } = useLookup();
  const { isSaved, setIsSaved } = useSaveChanges();
  const [lookups] = useLocalStorageState<Lookup[]>("lookups", {});
  const [state] = useWorksheets();
  React.useEffect(() => {
    setIsSaved({ ...isSaved, worksheet: false });
  }, [state.activeWorksheetID]);
  return (
    <main className={APP_NS.secondPage.$}>
      <NavBar title={lookup.lookupName} onBackButtonClick={() => setLookup(undefined)} />
      <div className={APP_NS.accordActionContainer.$}>
        <Accordion
          onToggle={(_, data) => {
            setOpenItems(data.openItems as string[]);
            console.log(data);
          }}
          openItems={openItems}
          collapsible
          multiple
        >
          <AccordionItem value={"1"}>
            <AccordionHeader expandIcon={openItems.includes("1") ? ArrowUp : ArrowDown} expandIconPosition="end">
              Lookup info
            </AccordionHeader>
            <AccordionPanel>
              <LookupInfo />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value={"2"}>
            <AccordionHeader expandIcon={openItems.includes("2") ? ArrowUp : ArrowDown} expandIconPosition="end">
              Column Mapping
            </AccordionHeader>
            <AccordionPanel>
              <ColumnMapping />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div>
          <ActionLink
            action={() => {
              window.localStorage.setItem("lookups", JSON.stringify([...lookups.filter((lp) => lp.id !== lookup.id)]));
              setLookup(undefined);
            }}
          >
            Delete Lookup
          </ActionLink>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SecondPage;
