import { AppStore } from "./store";

export const selectTab = (state: AppStore) => state.ui.tab;
export const selectSetTab = (state: AppStore) => state.setTab;
export const selectAddFile = (state: AppStore) => state.addFile;
export const selectRemoveFile = (state: AppStore) => state.removeFile;
export const selectFiles = (state: AppStore) => state.files;
export const selectRowId = (state: AppStore) => state.ui.rowId;
export const selectSetRowId = (state: AppStore) => state.setRowId;
export const selectFilter = (state: AppStore) => state.filter;
export const selectSetFilter = (state: AppStore) => state.setFilter;

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
