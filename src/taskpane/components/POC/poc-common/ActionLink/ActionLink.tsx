import React from "react";
import Label from "../../../common/Label";
import { APP_NS } from "../../..";
import "./ActionLink.scss";

type Props = {
  action(): void;
  children: React.ReactNode;
};

const ActionLink = ({ action, children }: Props) => {
  return (
    <Label className={APP_NS.actionLink.$} onClick={action}>
      {children}
    </Label>
  );
};

export default ActionLink;
