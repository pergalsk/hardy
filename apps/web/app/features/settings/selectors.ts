import { AppState } from "../../store/store";
import { detailFormatters } from "@repo/formatter-core/registry";

export const selectSettings = (state: AppState) => state.settings;
export const selectJsonViewerSettings = (state: AppState) => state.jsonViewer;
export const selectFilterActive = (state: AppState) =>
  state.uiPersistent.filterActive;
export const selectSortingActive = (state: AppState) =>
  state.uiPersistent.sortingActive;
export const selectShowPages = (state: AppState) =>
  state.uiPersistent.showPages;
// falls back to the default (first registered) detail formatter
export const selectDetailFormatterId = (state: AppState) =>
  state.uiPersistent.detailFormatterId ??
  detailFormatters.getDefaultFormatter("detail")?.[0] ??
  null;
export const selectUiPersistent = (state: AppState) => state.uiPersistent;
