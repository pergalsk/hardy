import { AppState } from "../store/store";
import { selectFiles, selectFileId } from "../features/file/selectors";
import { selectRowId } from "../features/list/selectors";

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
  const rowId = selectRowId(state);
  if (!Array.isArray(entries) || rowId == null) return null;
  return entries[rowId] ?? null;
};

export function selectEntry(state: AppState) {
  const entries = selectFile(state)?.data?.log?.entries;
  const rowId = selectRowId(state);

  if (!Array.isArray(entries) || rowId == null) return undefined;

  const entry = entries[rowId];
  if (entry == null) return undefined;

  return { ...entry, $$id: rowId };
}

export const selectFileSize = (state: AppState) => {
  const files = selectFiles(state);
  const fileId = selectFileId(state);

  const file = files.find((file) => file.fileId === fileId);
  return file ? file.size : -1;
};

export const selectEntriesNum = (store: AppState) => {
  const entries = selectFile(store)?.data?.log?.entries;
  return (Array.isArray(entries) && entries.length) || 0;
};
