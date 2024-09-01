import React from "react";
import { APP_NS } from "../../..";
import Button from "../../poc-common/Button";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className={APP_NS.footer.$}>
      <Button className={APP_NS.footer.button.$} disabled>
        Save Changes
      </Button>
    </div>
  );
};

export default Footer;
