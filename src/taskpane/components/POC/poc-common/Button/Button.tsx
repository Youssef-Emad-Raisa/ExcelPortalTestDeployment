import { Button as FluentButton, ButtonProps } from "@fluentui/react-components";
import React from "react";
import { APP_NS } from "../../..";
import "./Button.scss";

type Props = ButtonProps & {};
const Button = ({ className, ...props }: Props) => {
  return <FluentButton className={APP_NS.buttonPoc.$ + " " + className} appearance="primary" {...props} />;
};

export default Button;
