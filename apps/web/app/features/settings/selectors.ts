import { AppState } from "../../store/store";

export const selectSettings = (state: AppState) => state.settings;
export const selectJsonViewerSettings = (state: AppState) => state.jsonViewer;
export const selectFilterActive = (state: AppState) =>
  state.uiPersistent.filterActive;
export const selectSortingActive = (state: AppState) =>
  state.uiPersistent.sortingActive;
export const selectShowPages = (state: AppState) =>
  state.uiPersistent.showPages;
export const selectDetailFormatterId = (state: AppState) =>
  state.uiPersistent.detailFormatterId;
export const selectUiPersistent = (state: AppState) => state.uiPersistent;
