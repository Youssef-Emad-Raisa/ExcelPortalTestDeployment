import { Label as FluentLabel, LabelProps } from "@fluentui/react-components";
import React from "react";
import "./Label.scss";
import { APP_NS } from "../../..";
type Props = LabelProps & {};

const Label = (props: Props) => {
  return <FluentLabel className={APP_NS.labelPoc.$} size="large" {...props} />;
};

export default Label;
