import * as React from "react";
import "./App.scss";
import POC from "./POC/POC";
import { LookupProvider } from "../../contexts/ParametersContext";

interface Props {
  title: string;
}

const App: React.FC<Props> = (props: Props) => {
  return (
    <LookupProvider>
      <POC />
    </LookupProvider>
  );
};

export default App;
