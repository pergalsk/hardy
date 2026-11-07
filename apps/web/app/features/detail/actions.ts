import { useAppStore, TabCode } from "../../store/store";

export const setTab = (tab: TabCode) =>
  useAppStore.setState((state) => ({
    ui: { ...state.ui, tab, searchTarget: null },
  }));

export const setDetailFormatter = (formatterId: string) =>
  useAppStore.setState((state) => ({
    uiPersistent: { ...state.uiPersistent, detailFormatterId: formatterId },
  }));
