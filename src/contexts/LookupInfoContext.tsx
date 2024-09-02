import * as React from "react";

export type LookupInfo = {
  lookupName: string;
  description: string;
  tags: string[];
};

const LookupInfoContext = React.createContext<{
  lookupInfo: LookupInfo;
  setLookupInfo: React.Dispatch<React.SetStateAction<LookupInfo>>;
}>(undefined);

export const LookupInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [lookupInfo, setLookupInfo] = React.useState<LookupInfo>({
    lookupName: "",
    description: "",
    tags: [],
  });
  const value = { lookupInfo, setLookupInfo };
  return <LookupInfoContext.Provider value={value}>{children}</LookupInfoContext.Provider>;
};

export function useLookupInfo() {
  const context = React.useContext(LookupInfoContext);
  if (context === undefined) {
    throw new Error("useLookupInfo must be used within a LookupInfoProvider");
  }
  return context;
}
