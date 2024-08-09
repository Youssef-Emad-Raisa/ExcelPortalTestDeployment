export type ValidationFunction<T> = (record: T) => ValidationResult | null;

export type ValidationResult = {
  errTitle: string;
  errMsg: string;
};

export type FieldValidationRule<T> = {
  errColor: string;
  affectedFields: (keyof T)[];
  validate: ValidationFunction<T>;
};
