import React from "react";
import FirstPage from "./FirstPage";
import { useLookup } from "../../../contexts/ParametersContext";
import SecondPage from "./SecondPage";

const POC = () => {
  const { lookup } = useLookup();
  return lookup !== undefined ? <SecondPage /> : <FirstPage />;
};

export default POC;
