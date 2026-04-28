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
import { selectToasts } from "./selectors";

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

describe("selectToasts", () => {
  it("returns empty array by default", () => {
    expect(selectToasts(makeState())).toEqual([]);
  });

  it("returns the toasts array", () => {
    const toasts = [
      { id: "t1", message: "Hello", type: "info" as const },
      { id: "t2", message: "Error", type: "alert" as const },
    ];
    const state = makeState({ toasts });
    expect(selectToasts(state)).toBe(toasts);
    expect(selectToasts(state)).toHaveLength(2);
  });

  it("reflects toast message content", () => {
    const state = makeState({ toasts: [{ id: "x", message: "Test msg", type: "info" }] });
    expect(selectToasts(state)[0].message).toBe("Test msg");
  });
});
