import { AppState, TabCode } from "./store";

export const selectTab = (state: AppState) => state.ui.tab;
export const selectFiles = (state: AppState) => state.files;
export const selectRowId = (state: AppState) => state.ui.rowId;
export const selectFileId = (state: AppState) => state.ui.fileId;
export const selectFilter = (state: AppState) => state.filter;
export const selectJsonViewerSettings = (state: AppState) =>
  state.settings.jsonViewer;

export const selectFile = (state: AppState) => {
  const files = selectFiles(state);
  const fileId = selectFileId(state);

  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }
  return files[fileId] || null;
};

export const selectHarData = (state: AppState) =>
  selectFile(state)?.data?.log || null;

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

export function selectFooterData(state: AppState) {
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

export function selectEntry(state: AppState) {
  const entries = selectFileEntries(state);
  const rowId = selectRowId(state);

  return entries.find((entry: any) => entry.$$id === rowId);
}

export function selectListData(state: AppState): any {
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

export function selectCommonData(state: AppState): any {
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

export function selectTabData(tabCode: TabCode): any {
  return (state: AppState) => {
    const entry = selectEntry(state);

    if (!entry) {
      return null;
    }

    const { request, response, timings } = entry;

    if (tabCode === "REQ") {
      return {
        headers: request?.headers,
        headersSize: request?.headersSize,
        bodySize: request?.bodySize,
        content: request?.postData?.text,
      };
    }

    if (tabCode === "RES") {
      return {
        headers: response?.headers,
        headersSize: response?.headersSize,
        bodySize: response?.bodySize,
        content: response?.content?.text,
      };
    }

    if (tabCode === "COO") {
      return {
        cookies: {
          request: request?.cookies,
          response: response?.cookies,
        },
      };
    }

    if (tabCode === "TIM") {
      return { timings };
    }

    return null;
  };
}
