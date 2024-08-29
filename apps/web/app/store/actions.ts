import {
  useAppStore,
  File,
  Filter,
  TabCode,
  initialFilterFieldsState,
} from "./store";

export const setFileId = (fileId: number) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, fileId } }));

export const setRowId = (rowId: number) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, rowId } }));

export const setTab = (tab: TabCode) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, tab } }));

export const addFile = (file: File) =>
  useAppStore.setState((state) => ({ files: [...state.files, file] }));

export const removeFile = (fileId: string) =>
  useAppStore.setState((state) => ({
    files: state.files.filter((file) => file.fileId !== fileId),
  }));

export const removeAllFiles = () => useAppStore.setState({ files: [] });

export const setFilter = (newFilter: Filter) =>
  useAppStore.setState((state) => ({
    filter: { ...state.filter, ...newFilter },
  }));

// todo: simplify with immer
export const clearFilter = () =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      fields: { ...initialFilterFieldsState },
    },
  }));

// todo: simplify with immer
export const setFilterFields = (newFilterFields: Filter["fields"]) =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      fields: { ...state.filter.fields, ...newFilterFields },
    },
  }));
