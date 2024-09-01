import React from "react";
import { InputProps, Input as InputField } from "@fluentui/react-components";
import "./Input.scss";
import { APP_NS } from "../../..";

type Props = InputProps & {};
const Input = (props: Props) => {
  return <InputField className={APP_NS.inputPoc.$} {...props} />;
};

export default Input;
