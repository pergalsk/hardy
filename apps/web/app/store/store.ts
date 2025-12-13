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

export type Toast = {
  id?: string;
  message: string | JSX.Element;
  type?: "info" | "alert";
  icon?: string;
};

export type TabCode = "REQ" | "RES" | "COO" | "TIM";

export type Ui = {
  fileId: string;
  rowId: number;
  tab: TabCode;
};

export type JsonViewerSettings = {
  collapsed: number | boolean;
  indentWidth: number;
  enableClipboard: boolean;
  displayDataTypes: boolean;
  displayObjectSize: boolean;
  highlightUpdates: boolean;
  shortenTextAfterLength: number;
};

export type Settings = {
  jsonViewer: JsonViewerSettings;
};

export type AppState = {
  files: File[];
  filter: Filter;
  toasts: Toast[];
  ui: Ui;
  settings: Settings;
};

export const initialFilterFieldsState: Filter["fields"] = {
  url: "",
  method: "",
  status: "",
};

export const initialUiState: Ui = {
  fileId: "",
  rowId: 0,
  tab: "REQ",
};

export const initialJsonViewerSettings: JsonViewerSettings = {
  collapsed: 2,
  indentWidth: 24,
  enableClipboard: false,
  displayDataTypes: true,
  displayObjectSize: false,
  highlightUpdates: false,
  shortenTextAfterLength: 0,
};

export const useAppStore = create<AppState>(() => ({
  files: [],
  filter: {
    visible: false,
    active: false,
    fields: { ...initialFilterFieldsState },
  },
  toasts: [],
  ui: { ...initialUiState },
  settings: {
    jsonViewer: { ...initialJsonViewerSettings },
  },
}));
