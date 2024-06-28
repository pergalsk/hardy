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