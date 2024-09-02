import React from "react";
import FirstPage from "./FirstPage";
import { useLookup } from "../../../contexts/LookupContext";
import SecondPage from "./SecondPage";
import { SaveChangesProvider } from "../../../contexts/SaveChangesContext";
import { LookupInfoProvider } from "../../../contexts/LookupInfoContext";

const POC = () => {
  const { lookup } = useLookup();
  console.log(lookup);
  return lookup?.id !== undefined ? (
    <SaveChangesProvider>
      <LookupInfoProvider>
        <SecondPage />
      </LookupInfoProvider>
    </SaveChangesProvider>
  ) : (
    <FirstPage />
  );
};

export default POC;
