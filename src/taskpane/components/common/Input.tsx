import React from "react";
import { InputProps, Input as InputField } from "@fluentui/react-components";

type Props = InputProps & {};
const Input = (props: Props) => {
  return <InputField {...props} />;
};

export default Input;
