import * as React from "react";
type SavedType = { content: boolean; worksheet: boolean };

const SaveChanges = React.createContext<{
  isSaved: SavedType;
  setIsSaved: React.Dispatch<React.SetStateAction<SavedType>>;
}>(undefined);

export const SaveChangesProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSaved, setIsSaved] = React.useState<SavedType>({ content: true, worksheet: true });
  const value = { isSaved, setIsSaved };
  return <SaveChanges.Provider value={value}>{children}</SaveChanges.Provider>;
};

export function useSaveChanges() {
  const context = React.useContext(SaveChanges);
  if (context === undefined) {
    throw new Error("useSaveChanges must be used within a SaveChangesProvider");
  }
  return context;
}
