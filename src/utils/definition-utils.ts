import { Definition } from "../common/Definitions/types";

/**
 * Creates object list that defines each Parent Header column span
 *
 * @template T
 * @param {Definition<T>[]} definition
 * @returns {*}
 */
export const createMergedFieldsFromDefinitionHeaders = <T>(definition: Definition<T>[]) => {
  return definition.map((field) => {
    return { value: field.header, span: field.columns.length };
  });
};

/**
 * Creates an array of all sub-column names from definition
 *
 * @template T
 * @param {Definition<T>[]} definition
 * @returns {*}
 */
export const createArrayOfDefinitionColumnHeader = <T>(definition: Definition<T>[]) => {
  return definition.map((field) => field.columns.map((col) => col.colHeaderTitle)).flat();
};

/**
 * Creates an array of all sub-column access keys from definition
 *
 * @template T
 * @param {Definition<T>[]} definition
 * @returns {*}
 */
export const createArrayOfDefinitionColumnAccessKey = <T>(definition: Definition<T>[]) => {
  return definition.map((field) => field.columns.map((col) => col.accessorKey)).flat();
};

/**
 * Creates a record object mapping each access key in definiton to its corresponding row based on index
 *
 * @template T
 * @param {Definition<T>[]} definition
 * @param {any[]} row
 * @returns {T}
 */
export const createRecordFromDefinitonValueRows = <T>(definition: Definition<T>[], row: any[]): T => {
  const keys = createArrayOfDefinitionColumnAccessKey(definition);
  return row
    .map((item, index) => [keys[index], item])
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {}) as T;
};

/**
 * Gets the index of key in definition
 *
 * @template T
 * @param {Definition<T>[]} definition
 * @param {keyof T} key
 * @returns {*}
 */
export const getAccessKeyIndexInDefinition = <T>(definition: Definition<T>[], key: keyof T) => {
  return createArrayOfDefinitionColumnAccessKey(definition).indexOf(key);
};

/**
 * Sorts object values by definitions presednece based on sub columns order.
 *
 * @template T
 * @param {T} flatData
 * @param {Definition<T>[]} definition
 * @returns {*}
 */
export const convertSchemaIntoDefinitionColumnsArray = <T>(flatData: T, definition: Definition<T>[]) => {
  return definition.map((def) => def.columns.map((col) => flatData[col.accessorKey])).flat();
};
