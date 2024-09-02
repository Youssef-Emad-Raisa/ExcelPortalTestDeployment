import * as React from "react";
import { ResponseType } from "../services/schemas/lookupSchema";
import { AssumptionType } from "../../assumptions";

export type Lookup = Partial<
  Omit<ResponseType, "assumptions"> & {
    id: number;
    parameterID: number;
    createdBy: string;
    createdOn: string;
    lastUpdatedAt: string;
    lastPushedAt: string;
    description: string;
    assumptions: AssumptionType[];
  }
>;
const LookupContext = React.createContext<{
  lookup: Lookup;
  setLookup: React.Dispatch<React.SetStateAction<Lookup>>;
}>(undefined);

export const LookupProvider = ({ children }: { children: React.ReactNode }) => {
  const [lookup, setLookup] = React.useState<Lookup>();
  const value = { lookup: lookup, setLookup: setLookup };
  return <LookupContext.Provider value={value}>{children}</LookupContext.Provider>;
};

export function useLookup() {
  const context = React.useContext(LookupContext);
  if (context === undefined) {
    throw new Error("useLookup must be used within a LookupProvider");
  }
  return context;
}
