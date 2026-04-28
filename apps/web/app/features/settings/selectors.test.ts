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
  selectSettings,
  selectJsonViewerSettings,
  selectFilterActive,
  selectSortingActive,
  selectShowPages,
  selectDetailFormatterId,
  selectUiPersistent,
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

describe("selectSettings", () => {
  it("returns the settings slice", () => {
    const state = makeState();
    expect(selectSettings(state)).toBe(state.settings);
  });

  it("reflects custom settings", () => {
    const state = makeState({ settings: { ...initialSettings, excludeHidden: true } });
    expect(selectSettings(state).excludeHidden).toBe(true);
    expect(selectSettings(state).groupHidden).toBe(true);
  });
});

describe("selectJsonViewerSettings", () => {
  it("returns the jsonViewer slice", () => {
    const state = makeState();
    expect(selectJsonViewerSettings(state)).toBe(state.jsonViewer);
  });

  it("reflects custom collapsed value", () => {
    const state = makeState({ jsonViewer: { ...initialJsonViewerSettings, collapsed: 0 } });
    expect(selectJsonViewerSettings(state).collapsed).toBe(0);
  });
});

describe("selectFilterActive", () => {
  it("returns true by default", () => {
    expect(selectFilterActive(makeState())).toBe(true);
  });

  it("returns false when filterActive is off", () => {
    const state = makeState({
      uiPersistent: { ...initialUiPersistentState, filterActive: false },
    });
    expect(selectFilterActive(state)).toBe(false);
  });
});

describe("selectSortingActive", () => {
  it("returns false by default", () => {
    expect(selectSortingActive(makeState())).toBe(false);
  });

  it("returns true when sortingActive is on", () => {
    const state = makeState({
      uiPersistent: { ...initialUiPersistentState, sortingActive: true },
    });
    expect(selectSortingActive(state)).toBe(true);
  });
});

describe("selectShowPages", () => {
  it("returns false by default", () => {
    expect(selectShowPages(makeState())).toBe(false);
  });

  it("returns true when showPages is on", () => {
    const state = makeState({
      uiPersistent: { ...initialUiPersistentState, showPages: true },
    });
    expect(selectShowPages(state)).toBe(true);
  });
});

describe("selectDetailFormatterId", () => {
  it("returns a string or null", () => {
    const value = selectDetailFormatterId(makeState());
    expect(value === null || typeof value === "string").toBe(true);
  });

  it("returns null when explicitly set to null", () => {
    const state = makeState({
      uiPersistent: { ...initialUiPersistentState, detailFormatterId: null },
    });
    expect(selectDetailFormatterId(state)).toBeNull();
  });

  it("returns the formatter id string", () => {
    const state = makeState({
      uiPersistent: { ...initialUiPersistentState, detailFormatterId: "my-formatter" },
    });
    expect(selectDetailFormatterId(state)).toBe("my-formatter");
  });
});

describe("selectUiPersistent", () => {
  it("returns the uiPersistent slice", () => {
    const state = makeState();
    expect(selectUiPersistent(state)).toBe(state.uiPersistent);
  });

  it("reflects all persistent ui fields", () => {
    const custom = {
      filterActive: false,
      sortingActive: true,
      showPages: true,
      detailFormatterId: "fmt-1",
    };
    const state = makeState({ uiPersistent: custom });
    expect(selectUiPersistent(state)).toEqual(custom);
  });
});
