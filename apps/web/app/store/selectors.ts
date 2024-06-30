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

export const selectHarData = (state: AppStore) =>
  selectFile(state)?.data?.log || null;

export const selectEntriesNum = (store: AppStore) => {
  const entries = selectFile(store)?.data?.log?.entries;
  return (Array.isArray(entries) && entries.length) || 0;
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
  selectFiles(state).map(({ fileId, name }) => ({ fileId, name }));

export function selectFooterData(state: AppStore) {
  const harData = selectHarData(state);

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

export function selectEntry(state: AppStore) {
  const entries = selectFileEntries(state);
  const rowId = selectRowId(state);

  return entries.find((entry: any) => entry.$$id === rowId);
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

export function selectCommonData(state: AppStore): any {
  const entry = selectEntry(state);

  if (!entry) {
    return null;
  }

  const { request, response, serverIPAddress, time } = entry;
  const { method, url } = request;
  const { status, statusText } = response;

  return {
    status,
    statusText,
    url,
    method,
    serverIPAddress,
    time,
  };
}

export function selectPartsData(state: AppStore): any {
  const entry = selectEntry(state);

  if (!entry) {
    return null;
  }

  const { request, response, timings } = entry;

  return {
    request: {
      headers: request.headers,
      headersSize: request.headersSize,
      bodySize: request.bodySize,
      content: request.postData?.text,
    },
    response: {
      headers: response.headers,
      headersSize: response.headersSize,
      bodySize: response.bodySize,
      content: response.content?.text,
    },
    timings,
  };
}
