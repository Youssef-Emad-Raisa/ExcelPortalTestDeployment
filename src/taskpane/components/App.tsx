import * as React from "react";
import "./App.scss";
import POC from "./POC/POC";
import { LookupProvider } from "../../contexts/LookupContext";
import { WorksheetRelationProvider } from "../../contexts/WorksheetContext";

interface Props {
  title: string;
}

const App: React.FC<Props> = (props: Props) => {
  return (
    <LookupProvider>
      <WorksheetRelationProvider>
        <POC />
      </WorksheetRelationProvider>
    </LookupProvider>
  );
};

export default App;
