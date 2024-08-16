import React from "react";
import "./StepsProgressBar.scss";
import { APP_NS } from "../..";
import Step, { Props as StepsProps } from "./Step/Step";

type Props = {
  children: React.ReactNode;
  currentStep: number;
  isVertical?: boolean;
};

const StepsProgressBar = ({ children, currentStep, isVertical = false }: Props) => {
  const totalSteps = React.Children.toArray(children).length;
  currentStep = (currentStep - 1) % totalSteps;
  const progressValue = `${((currentStep % totalSteps) / (totalSteps - 1)) * 100}%`;
  const newChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<StepsProps>(child) && child.type === Step)
      return React.cloneElement(child, { __active: currentStep >= index });
    return null;
  });
  return (
    <article className={APP_NS.progressContainer._.vertical(isVertical).$}>
      <div className={APP_NS.progressbarContainer._.vertical(isVertical).$}>
        <div className={APP_NS.steps._.vertical(isVertical).$}>{newChildren}</div>
        <div>
          <span className={APP_NS.progress._.vertical(isVertical).$}></span>
          <span
            className={[APP_NS.progress._.vertical(isVertical).$, APP_NS.progress._.complete.$].join(" ")}
            style={isVertical ? { height: progressValue } : { width: progressValue }}
          ></span>
        </div>
      </div>
    </article>
  );
};

export default StepsProgressBar;
