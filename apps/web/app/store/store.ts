import { create } from "zustand";

export type File = {
  fileId: string;
  name: string;
  size: number;
  data: any;
};

export type Ui = {
  rowId: number;
  tab: "REQ" | "RES" | "COO" | "TIM";
};

export type State = {
  files: File[];
  ui: Ui;
};

export type Actions = {
  setRowId: (rowId: number) => void;
  addFile: (file: File) => void;
  removeFile: (index: number) => void;
  removeAllFiles: () => void;
};

export type AppStore = State & Actions;

export const useAppStore = create<AppStore>((set) => ({
  files: [],
  ui: {
    rowId: 0,
    tab: "REQ",
  },
  settings: {},
  setRowId: (rowId: number) => set((state) => ({ ui: { ...state.ui, rowId } })),
  addFile: (file: File) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (index: number) =>
    set((state) => ({ files: state.files.filter((_, i) => i !== index) })),
  removeAllFiles: () => set({ files: [] }),
}));
