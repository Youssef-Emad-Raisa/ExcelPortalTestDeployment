import * as React from "react";

export type WorksheetRelation = {
  worksheetID: string;
  lookupID: number;
};
const WorksheetContext = React.createContext<{
  relations: WorksheetRelation[];
  setRelations: React.Dispatch<React.SetStateAction<WorksheetRelation[]>>;
}>(undefined);

export const WorksheetRelationProvider = ({ children }: { children: React.ReactNode }) => {
  const [relations, setRelations] = React.useState<WorksheetRelation[]>([]);
  const value = { relations, setRelations };
  return <WorksheetContext.Provider value={value}>{children}</WorksheetContext.Provider>;
};

export function useWorksheetRelation() {
  const context = React.useContext(WorksheetContext);
  if (context === undefined) {
    throw new Error("useWorksheetRelation must be used within a WorksheetRelationProvider");
  }
  return context;
}
