import { AppState } from "./store";

export const selectTab = (state: AppState) => state.ui.tab;
export const selectFiles = (state: AppState) => state.files;
export const selectFileId = (state: AppState) => state.ui.fileId;
export const selectToasts = (state: AppState) => state.toasts;
export const selectRowId = (state: AppState) => state.ui.rowId;
export const selectPinnedIds = (state: AppState) => state.ui.pinnedIds;
export const selectFilter = (state: AppState) => state.filter;
export const selectJsonViewerSettings = (state: AppState) => state.jsonViewer;
export const selectSettings = (state: AppState) => state.settings;
export const selectSorting = (state: AppState) => state.sorting;
export const selectShowPinnedOnly = (state: AppState) =>
  state.ui.showPinnedOnly;

export const selectFilterActive = (state: AppState) =>
  state.uiPersistent.filterActive;
export const selectSortingActive = (state: AppState) =>
  state.uiPersistent.sortingActive;
export const selectShowPages = (state: AppState) =>
  state.uiPersistent.showPages;
export const selectDetailFormatterId = (state: AppState) =>
  state.uiPersistent.detailFormatterId;

export const selectFileSize = (state: AppState) => {
  const files = selectFiles(state);
  const fileId = selectFileId(state);

  const file = files.find((file) => file.fileId === fileId);
  return file ? file.size : -1;
};

export const selectFile = (state: AppState) => {
  const files = selectFiles(state);
  const fileId = selectFileId(state);

  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }

  return files.find((file) => file.fileId === fileId) || null;
};

export const selectHarData = (state: AppState) =>
  selectFile(state)?.data?.log || null;

export const selectRawEntries = (state: AppState) =>
  selectFile(state)?.data?.log?.entries ?? null;

export const selectRawEntry = (state: AppState) => {
  const entries = selectFile(state)?.data?.log?.entries;
  const rowId = state.ui.rowId;
  if (!Array.isArray(entries) || rowId == null) return null;
  return entries[rowId] ?? null;
};

export const selectEntriesNum = (store: AppState) => {
  const entries = selectFile(store)?.data?.log?.entries;
  return (Array.isArray(entries) && entries.length) || 0;
};

export const selectFileEntries = (state: AppState) => {
  const file = selectFile(state);

  const entries = file?.data?.log?.entries;

  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map((entry: any, index: number) => ({
    ...entry,
    $$id: index,
  }));
};

export const selectFileTabs = (state: AppState) =>
  selectFiles(state).map(({ fileId, name }) => ({ fileId, name }));

export function selectEntry(state: AppState) {
  const entries = selectFileEntries(state);
  const rowId = selectRowId(state);

  return entries.find((entry: any) => entry.$$id === rowId);
}
