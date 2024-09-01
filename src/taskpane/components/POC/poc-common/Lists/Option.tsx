import React from "react";
import { Option as FluentOption, OptionProps } from "@fluentui/react-components";
import { APP_NS } from "../../..";
import "./Option.scss";

type Props = OptionProps & {};

const Option = (props: Props) => {
  return <FluentOption className={APP_NS.optionPoc.$} {...props} />;
};

export default Option;
