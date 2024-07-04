import { create } from "zustand";

export type File = {
  fileId: string;
  name: string;
  size: number;
  data: any;
};

export type Filter = {
  visible: boolean;
  active: boolean;
  url: string;
  method: string;
  status: string;
};

export type TabCode = "REQ" | "RES" | "COO" | "TIM";

export type Ui = {
  fileId: number;
  rowId: number;
  tab: TabCode;
};

export type JsonViewerSettings = {
  collapsed: number;
  indentWidth: number;
  enableClipboard: boolean;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  highlightUpdates: boolean;
};

export type Settings = {
  jsonViewer: JsonViewerSettings;
};

export type State = {
  files: File[];
  filter: Filter;
  ui: Ui;
  settings: Settings;
};

export type Actions = {
  setFileId: (fileId: number) => void;
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
    fileId: 0,
    rowId: 0,
    tab: "REQ",
  },
  settings: {
    jsonViewer: {
      collapsed: 2,
      indentWidth: 24,
      enableClipboard: false,
      displayDataTypes: true,
      displayObjectSize: false,
      highlightUpdates: false,
    },
  },

  setFileId: (fileId: number) =>
    set((state) => ({ ui: { ...state.ui, fileId } })),
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
