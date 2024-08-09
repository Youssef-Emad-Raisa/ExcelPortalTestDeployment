import { Button as FluentButton, ButtonProps } from "@fluentui/react-components";
import React from "react";

type Props = ButtonProps & {};
const Button = (props: Props) => {
  return <FluentButton appearance="primary" {...props} />;
};

export default Button;
