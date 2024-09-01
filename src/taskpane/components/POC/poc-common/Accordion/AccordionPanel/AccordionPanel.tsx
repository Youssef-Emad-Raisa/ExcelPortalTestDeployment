import React from "react";
import { AccordionPanelProps, AccordionPanel as FluentAccordionPanel } from "@fluentui/react-components";
import { APP_NS } from "../../../..";
import "./AccordionPanel.scss";

type Props = AccordionPanelProps & {};

const AccordionPanel = (props: Props) => {
  return <FluentAccordionPanel className={APP_NS.accordPanelPoc.$} {...props} />;
};

export default AccordionPanel;
