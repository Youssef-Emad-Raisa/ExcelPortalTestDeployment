import { z } from "zod";
const lookupRecord = z.object({
  timeDuration1: z.number().nullable(),
  timeDuration2: z.number().nullable(),
  fixedLOE1: z.number().nullable(),
  fixedLOE2: z.number().nullable(),
  fixedLOE3: z.number().nullable(),
  variableOilLOE1: z.number().nullable(),
  variableOilLOE2: z.number().nullable(),
  variableOilLOE3: z.number().nullable(),
  variableGasLOE1: z.number().nullable(),
  variableGasLOE2: z.number().nullable(),
  variableGasLOE3: z.number().nullable(),
  variableNglLOE1: z.number().nullable(),
  variableNglLOE2: z.number().nullable(),
  variableNglLOE3: z.number().nullable(),
  variableWaterLOE1: z.number().nullable(),
  variableWaterLOE2: z.number().nullable(),
  variableWaterLOE3: z.number().nullable(),
  cluster: z.object({
    basin: z.string().nullable(),
    operatorAlias: z.string().nullable(),
    entity: z.string().nullable(),
    resCat: z.string().nullable(),
  }),
});

const responseSchema = z.object({
  assumptions: z.array(lookupRecord),
  lookupName: z.string(),
  tags: z.array(z.string()),
});

export type ResponseType = z.infer<typeof responseSchema>;
export type LookupRecordType = z.infer<typeof lookupRecord>;
