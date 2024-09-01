import React from "react";
import { APP_NS } from "../../..";
import Label from "../../poc-common/Label";
import Button from "../../poc-common/Button";
// @ts-ignore
import ArrowLeft from "../../../../../../assets/arrowLeft.svg";
import "./NavBar.scss";
type Props = {
  title: string;
  onBackButtonClick(): void;
};

const NavBar = ({ title, onBackButtonClick }: Props) => {
  return (
    <div className={APP_NS.navContainer.$}>
      <div className={APP_NS.navContainer.backButton.$} onClick={onBackButtonClick}>
        <img src={ArrowLeft} alt="Back" />
      </div>
      <div className={APP_NS.navContainer.header.$}>
        <Label>{title}</Label>
      </div>
      <div>
        <Button className={APP_NS.navContainer.button.$} disabled>
          Push Lookup
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
