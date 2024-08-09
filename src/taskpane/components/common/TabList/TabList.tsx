import { TabList as FluentTabList, TabListProps } from "@fluentui/react-components";
import React from "react";

type Props = TabListProps & {};

const TabList = (props: Props) => {
  return <FluentTabList {...props} />;
};

export default TabList;
