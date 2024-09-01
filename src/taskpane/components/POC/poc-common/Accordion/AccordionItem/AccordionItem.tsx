import React from "react";
import { AccordionItemProps, AccordionItem as FluentAccordionItem } from "@fluentui/react-components";
import { APP_NS } from "../../../..";
import "./AccordionItem.scss";

type Props = AccordionItemProps & {};

const AccordionItem = (props: Props) => {
  return <FluentAccordionItem className={APP_NS.accordItemPoc.$} {...props} />;
};

export default AccordionItem;
