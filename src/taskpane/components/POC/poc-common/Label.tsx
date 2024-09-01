import { Label as FluentLabel, LabelProps } from "@fluentui/react-components";
import React from "react";

type Props = LabelProps & {};

const Label = (props: Props) => {
  return <FluentLabel size="large" {...props} />;
};

export default Label;
