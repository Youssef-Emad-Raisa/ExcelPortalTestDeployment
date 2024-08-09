import { FlattenedRecord } from "../../Definitions/Definitions";
import {
  ifValueExistOneValueShouldExistInList,
  oneValueExistInList,
  valueAGreaterThanValueB,
  valueBlankOrGreaterThanZero,
} from "../../../utils/validation-utils";
import { ValidationFunction, FieldValidationRule } from "./types";

const duration1Validator: ValidationFunction<FlattenedRecord> = (record) => {
  if (!valueBlankOrGreaterThanZero(record.timeDuration1))
    return {
      errTitle: "Value Error",
      errMsg: "Field Must Be Blank Or Greater Than Zero",
    };
  return null;
};

const duration2Validator: ValidationFunction<FlattenedRecord> = (record) => {
  if (!valueAGreaterThanValueB(record.timeDuration2, record.timeDuration1))
    return {
      errTitle: "Value Error",
      errMsg: "Duration 2 Must Be Greater Than Duration 1",
    };
  return null;
};

const stepsValidator: ValidationFunction<FlattenedRecord> = (record) => {
  if (
    !oneValueExistInList(
      record.fixedLOE1,
      record.variableGasLOE1,
      record.variableNglLOE1,
      record.variableOilLOE1,
      record.variableWaterLOE1
    )
  )
    return {
      errTitle: "Value Error",
      errMsg: "Value Must Exist In Atleast One Field Of Step 1",
    };
  return null;
};
const duration1StepsValidator: ValidationFunction<FlattenedRecord> = (record) => {
  if (
    !ifValueExistOneValueShouldExistInList(record.timeDuration1, [
      record.fixedLOE2,
      record.variableGasLOE2,
      record.variableNglLOE2,
      record.variableOilLOE2,
      record.variableWaterLOE2,
    ])
  )
    return {
      errTitle: "Value Error",
      errMsg: "Value Must Exist In Atleast One Field Of Step 2",
    };
  return null;
};
const duration2StepsValidator: ValidationFunction<FlattenedRecord> = (record) => {
  if (
    !ifValueExistOneValueShouldExistInList(record.timeDuration2, [
      record.fixedLOE3,
      record.variableGasLOE3,
      record.variableNglLOE3,
      record.variableOilLOE3,
      record.variableWaterLOE3,
    ])
  )
    return {
      errTitle: "Value Error",
      errMsg: "Value Must Exist In Atleast One Field Of Step 3",
    };
  return null;
};

export const lookupValidations: FieldValidationRule<FlattenedRecord>[] = [
  {
    affectedFields: ["timeDuration1"],
    validate: duration1Validator,
    errColor: "pink",
  },
  {
    affectedFields: ["timeDuration2"],
    validate: duration2Validator,
    errColor: "pink",
  },
  {
    affectedFields: ["fixedLOE1", "variableGasLOE1", "variableNglLOE1", "variableOilLOE1", "variableWaterLOE1"],
    validate: stepsValidator,
    errColor: "pink",
  },
  {
    affectedFields: ["fixedLOE2", "variableGasLOE2", "variableNglLOE2", "variableOilLOE2", "variableWaterLOE2"],
    validate: duration1StepsValidator,
    errColor: "pink",
  },
  {
    affectedFields: ["fixedLOE3", "variableGasLOE3", "variableNglLOE3", "variableOilLOE3", "variableWaterLOE3"],
    validate: duration2StepsValidator,
    errColor: "pink",
  },
];
