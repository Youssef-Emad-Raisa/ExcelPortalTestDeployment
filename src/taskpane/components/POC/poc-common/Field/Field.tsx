import React from "react";
import { FieldProps, Field as FluentField } from "@fluentui/react-components";
import { APP_NS } from "../../..";
import "./Field.scss";

type Props = FieldProps & {};

const Field = (props: Props) => {
  return <FluentField className={APP_NS.fieldPoc.$} {...props} />;
};

export default Field;
