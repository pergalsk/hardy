import { describe, it, expect, vi } from "vitest";

vi.mock("../../plugins.config", () => ({}));

import type { AppState } from "../../store/store";
import {
  initialUiState,
  initialFilterState,
  initialSettings,
  initialUiPersistentState,
  initialSortingState,
  initialJsonViewerSettings,
} from "../../store/store";
import {
  selectFilter,
  selectSorting,
  selectPinnedIds,
  selectRowId,
  selectShowPinnedOnly,
  selectFilteredCount,
} from "./selectors";

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

describe("selectFilter", () => {
  it("returns the filter slice", () => {
    const state = makeState();
    expect(selectFilter(state)).toBe(state.filter);
  });

  it("reflects a custom filter state", () => {
    const customFilter = { ...initialFilterState, active: true, count: 5 };
    const state = makeState({ filter: customFilter });
    expect(selectFilter(state).active).toBe(true);
    expect(selectFilter(state).count).toBe(5);
  });
});

describe("selectSorting", () => {
  it("returns the sorting slice", () => {
    const state = makeState();
    expect(selectSorting(state)).toBe(state.sorting);
  });

  it("reflects a custom sorting direction", () => {
    const state = makeState({ sorting: { ...initialSortingState, sortDir: "desc" } });
    expect(selectSorting(state).sortDir).toBe("desc");
  });
});

describe("selectPinnedIds", () => {
  it("returns empty Set by default", () => {
    expect(selectPinnedIds(makeState())).toBeInstanceOf(Set);
    expect(selectPinnedIds(makeState()).size).toBe(0);
  });

  it("returns the pinned IDs set", () => {
    const pinnedIds = new Set([1, 2, 3]);
    const state = makeState({ ui: { ...initialUiState, pinnedIds } });
    expect(selectPinnedIds(state)).toBe(pinnedIds);
    expect(selectPinnedIds(state).has(2)).toBe(true);
  });
});

describe("selectRowId", () => {
  it("returns 0 by default", () => {
    expect(selectRowId(makeState())).toBe(0);
  });

  it("returns the active rowId", () => {
    const state = makeState({ ui: { ...initialUiState, rowId: 42 } });
    expect(selectRowId(state)).toBe(42);
  });
});

describe("selectShowPinnedOnly", () => {
  it("returns false by default", () => {
    expect(selectShowPinnedOnly(makeState())).toBe(false);
  });

  it("returns true when showPinnedOnly is set", () => {
    const state = makeState({ ui: { ...initialUiState, showPinnedOnly: true } });
    expect(selectShowPinnedOnly(state)).toBe(true);
  });
});

describe("selectFilteredCount", () => {
  it("returns -1 by default", () => {
    expect(selectFilteredCount(makeState())).toBe(-1);
  });

  it("returns the filtered count", () => {
    const state = makeState({ filter: { ...initialFilterState, count: 7 } });
    expect(selectFilteredCount(state)).toBe(7);
  });
});
