import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { UserProvider } from "../contexts/UserContext";

/* global document, Office, module, require, HTMLElement */

const title = "Excel Addin";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider theme={teamsLightTheme}>
      <UserProvider>
        <App title={title} />
      </UserProvider>
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root?.render(NextApp);
  });
}
