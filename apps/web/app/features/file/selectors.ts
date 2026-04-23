import { AppState } from "../../store/store";

export const selectFiles = (state: AppState) => state.files;
export const selectFileId = (state: AppState) => state.ui.fileId;

export const selectFileTabs = (state: AppState) =>
  selectFiles(state).map(({ fileId, name }) => ({ fileId, name }));
