import {
  useAppStore,
  Filter,
  SortField,
  initialFilterState,
  initialFilterFieldsState,
} from "../../store/store";

export const setRowId = (rowId: number) =>
  useAppStore.setState((state) => ({ ui: { ...state.ui, rowId } }));

export const setShowPinnedOnly = (showPinnedOnly: boolean) =>
  useAppStore.setState((state) => ({
    ui: { ...state.ui, showPinnedOnly },
  }));

export const setFilteredCount = (count: number) =>
  useAppStore.setState((state) => ({
    filter: { ...state.filter, count },
  }));

export const setFilter = (newFilter: Filter) =>
  useAppStore.setState((state) => ({
    filter: { ...state.filter, ...newFilter },
  }));

export const clearFilter = () =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      count: initialFilterState.count,
      fields: { ...initialFilterFieldsState },
    },
  }));

export const setFilterFields = (newFilterFields: Filter["fields"]) =>
  useAppStore.setState((state) => ({
    filter: {
      ...state.filter,
      fields: { ...state.filter.fields, ...newFilterFields },
    },
  }));

export const setSorting = (
  sortBy?: SortField,
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
