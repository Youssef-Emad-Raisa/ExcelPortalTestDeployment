import React from "react";
import { definitionsMap } from "../common/Definitions/Definitions";
import { DefinitionInfo } from "../common/Definitions/types";

/**
 * Kepps track of selected definiton in avalable definitons list
 *
 * @template T
 * @returns {{ currentDefinitionInfo: any; setCurrentDefinitionInfo: any; definitionsInfoList: any; }}
 */
export const useDefinitions = <T>() => {
  const [currentDefinitionInfo, setCurrentDefinitionInfo] = React.useState<DefinitionInfo<T>>();
  return { currentDefinitionInfo, setCurrentDefinitionInfo, definitionsInfoList: definitionsMap };
};

export default useDefinitions;
