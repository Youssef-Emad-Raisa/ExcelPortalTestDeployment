import React from "react";
import { AccordionHeaderProps, AccordionHeader as FluentAccordionHeader } from "@fluentui/react-components";
import "./AccordionHeader.scss";

type Props = AccordionHeaderProps & {};

const AccordionHeader = (props: Props) => {
  return <FluentAccordionHeader {...props} />;
};

export default AccordionHeader;
