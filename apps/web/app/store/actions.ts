import { nanoid } from "nanoid";
import {
  useAppStore,
  File,
  Filter,
  TabCode,
  initialFilterState,
  initialFilterFieldsState,
  Toast,
} from "./store";

export const setFileId = (fileId: string) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, fileId } }));

export const setRowId = (rowId: number) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, rowId } }));

export const setTab = (tab: TabCode) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, tab } }));

export const setShowPinnedOnly = (showPinnedOnly: boolean) =>
  useAppStore.setState((state) => ({
    ui: { ...state.ui, showPinnedOnly },
  }));

export const setFilterActive = (filterActive: boolean) =>
  useAppStore.setState((state) => ({
    uiPersistent: { ...state.uiPersistent, filterActive },
  }));

export const setSortingActive = (sortingActive: boolean) =>
  useAppStore.setState((state) => ({
    uiPersistent: { ...state.uiPersistent, sortingActive },
  }));

export const setShowPages = (showPages: boolean) =>
  useAppStore.setState((state) => ({
    uiPersistent: { ...state.uiPersistent, showPages },
  }));

export const addFile = (file: File) =>
  useAppStore.setState((state) => ({ files: [...state.files, file] }));

export const removeFile = (fileId: string) =>
  useAppStore.setState((state) => ({
    files: state.files.filter((file) => file.fileId !== fileId),
  }));

export const removeAllFiles = () => useAppStore.setState({ files: [] });

export const setFilteredCount = (count: number) =>
  useAppStore.setState((state) => ({
    filter: { ...state.filter, count },
  }));

export const setFilter = (newFilter: Filter) =>
  useAppStore.setState((state) => ({
    filter: { ...state.filter, ...newFilter },
  }));

// todo: simplify with immer
export const clearFilter = () =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      count: initialFilterState.count,
      fields: { ...initialFilterFieldsState },
    },
  }));

// todo: simplify with immer
export const setFilterFields = (newFilterFields: Filter["fields"]) =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      fields: { ...state.filter.fields, ...newFilterFields },
    },
  }));

export const addToast = (toast: Omit<Toast, "id">): string => {
  const id = nanoid();
  useAppStore.setState((state) => ({
    toasts: [...state.toasts, { ...toast, id }],
  }));
  return id;
};

export const removeToast = (id: Toast["id"]) =>
  useAppStore.setState((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  }));

export const removeAllToasts = () => useAppStore.setState({ toasts: [] });

export const jsonViewerCollapse = (collapsed: number | boolean) =>
  useAppStore.setState((state) => ({
    jsonViewer: {
      ...state.jsonViewer,
      collapsed,
    },
  }));

// sorting actions
export const setSorting = (
  sortBy?: "url" | "status" | "method" | "time" | "pageref",
  dir?: "asc" | "desc",
) =>
  useAppStore.setState((state) => {
    const current = state.sorting;
    if (!sortBy) {
      return { sorting: { ...current, sortBy: undefined, sortDir: "asc" } };
    }
    const newDir =
      dir ??
      (current.sortBy === sortBy
        ? current.sortDir === "asc"
          ? "desc"
          : "asc"
        : "asc");
    return { sorting: { ...current, sortBy, sortDir: newDir } };
  });

export const setSortInsidePages = (inside: boolean) =>
  useAppStore.setState((state) => ({
    sorting: { ...state.sorting, sortInsidePages: inside },
  }));

export const toggleSortInsidePages = () =>
  useAppStore.setState((state) => ({
    sorting: {
      ...state.sorting,
      sortInsidePages: !state.sorting.sortInsidePages,
    },
  }));

export const clearSorting = () =>
  useAppStore.setState((state) => ({
    sorting: {
      ...state.sorting,
      sortBy: undefined,
      sortDir: "asc",
      sortInsidePages: false,
    },
  }));

export const setDetailFormatter = (formatterId: string) =>
  useAppStore.setState((state) => ({
    uiPersistent: { ...state.uiPersistent, detailFormatterId: formatterId },
  }));

export const clearAllPinned = () =>
  useAppStore.setState((state) => ({
    ui: {
      ...state.ui,
      pinnedIds: new Set(),
      showPinnedOnly: false,
    },
  }));

export const togglePinnedRow = (rowId: number) =>
  useAppStore.setState((state) => {
    const pinnedIds = new Set(state.ui.pinnedIds);
    if (pinnedIds.has(rowId)) {
      pinnedIds.delete(rowId);
    } else {
      pinnedIds.add(rowId);
    }
    return {
      ui: {
        ...state.ui,
        pinnedIds,
        showPinnedOnly: pinnedIds.size > 0 ? state.ui.showPinnedOnly : false,
      },
    };
  });
