import { useAppStore } from "../../store/store";

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

export const jsonViewerCollapse = (collapsed: number | boolean) =>
  useAppStore.setState((state) => ({
    jsonViewer: {
      ...state.jsonViewer,
      collapsed,
    },
  }));
