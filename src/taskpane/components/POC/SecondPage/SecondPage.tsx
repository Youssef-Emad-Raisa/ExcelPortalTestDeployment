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
import { useWorksheetRelation } from "../../../../contexts/WorksheetContext";
import { ListenToSheetOnChange } from "../../../../services/Excel services/Excel";
import { useSaveChanges } from "../../../../contexts/SaveChangesContext";
import useLocalStorageState from "../../../../../hooks/useLocalStorage";

const ArrowUp = <img src={AUp} alt="Arrow Up" />;
const ArrowDown = <img src={ADown} alt="Arrow Down" />;

const SecondPage = () => {
  const [openItem, setOpenItems] = React.useState(2);
  const { lookup, setLookup } = useLookup();
  const { isSaved, setIsSaved } = useSaveChanges();
  const { relations } = useWorksheetRelation();
  const [lookups] = useLocalStorageState<Lookup[]>("lookups", {});

  console.log("Second");
  console.log(lookup);
  React.useEffect(() => {
    const relation = relations.find((relation) => relation.lookupID === lookup.id);
    const worksheetID = relation.worksheetID;
    if (worksheetID === "" || worksheetID === undefined) return undefined;
    // gets the first row of the sheet and stores its values as the headers
    const cleanerPromise = ListenToSheetOnChange(worksheetID, () => setIsSaved({ ...isSaved, worksheet: false }));
    return () => {
      cleanerPromise.then((cleanerFunc) => cleanerFunc());
    };
  }, []);
  return (
    <main className={APP_NS.secondPage.$}>
      <NavBar title={lookup.lookupName} onBackButtonClick={() => setLookup(undefined)} />
      <div className={APP_NS.accordActionContainer.$}>
        <Accordion
          onToggle={(_, data) => {
            setOpenItems(data.openItems.length ? (data.openItems[0] as number) : 0);
            console.log(data);
          }}
          openItems={openItem}
          collapsible
        >
          <AccordionItem value={1}>
            <AccordionHeader expandIcon={openItem === 1 ? ArrowUp : ArrowDown} expandIconPosition="end">
              Column Mapping
            </AccordionHeader>
            <AccordionPanel>
              <ColumnMapping />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value={2}>
            <AccordionHeader expandIcon={openItem === 2 ? ArrowUp : ArrowDown} expandIconPosition="end">
              Lookup info
            </AccordionHeader>
            <AccordionPanel>
              <LookupInfo />
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
