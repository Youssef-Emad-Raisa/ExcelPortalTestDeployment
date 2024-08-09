import React from "react";
import { Option as FluentOption, OptionProps } from "@fluentui/react-components";

type Props = OptionProps & {};

const Option = (props: Props) => {
  return <FluentOption {...props} />;
};

export default Option;
