import { AppStore } from "./store";

export const selectTab = (state: AppStore) => state.ui.tab;
export const selectSetTab = (state: AppStore) => state.setTab;
export const selectAddFile = (state: AppStore) => state.addFile;
export const selectRemoveFile = (state: AppStore) => state.removeFile;
export const selectFiles = (state: AppStore) => state.files;
export const selectRowId = (state: AppStore) => state.ui.rowId;
export const selectFileId = (state: AppStore) => state.ui.fileId;
export const selectSetRowId = (state: AppStore) => state.setRowId;
export const selectFilter = (state: AppStore) => state.filter;
export const selectSetFilter = (state: AppStore) => state.setFilter;

export const selectFile = (state: AppStore) => {
  const files = selectFiles(state);
  const fileId = selectFileId(state);

  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }
  return files[fileId] || null;
};

export const selectFileEntries = (state: AppStore) => {
  const file = selectFile(state);

  const entries = file?.data?.log?.entries;

  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map((entry: any, index: number) => ({
    ...entry,
    $$id: index + 1,
  }));
};

export const selectFileTabs = (state: AppStore) =>
  state.files.map((file) => ({ fileId: file.fileId, name: file.name }));

export function selectFooterData(state: AppStore) {
  const harData = state.files?.[0]?.data?.log || null;

  if (!harData) {
    return null;
  }

  const { version, creator, entries } = harData;

  return {
    version,
    creatorName: creator?.name,
    creatorVersion: creator?.version,
    entriesNum: entries?.length || 0,
    totalTime: (
      entries?.reduce((acc: number, entry: any) => acc + entry.time, 0) || 0
    ).toFixed(2),
  };
}

export function selectListData(state: AppStore): any {
  const entries = selectFileEntries(state);

  return entries.map((entry: any) => {
    const { startedDateTime, time, request, response, $$id } = entry;
    const { method, url } = request;
    const { status, statusText } = response;

    return {
      $$id,
      status,
      statusText,
      url,
      method,
      startedDateTime,
      time,
    };
  });
}
