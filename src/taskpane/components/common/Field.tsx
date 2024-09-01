import React from "react";
import { FieldProps, Field as FluentField } from "@fluentui/react-components";

type Props = FieldProps & {};
const Field = (props: Props) => {
  return <FluentField {...props} />;
};

export default Field;
