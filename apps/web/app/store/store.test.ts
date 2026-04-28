import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../plugins.config", () => ({ bootstrapPlugins: vi.fn() }));
vi.mock("zustand/middleware", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  persist: (fn: any) => fn,
  createJSONStorage: vi.fn(),
}));

import { createStore } from "zustand/vanilla";
import type { AppState } from "./store";
import {
  initialSortingState,
  initialFilterState,
  initialFilterFieldsState,
  initialUiState,
  initialSettings,
  initialUiPersistentState,
  initialJsonViewerSettings,
} from "./store";

describe("store – initial state constants", () => {
  it("initialSortingState has expected defaults", () => {
    expect(initialSortingState.sortBy).toBeUndefined();
    expect(initialSortingState.sortDir).toBe("asc");
    expect(initialSortingState.sortInsidePages).toBe(false);
  });

  it("initialFilterFieldsState has empty strings", () => {
    expect(initialFilterFieldsState.url).toBe("");
    expect(initialFilterFieldsState.method).toBe("");
    expect(initialFilterFieldsState.status).toBe("");
  });

  it("initialFilterState has expected defaults", () => {
    expect(initialFilterState.visible).toBe(false);
    expect(initialFilterState.active).toBe(false);
    expect(initialFilterState.count).toBe(-1);
    expect(initialFilterState.fields).toEqual(initialFilterFieldsState);
  });

  it("initialUiState has expected defaults", () => {
    expect(initialUiState.fileId).toBe("");
    expect(initialUiState.rowId).toBe(0);
    expect(initialUiState.pinnedIds).toBeInstanceOf(Set);
    expect(initialUiState.pinnedIds.size).toBe(0);
    expect(initialUiState.showPinnedOnly).toBe(false);
    expect(initialUiState.tab).toBe("REQ");
  });

  it("initialSettings has expected defaults", () => {
    expect(initialSettings.groupHidden).toBe(true);
    expect(initialSettings.excludeHidden).toBe(false);
    expect(initialSettings.hideEmptyPages).toBe(true);
  });

  it("initialJsonViewerSettings has expected defaults", () => {
    expect(initialJsonViewerSettings.collapsed).toBe(2);
    expect(initialJsonViewerSettings.indentWidth).toBe(24);
    expect(initialJsonViewerSettings.enableClipboard).toBe(false);
    expect(initialJsonViewerSettings.displayDataTypes).toBe(true);
    expect(initialJsonViewerSettings.displayObjectSize).toBe(false);
    expect(initialJsonViewerSettings.highlightUpdates).toBe(false);
    expect(initialJsonViewerSettings.shortenTextAfterLength).toBe(0);
  });

  it("initialUiPersistentState has filterActive true by default", () => {
    expect(initialUiPersistentState.filterActive).toBe(true);
    expect(initialUiPersistentState.sortingActive).toBe(false);
    expect(initialUiPersistentState.showPages).toBe(false);
  });
});

describe("store – isolated createStore instances", () => {
  let store: ReturnType<typeof createStore<AppState>>;

  const makeState = (overrides: Partial<AppState> = {}): AppState => ({
    files: [],
    toasts: [],
    filter: { ...initialFilterState },
    ui: { ...initialUiState },
    uiPersistent: { ...initialUiPersistentState },
    settings: { ...initialSettings },
    sorting: { ...initialSortingState },
    jsonViewer: { ...initialJsonViewerSettings },
    ...overrides,
  });

  beforeEach(() => {
    store = createStore<AppState>()(() => makeState());
  });

  it("starts with empty files array", () => {
    expect(store.getState().files).toEqual([]);
  });

  it("starts with empty toasts array", () => {
    expect(store.getState().toasts).toEqual([]);
  });

  it("state can be set on isolated instance without affecting others", () => {
    const storeA = createStore<AppState>()(() => makeState());
    const storeB = createStore<AppState>()(() => makeState());

    storeA.setState({ files: [{ fileId: "a", name: "a.har", size: 100, data: {} }] });

    expect(storeA.getState().files).toHaveLength(1);
    expect(storeB.getState().files).toHaveLength(0);
  });

  it("ui.tab defaults to REQ", () => {
    expect(store.getState().ui.tab).toBe("REQ");
  });

  it("filter.count defaults to -1", () => {
    expect(store.getState().filter.count).toBe(-1);
  });
});
