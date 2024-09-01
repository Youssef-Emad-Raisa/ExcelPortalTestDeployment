import { Lookup } from "./src/contexts/ParametersContext";

export type ParameterType = {
  id: number;
  name: string;
};
export type TagType = {
  id: number;
  name: string;
};

export const PARAMETERS: ParameterType[] = [
  { id: 0, name: "LOE" },
  { id: 1, name: "M&G" },
  { id: 2, name: "Differentials" },
  { id: 3, name: "Price Decks" },
  { id: 4, name: "Stream Properties" },
];
export const TAGS: TagType[] = [
  { id: 0, name: "Tag 0" },
  { id: 1, name: "Tag 1" },
  { id: 2, name: "Tag 2" },
  { id: 3, name: "Tag 3" },
  { id: 4, name: "Tag 4" },
];

export const LOOKUPS: Lookup[] = [
  {
    id: 1,
    parameterID: 0,
    createdBy: "",
    createdOn: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    lastPushedAt: new Date().toISOString(),
    description: "",
    assumptions: [],
    tags: [],
    lookupName: "Test",
  },
];
