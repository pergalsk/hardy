import { create } from "zustand";

export type File = {
  fileId: string;
  name: string;
  size: number;
  data: any;
};

export type TabCode = "REQ" | "RES" | "COO" | "TIM";

export type Ui = {
  rowId: number;
  tab: TabCode;
};

export type Filter = {
  visible: boolean;
  active: boolean;
  url: string;
  method: string;
  status: string;
};

export type State = {
  files: File[];
  filter: Filter;
  ui: Ui;
};

export type Actions = {
  setRowId: (rowId: number) => void;
  setTab: (tab: TabCode) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  removeAllFiles: () => void;
  setFilter: (filter: Filter) => void;
};

export type AppStore = State & Actions;

export const useAppStore = create<AppStore>((set) => ({
  files: [],
  filter: {
    visible: false,
    active: false,
    url: "",
    method: "",
    status: "",
  },
  ui: {
    rowId: 1,
    tab: "REQ",
  },
  settings: {},

  setRowId: (rowId: number) => set((state) => ({ ui: { ...state.ui, rowId } })),
  setTab: (tab: TabCode) => set((state) => ({ ui: { ...state.ui, tab } })),
  addFile: (file: File) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileId: string) =>
    set((state) => ({
      files: state.files.filter((file) => file.fileId !== fileId),
    })),
  removeAllFiles: () => set({ files: [] }),
  setFilter: (newFilter: Filter) =>
    set((state) => ({ filter: { ...state.filter, ...newFilter } })),
}));
