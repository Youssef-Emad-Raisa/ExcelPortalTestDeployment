import assumptions from "./assumptions";
import { definitionsMap } from "./src/common/Definitions/Definitions";
import { DefinitionInfo } from "./src/common/Definitions/types";
import { Lookup } from "./src/contexts/LookupContext";

export type ParameterType<T> = {
  id: number;
  name: string;
  definitionInfo: DefinitionInfo<T>;
};
export type TagType = {
  id: number;
  name: string;
};

export const PARAMETERS: ParameterType<any>[] = [
  { id: 0, name: "LOE", definitionInfo: definitionsMap[0] },
  { id: 1, name: "M&G", definitionInfo: definitionsMap[1] },
  { id: 2, name: "Differentials", definitionInfo: definitionsMap[1] },
  { id: 3, name: "Price Decks", definitionInfo: definitionsMap[1] },
  { id: 4, name: "Stream Properties", definitionInfo: definitionsMap[1] },
];

const allTags: string[] = assumptions.map((assumption) => assumption.tags).flat();
const uniqueTags = allTags.filter((item, pos) => allTags.indexOf(item) === pos);
export const TAGS: TagType[] = uniqueTags.map((tag, index) => {
  return { id: index, name: tag };
});
