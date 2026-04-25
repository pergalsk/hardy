import { useAppStore, File } from "../../store/store";

export const addFile = (file: File) =>
  useAppStore.setState((state) => ({ files: [...state.files, file] }));

export const removeFile = (fileId: string) =>
  useAppStore.setState((state) => ({
    files: state.files.filter((file) => file.fileId !== fileId),
  }));

export const removeAllFiles = () => useAppStore.setState({ files: [] });

export const setFileId = (fileId: string) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, fileId } }));
