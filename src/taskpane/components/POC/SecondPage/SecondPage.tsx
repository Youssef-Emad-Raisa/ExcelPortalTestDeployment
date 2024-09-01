import React from "react";
import { useLookup } from "../../../../contexts/ParametersContext";
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

const ArrowUp = <img src={AUp} alt="Arrow Up" />;
const ArrowDown = <img src={ADown} alt="Arrow Down" />;

const SecondPage = () => {
  const [openItem, setOpenItems] = React.useState(2);

  const { lookup, setLookup } = useLookup();
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
              <div>Hello</div>
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
          <ActionLink action={() => console.log(456)}>Delete Lookup</ActionLink>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SecondPage;
