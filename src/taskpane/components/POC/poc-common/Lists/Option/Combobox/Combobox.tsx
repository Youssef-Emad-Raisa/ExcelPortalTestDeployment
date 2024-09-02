import React, { forwardRef } from "react";
import { ComboboxProps, Combobox as FluentCombobox } from "@fluentui/react-components";
import "./Combobox.scss";
import { APP_NS } from "../../../../..";
type Props = ComboboxProps & {};

const Combobox = (props: Props) => {
  return <FluentCombobox className={APP_NS.comboboxPoc.$} {...props} />;
};

export default Combobox;
