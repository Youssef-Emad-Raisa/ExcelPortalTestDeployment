/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

Office.onReady(() => {
  // If needed, Office.js is ready to be called.
});

/**
 * Highlights selection with yellow color when the add-in command is executed.
 * @param event
 */
async function highlightSelection(event: Office.AddinCommands.Event) {
  // Implement your custom code here. The following code is a simple Excel example.
  try {
    await Excel.run(async (context) => {
      const range = context.workbook.getSelectedRange();
      range.format.fill.color = "yellow";
      await context.sync();
    });
  } catch (error) {
    // Note: In a production add-in, notify the user through your add-in's UI.
    console.error(error);
  }

  // Calling event.completed is required. event.completed lets the platform know that processing has completed.
  event.completed();
}

// Register the function with Office.
Office.actions.associate("highlightSelection", highlightSelection);
