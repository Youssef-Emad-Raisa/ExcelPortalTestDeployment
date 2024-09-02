import { getLookup, postLookup } from "../../services/apis/lookup";
import { LookupRecordType } from "../../services/schemas/lookupSchema";
import { Definition, DefinitionInfo } from "./types";
import { lookupValidations } from "../Validations/Validators/LookupValidator";

export type FlattenedRecord = Omit<LookupRecordType, "cluster"> & LookupRecordType["cluster"];
export const lookupDefinition: Definition<FlattenedRecord>[] = [
  {
    header: "Cluster",
    columns: [
      {
        accessorKey: "basin",
        colHeaderTitle: "Basin",
      },
      {
        accessorKey: "operatorAlias",
        colHeaderTitle: "Operator",
      },
      {
        accessorKey: "entity",
        colHeaderTitle: "Entity",
      },
      {
        accessorKey: "resCat",
        colHeaderTitle: "resCat",
      },
    ],
  },
  {
    header: "Duration",
    columns: [
      {
        accessorKey: "timeDuration1",
        colHeaderTitle: "Step 1(mo)",
      },
      {
        accessorKey: "timeDuration2",
        colHeaderTitle: "Step 2(mo)",
      },
    ],
  },

  {
    header: "Fixed LOE",
    columns: [
      {
        accessorKey: "fixedLOE1",
        colHeaderTitle: "Step 1($)",
      },
      {
        accessorKey: "fixedLOE2",
        colHeaderTitle: "Step 2($)",
      },
      {
        accessorKey: "fixedLOE3",
        colHeaderTitle: "Step 3($)",
      },
    ],
  },
  {
    header: "Variable Oil LOE",
    columns: [
      {
        accessorKey: "variableOilLOE1",
        colHeaderTitle: "Step 1($)",
      },
      {
        accessorKey: "variableOilLOE2",
        colHeaderTitle: "Step 2($)",
      },
      {
        accessorKey: "variableOilLOE3",
        colHeaderTitle: "Step 3($)",
      },
    ],
  },

  {
    header: "Variable Gas LOE",
    columns: [
      {
        accessorKey: "variableGasLOE1",
        colHeaderTitle: "Step 1($)",
      },
      {
        accessorKey: "variableGasLOE2",
        colHeaderTitle: "Step 2($)",
      },
      {
        accessorKey: "variableGasLOE3",
        colHeaderTitle: "Step 3($)",
      },
    ],
  },
  {
    header: "Variable NGL LOE",
    columns: [
      {
        accessorKey: "variableNglLOE1",
        colHeaderTitle: "Step 1($)",
      },
      {
        accessorKey: "variableNglLOE2",
        colHeaderTitle: "Step 2($)",
      },
      {
        accessorKey: "variableNglLOE3",
        colHeaderTitle: "Step 3($)",
      },
    ],
  },
  {
    header: "Variable Water LOE",
    columns: [
      {
        accessorKey: "variableWaterLOE1",
        colHeaderTitle: "Step 1($)",
      },
      {
        accessorKey: "variableWaterLOE2",
        colHeaderTitle: "Step 2($)",
      },
      {
        accessorKey: "variableWaterLOE3",
        colHeaderTitle: "Step 3($)",
      },
    ],
  },
];

export const definitionsMap: DefinitionInfo<any>[] = [
  {
    id: 1,
    name: "Lookup",
    definition: lookupDefinition,
    validators: lookupValidations,
    get: getLookup,
    post: postLookup,
    flat(record) {
      const { cluster, ...recordWithoutCluster } = record;
      return {
        ...recordWithoutCluster,
        ...cluster,
      };
    },
    headerRowSpan: 2,
  },
  {
    id: 2,
    name: "Lookup (Reversed)",
    definition: [...lookupDefinition].reverse(),
    validators: [],
    get: getLookup,
    post: postLookup,
    flat(record) {
      const { cluster, ...recordWithoutCluster } = record;
      return {
        ...recordWithoutCluster,
        ...cluster,
      };
    },
    headerRowSpan: 2,
  },
];
