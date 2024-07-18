import { useAppStore, File, Filter, TabCode } from "./store";

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
