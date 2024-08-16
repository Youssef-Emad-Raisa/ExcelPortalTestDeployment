import React from "react";
import { APP_NS } from "../../..";

export type Props = {
  __active?: boolean;
  children: React.ReactNode;
};
const Step = ({ __active = false, children }: Props) => {
  return <div className={APP_NS.steps.step.done(__active).$}>{children}</div>;
};

export default Step;
