import { ToggleButton as FluentToggleButton, ToggleButtonProps } from "@fluentui/react-components";
import React from "react";

type Props = ToggleButtonProps & {};
const ToggleButton = (props: Props) => {
  return <FluentToggleButton {...props} />;
};

export default ToggleButton;
