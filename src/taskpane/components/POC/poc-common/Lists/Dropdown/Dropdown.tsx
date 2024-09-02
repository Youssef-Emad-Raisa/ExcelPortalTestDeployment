import React, { forwardRef } from "react";
import { DropdownProps, Dropdown as FluentDropDown } from "@fluentui/react-components";
import "./Dropdown.scss";
import { APP_NS } from "../../../..";
type Props = DropdownProps & {};

const Dropdown = forwardRef((props: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  return <FluentDropDown ref={ref} className={APP_NS.dropdownPoc.$} {...props} />;
});

export default Dropdown;
