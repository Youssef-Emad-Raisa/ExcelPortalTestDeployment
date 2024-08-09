import { Tab as FluentTab, TabProps } from "@fluentui/react-components";
import React from "react";

type Props = TabProps & {};

const Tab = (props: Props) => {
  return <FluentTab {...props} />;
};

export default Tab;
