import { FieldValidationRule } from "../Validations/Validators/types";

export type Definition<T> = {
  header: string;
  columns: {
    accessorKey: keyof T;
    colHeaderTitle: string;
  }[];
};

export type DefinitionInfo<T> = {
  id: number;
  name: string;
  definition: Definition<T>[];
  validators: FieldValidationRule<T>[];
  flat: (record: any) => T;
  get: () => Promise<any>;
  post: (data) => Promise<any>;
  headerRowSpan: number;
};
