import { Combobox as FluentCombobox, ComboboxProps } from "@fluentui/react-components";
import React from "react";

type Props = ComboboxProps & {};

const ComboBox = (props: Props) => {
  return <FluentCombobox {...props} />;
};

export default ComboBox;
