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
import { selectTab } from "./selectors";

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

describe("selectTab", () => {
  it("returns default tab REQ", () => {
    expect(selectTab(makeState())).toBe("REQ");
  });

  it("returns the active tab code", () => {
    const state = makeState({ ui: { ...initialUiState, tab: "RES" } });
    expect(selectTab(state)).toBe("RES");
  });

  it("returns COO tab", () => {
    const state = makeState({ ui: { ...initialUiState, tab: "COO" } });
    expect(selectTab(state)).toBe("COO");
  });

  it("returns TIM tab", () => {
    const state = makeState({ ui: { ...initialUiState, tab: "TIM" } });
    expect(selectTab(state)).toBe("TIM");
  });
});
