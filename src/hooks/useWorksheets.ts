import React, { useEffect } from "react";
import { getActiveWorksheetID, getWorksheets, listenToWorksheetChanges } from "../services/Excel services/Excel";
import { WorksheetInfo } from "../services/types";

enum WORKSHEET_ACTIONS {
  updateAvailableSheets = "update_available_worksheets",
  updateActiveWorksheet = "update_active_worksheet",
}

type Action = {
  type: WORKSHEET_ACTIONS;
  payload: Partial<{ availableWorksheets: WorksheetInfo[]; worksheetID: string }>;
};

type State = {
  availableWorksheets: WorksheetInfo[];
  activeWorksheetID: string;
};

const worksheetsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case WORKSHEET_ACTIONS.updateAvailableSheets:
      return { ...state, availableWorksheets: action.payload.availableWorksheets };
    case WORKSHEET_ACTIONS.updateActiveWorksheet:
      return { ...state, activeWorksheetID: action.payload.worksheetID };
    default:
      throw new Error("Unhandled dispatch call '" + action.type + "'");
  }
};

/**
 * Synchronizes excel worksheets states
 *
 * @returns {[State, React.Dispatch<Action>]}
 */
export const useWorksheets = (): [State, React.Dispatch<Action>] => {
  const [state, dispatch] = React.useReducer(worksheetsReducer, {
    availableWorksheets: [],
    activeWorksheetID: "",
  });
  const updateWorksheets = () =>
    getWorksheets().then((worksheets: WorksheetInfo[]) => {
      dispatch({ type: WORKSHEET_ACTIONS.updateAvailableSheets, payload: { availableWorksheets: worksheets } });
    });
  const updateActiveWorksheet = () =>
    getActiveWorksheetID().then((worksheetID) => {
      dispatch({ type: WORKSHEET_ACTIONS.updateActiveWorksheet, payload: { worksheetID } });
    });
  useEffect(() => {
    updateWorksheets();
    updateActiveWorksheet();
    const cleanerPromise = listenToWorksheetChanges(() => {
      updateWorksheets();
      updateActiveWorksheet();
    });
    return () => {
      cleanerPromise.then((cleanerFunc) => cleanerFunc());
    };
  }, []);
  return [state, dispatch];
};

export default useWorksheets;
