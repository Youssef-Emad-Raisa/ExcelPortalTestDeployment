export const HEADER_OPTIONS: Excel.Interfaces.RangeUpdateData = {
  format: {
    font: { bold: true, color: "#F4F3F6" },
    columnWidth: 80,
    rowHeight: 20,
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    fill: { color: "#b7b6c9" },
  },
};

export const MERGED_HEADER_OPTIONS: Excel.Interfaces.RangeUpdateData = {
  ...HEADER_OPTIONS,
  format: {
    ...HEADER_OPTIONS.format,
    rowHeight: 20,
    horizontalAlignment: "Center",
    verticalAlignment: "Center",
    fill: { ...HEADER_OPTIONS.format.fill, color: "#4f477e", pattern: "Checker" },
  },
};
