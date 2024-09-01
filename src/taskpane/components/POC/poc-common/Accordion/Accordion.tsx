import React from "react";
import { AccordionProps, Accordion as FluentAccordion } from "@fluentui/react-components";
import { APP_NS } from "../../..";
import "./Accordion.scss";

type Props = AccordionProps & {};

const Accordion = (props: Props) => {
  return <FluentAccordion className={APP_NS.accordPoc.$} {...props} />;
};

export default Accordion;
