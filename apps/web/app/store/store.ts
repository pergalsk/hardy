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
  fields: {
    url: string;
    method: string;
    status: string;
  };
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

export type AppState = {
  files: File[];
  filter: Filter;
  ui: Ui;
  settings: Settings;
};

export const useAppStore = create<AppState>(() => ({
  files: [],
  filter: {
    visible: false,
    active: false,
    fields: {
      url: "",
      method: "",
      status: "",
    },
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
}));
