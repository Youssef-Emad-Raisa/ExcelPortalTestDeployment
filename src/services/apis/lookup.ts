import { FlattenedRecord } from "../../common/Definitions/Definitions";
import { getData, postData } from "./base";

export const getLookup = () => getData("/api/assumptions");
export const postLookup = (data: FlattenedRecord[]) => {
  data = (data as FlattenedRecord[]).map((record, index) => {
    const { basin, operatorAlias, entity, resCat, ...rest } = record;
    const lookupRecord: any = rest;
    lookupRecord.cluster = {
      basin: record.basin,
      operatorAlias: record.operatorAlias,
      entity: record.entity,
      resCat: record.resCat,
    };
    lookupRecord.id = 0;
    lookupRecord.lookups = [];
    lookupRecord.tags = [];
    lookupRecord.isEdited = false;
    lookupRecord.willClone = false;
    lookupRecord.assumptionOrder = index + 1;
    return lookupRecord;
  });
  const wrapper = {
    lookupName: `Excel-Portal-${new Date().toISOString()}`,
    tags: [],
    assumptions: data,
  };
  return postData("/api/assumptions", wrapper);
};
