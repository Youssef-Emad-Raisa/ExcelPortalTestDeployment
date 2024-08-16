import { WorksheetInfo } from "../types";
import { MergedField } from "./types";

/**
 * Gets the range of the first cell A1 in current context and target sheet so you could offset it by row and column like i, j
 *
 * @param {Excel.RequestContext} context Excel context used
 * @param {string} worksheetID  Target Excel worksheet ID
 * @returns {Excel.Range} Range object of the first cell "A1"
 */
const __getFirstCell = (context: Excel.RequestContext, worksheetID: string): Excel.Range =>
  context.workbook.worksheets.getItem(worksheetID).getRange("A1");

/**
 * Gets all worksheets in workbook and loads basic sheet data (id, name, position)
 *
 * @returns {WorksheetInfo}
 */
export const getWorksheets = () => {
  return Excel.run(async (context) => {
    const worksheets = context.workbook.worksheets;
    worksheets.load("items");
    await context.sync();
    worksheets.items.forEach((item) => {
      item.load("id");
      item.load("name");
      item.load("position");
    });
    await context.sync();
    return worksheets.items.map((item) => {
      return { id: item.id, name: item.name, position: item.position } as WorksheetInfo;
    });
  });
};

/**
 * Generate Excel event handlers for (Delete, Add, Move, Sheet name change)
 *
 * @param {*} func Callback function that gets called everytime handlers are fired
 * @returns cleaner function that reomves handlers created
 */
export const listenToWorksheetChanges = (func) => {
  return Excel.run(async (context) => {
    const worksheets = context.workbook.worksheets;
    worksheets.onDeleted.add(func);
    worksheets.onSelectionChanged.add(func);
    worksheets.onAdded.add(func);
    worksheets.onMoved.add(func);
    worksheets.onNameChanged.add(func);
    worksheets.onActivated.add(func);
    await context.sync();
    return async () => {
      worksheets.onDeleted.remove(func);
      worksheets.onSelectionChanged.remove(func);
      worksheets.onAdded.remove(func);
      worksheets.onMoved.remove(func);
      worksheets.onNameChanged.remove(func);
      worksheets.onActivated.add(func);
      return await context.sync();
    };
  });
};

/**
 * Adds a 2D array to excel sheet
 *
 * @param {number} rowIndex Starting row for 2D array
 * @param {number} columnIndex Starting column for 2D array
 * @param {string} worksheetID Target worksheet ID
 * @param {any[][]} values 2D array of requried values !!Rows in values must have equal length
 * @param {?Excel.Interfaces.RangeUpdateData} [options] Excel options for any modifications needed
 * @returns {*}
 */
export const addRange = (
  rowIndex: number,
  columnIndex: number,
  worksheetID: string,
  values: any[][],
  options?: Excel.Interfaces.RangeUpdateData
) => {
  return Excel.run(async (context) => {
    // gets the first cell from the first worksheet
    const range = __getFirstCell(context, worksheetID);
    // resizes and offsets the range to fit the values passed and the position needed
    const targetRange = range
      .getOffsetRange(rowIndex, columnIndex)
      .getResizedRange(values.length - 1, values[0].length - 1);
    targetRange.set({
      ...options,
      values,
    });
    return await context.sync();
  });
};

/**
 * Adds merged row which contains values and their cell span in an object of type MergedField
 *
 * @param {number} rowIndex Starting row for 2D array
 * @param {number} columnIndex Starting column for 2D array
 * @param {string} worksheetID Target worksheet ID
 * @param {MergedField[]} values 1D array contains each value and their cell span in MergedField object
 * @param {?Excel.Interfaces.RangeUpdateData} [options] Excel options for any modifications needed
 * @returns {*}
 */
export const addMergedRow = (
  rowIndex: number,
  columnIndex: number,
  worksheetID: string,
  values: MergedField[],
  options: Excel.Interfaces.RangeUpdateData = {}
) => {
  return Excel.run(async (context) => {
    // gets the first cell from the first worksheet
    const range = __getFirstCell(context, worksheetID);
    // keeps track of which column would be used for current field
    let cummulativeColumn = columnIndex;
    values.forEach((value) => {
      const mergedRange = range.getOffsetRange(rowIndex, cummulativeColumn).getResizedRange(0, value.span - 1);
      mergedRange.merge();
      mergedRange.set({
        ...options,
        values: [Array(value.span).fill(value.value)],
      });
      cummulativeColumn += value.span;
    });
    await context.sync();
  });
};

/**
 * Clears the entire sheet
 *
 * @param {string} worksheetID Target worksheet ID
 * @returns {*}
 */
export const clearSheet = (worksheetID: string) => {
  return Excel.run(async (context) => {
    // Get the worksheet by ID
    const worksheet = context.workbook.worksheets.getItem(worksheetID);

    // Get the used range of the worksheet
    const usedRange = worksheet.getUsedRange();

    // Clear the contents and formatting of the used range
    usedRange.clear(Excel.ClearApplyTo.all);

    // Synchronize the context
    return await context.sync();
  });
};

/**
 * Gets values from sheet rows
 *
 * @param {string} worksheetID Target worksheet ID
 * @returns {*}
 */
export const getUsedRows = (worksheetID: string, offsetRows: number = 0) => {
  return Excel.run(async (context) => {
    // Get the worksheet by ID
    const worksheet = context.workbook.worksheets.getItem(worksheetID);

    // Get the used range of the worksheet
    const usedRange = worksheet.getUsedRange().getOffsetRange(offsetRows, 0).getResizedRange(-offsetRows, 0);

    usedRange.load("values");
    // Synchronize the context
    await context.sync();
    return usedRange.values;
  });
};

/**
 * Gets row values
 *
 * @param {string} worksheetID Target worksheet ID
 * @returns {*}
 */
export const getRow = (worksheetID: string, row: number = 0) => {
  return Excel.run(async (context) => {
    // Get the worksheet by ID
    const worksheet = context.workbook.worksheets.getItem(worksheetID);

    // Get the used row of the worksheet
    const targetRow = worksheet.getUsedRange().getRow(row);

    targetRow.load("values");
    // Synchronize the context
    await context.sync();
    return targetRow.values[0];
  });
};

/**
 * Generates context object that could be shared externaly, this is useful if you want to optimise context syncing calls but also want to separate Excel logic from business logic.
 *
 * @returns {Promise<Excel.RequestContext>}
 */
export const getContext = () => Excel.run(async (context) => context);

/**
 * Changes the cell format based on color and passed prompt.
 *
 * @param {Excel.RequestContext} context Shared context passed to optimize multiple cell formats.
 * @param {string} worksheetID Target worksheet ID that contains the cell needed to be formatted
 * @param {number} row Row index of the cell (zero-indexed)
 * @param {number} column Column index of the cell (zero-indexed)
 * @param {string} color (hex or basic colors EX: (red, green, pink...)) Color that the cell will be colored with
 * @param {string} promptTitle Title of the prompt that appears when hovering over the cell
 * @param {string} promptMsg Message of the prompt that appears when hovering over the cell
 */
export const formatCell = (
  context: Excel.RequestContext,
  worksheetID: string,
  row: number,
  column: number,
  color: string,
  promptTitle: string,
  promptMsg: string
) => {
  const targetCell = __getFirstCell(context, worksheetID).getOffsetRange(row, column);
  targetCell.format.fill.color = color;
  targetCell.dataValidation.prompt = {
    message: promptMsg,
    showPrompt: true,
    title: promptTitle,
  };
};

/**
 * Generate Excel onChange event handler for target sheet (worksheetID)
 *
 * @param {string} worksheetID Target sheet to listen to
 * @param {*} func Function that gets called every time the sheet changes
 * @returns {Promise<() => Promise<void>>} Promise containing cleaner function that removes (func) from onChange event handler
 */
export const ListenToSheetOnChange = (worksheetID: string, func) => {
  return Excel.run(async (context) => {
    const worksheet = context.workbook.worksheets.getItem(worksheetID);
    worksheet.onChanged.add(func);
    await context.sync();
    return async () => {
      worksheet.onChanged.remove(func);
      await context.sync();
    };
  });
};

/**
 * Clears formatting and propmts from all used range in target sheet except offsetRows
 *
 * @param {*} worksheetID Target worksheet to have its validations cleared
 * @param {number} [offsetRows=0] Offset rows if headers exist and should not get their formatting cleared.
 * @returns {*}
 */
export const clearFormating = (worksheetID, offsetRows = 0) => {
  return Excel.run(async (context) => {
    const usedRange = context.workbook.worksheets
      .getItem(worksheetID)
      .getUsedRange()
      .getOffsetRange(offsetRows, 0)
      .getResizedRange(-offsetRows, 0);

    usedRange.format.fill.clear();
    usedRange.dataValidation.clear();
    await context.sync();
  });
};

/**
 * Gets the value of the active cell
 *
 * @returns {Promise<any>} Promise containing the value of the active cell
 */
export const getValueOfActiveCell = () => {
  return Excel.run(async (context) => {
    const activeCell = context.workbook.getActiveCell();
    activeCell.load("values");
    await context.sync();
    return activeCell.values[0][0];
  });
};

/**
 * Creates a new worksheet in Excel
 *
 * @returns {Promise<string>} Promise containing the id of the new worksheet
 */
export const createNewWorksheet = (): Promise<string> => {
  return Excel.run(async (context) => {
    const newWorksheet = context.workbook.worksheets.add();
    newWorksheet.load("id");
    await context.sync();
    return newWorksheet.id;
  });
};

/**
 * Gets the worksheetID of the active worksheet
 *
 * @returns {Promise<string>} Promise containing the id of the active worksheet ID
 */
export const getActiveWorksheetID = () => {
  return Excel.run(async (context) => {
    const activeWorksheet = context.workbook.worksheets.getActiveWorksheet();
    activeWorksheet.load("id");
    await context.sync();
    return activeWorksheet.id;
  });
};

export const activateWorksheet = (worksheetID: string) => {
  return Excel.run(async (context) => {
    const worksheet = context.workbook.worksheets.getItem(worksheetID);
    worksheet.activate();
    return await context.sync();
  });
};
