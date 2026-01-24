import { create } from "zustand";
import { detailFormatters } from "../providers/detailFormatter";

export type File = {
  fileId: string;
  name: string;
  size: number;
  data: any;
};

export type Filter = {
  visible: boolean;
  active: boolean;
  count: number;
  fields: {
    url: string;
    method: string;
    status: string;
  };
};

export type Sorting = {
  sortBy?: "url" | "status" | "method" | "time" | "pageref";
  sortDir: "asc" | "desc";
  sortInsidePages: boolean;
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
  filterActive: boolean;
  sortingActive: boolean;
  detailFormatterId: string | null;
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
  showPages: boolean;
  groupHidden: boolean;
  excludeHidden: boolean;
  hideEmptyPages: boolean;
};

// default settings exported so other modules can reset to them
export const initialSettings: Settings = {
  showPages: false,
  groupHidden: true,
  excludeHidden: false,
  hideEmptyPages: true,
};

export const initialSortingState: Sorting = {
  sortBy: undefined,
  sortDir: "asc",
  sortInsidePages: false,
};

export type AppState = {
  files: File[];
  toasts: Toast[];
  filter: Filter;
  ui: Ui;
  jsonViewer: JsonViewerSettings;
  settings: Settings;
  sorting: Sorting;
};

export const initialFilterFieldsState: Filter["fields"] = {
  url: "",
  method: "",
  status: "",
};

export const initialFilterState: Filter = {
  visible: false,
  active: false,
  count: -1,
  fields: { ...initialFilterFieldsState },
};

export const initialUiState: Ui = {
  fileId: "",
  rowId: 0,
  tab: "REQ",
  filterActive: false,
  sortingActive: false,
  detailFormatterId:
    detailFormatters.getDefaultFormatter("detail")?.[0] || null,
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
  toasts: [],
  filter: { ...initialFilterState },
  ui: { ...initialUiState },
  jsonViewer: { ...initialJsonViewerSettings },
  settings: { ...initialSettings },
  sorting: { ...initialSortingState },
}));
