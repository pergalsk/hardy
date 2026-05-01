import { AppState } from "../../store/store";

export const selectFilter = (state: AppState) => state.filter;
export const selectFilterFields = (state: AppState) => state.filter.fields;
export const selectSorting = (state: AppState) => state.sorting;
export const selectPinnedIds = (state: AppState) => state.ui.pinnedIds;
export const selectRowId = (state: AppState) => state.ui.rowId;
export const selectShowPinnedOnly = (state: AppState) =>
  state.ui.showPinnedOnly;
export const selectFilteredCount = (state: AppState) => state.filter.count;
