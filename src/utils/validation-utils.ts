export const isBlank = (value: any) => {
  return typeof value === "string" && value === "";
};
export const isBlankOrZero = (value: any) => {
  return (typeof value === "string" && value === "") || (typeof value === "number" && value === 0);
};

export const valueBlankOrGreaterThanZero = (value) => {
  if (typeof value === "string") return value === "";
  if (typeof value === "number") return value > 0;
  return false;
};

export const valueAGreaterThanValueB = (valueA, valueB) => {
  if (isBlank(valueB) && isBlank(valueA)) return true;
  if (isBlank(valueA)) return true;
  if (typeof valueB !== "number" || typeof valueA !== "number") return false;
  return valueA > valueB;
};

export const oneValueExistInList = (...list) => {
  for (let field of list) if (typeof field === "number" && field !== 0) return true;
  return false;
};

export const ifValueExistOneValueShouldExistInList = (value, list: any[]) => {
  if (!oneValueExistInList(value)) return true;
  return oneValueExistInList(...list);
};
