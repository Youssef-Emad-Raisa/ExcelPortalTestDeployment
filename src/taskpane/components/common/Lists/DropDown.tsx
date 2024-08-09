import { Dropdown as FLuentDropDown, DropdownProps } from "@fluentui/react-components";
import React from "react";

type Props = DropdownProps & {};

const DropDown = (props: Props) => {
  return <FLuentDropDown {...props} />;
};

export default DropDown;
