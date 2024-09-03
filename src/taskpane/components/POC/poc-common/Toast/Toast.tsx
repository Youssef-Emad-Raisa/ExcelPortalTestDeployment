import React from "react";
import "./Toast.scss";
import { APP_NS } from "../../..";
// @ts-ignore
import TickLogo from "../../../../../../assets/TickLogo.svg";
const Toast = ({ title }: { title: string }) => {
  return (
    <div className={APP_NS.toastPocContainer.$}>
      <div className={APP_NS.toastLogoContainer.$}>
        <img src={TickLogo} alt="Tick Logo" />
      </div>
      <div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Toast;
