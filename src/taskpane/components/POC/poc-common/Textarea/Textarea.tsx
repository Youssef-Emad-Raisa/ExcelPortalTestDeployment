import React from "react";
import { TextareaProps, Textarea as TextareaField } from "@fluentui/react-components";
import "./Textarea.scss";
import { APP_NS } from "../../..";

type Props = TextareaProps & {};
const Textarea = (props: Props) => {
  return <TextareaField className={APP_NS.textareaPoc.$} {...props} />;
};

export default Textarea;
