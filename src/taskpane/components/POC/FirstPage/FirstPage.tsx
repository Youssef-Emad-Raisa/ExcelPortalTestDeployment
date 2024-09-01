import React from "react";
import { APP_NS } from "../..";
// @ts-ignore
import welcomeLogo from "../../../../../assets/welcomeLogo.svg";
import "./FirstPage.scss";
import AssumptionsSelector from "./AssumptionsSelector";
const FirstPage = () => {
  return (
    <main className={APP_NS.firstPage.$}>
      <section className={APP_NS.welcomeSection.$}>
        <article className={APP_NS.welcomeContainer.$}>
          <div className={APP_NS.imageContainer.$}>
            <img className={APP_NS.imageContainer.image.$} src={welcomeLogo} alt="Welcome Image" />
          </div>
          <div className={APP_NS.welcomeTextContainer.$}>
            <div className={APP_NS.headerContainer.$}>
              <h1>Welcome!</h1>
            </div>
            <div className={APP_NS.textContainer.$}>
              <p className={APP_NS.textContainer.text.$}>
                To get started, please select the economic parameter from the dropdown menu. Then, from the lookups list
                double-click on the lookup you'd like to explore.
              </p>
            </div>
          </div>
        </article>
      </section>
      <section>
        <AssumptionsSelector />
      </section>
    </main>
  );
};

export default FirstPage;
