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
import { selectFiles, selectFileId, selectFileTabs } from "./selectors";

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

const makeFile = (fileId: string, name: string, size = 1024) => ({
  fileId,
  name,
  size,
  data: {},
});

describe("selectFiles", () => {
  it("returns empty array by default", () => {
    expect(selectFiles(makeState())).toEqual([]);
  });

  it("returns the files array", () => {
    const files = [makeFile("f1", "a.har"), makeFile("f2", "b.har")];
    const state = makeState({ files });
    expect(selectFiles(state)).toBe(files);
    expect(selectFiles(state)).toHaveLength(2);
  });
});

describe("selectFileId", () => {
  it("returns empty string by default", () => {
    expect(selectFileId(makeState())).toBe("");
  });

  it("returns the active fileId", () => {
    const state = makeState({ ui: { ...initialUiState, fileId: "file-xyz" } });
    expect(selectFileId(state)).toBe("file-xyz");
  });
});

describe("selectFileTabs", () => {
  it("returns empty array when no files", () => {
    expect(selectFileTabs(makeState())).toEqual([]);
  });

  it("maps files to fileId + name only", () => {
    const files = [makeFile("f1", "first.har", 500), makeFile("f2", "second.har", 800)];
    const state = makeState({ files });
    expect(selectFileTabs(state)).toEqual([
      { fileId: "f1", name: "first.har" },
      { fileId: "f2", name: "second.har" },
    ]);
  });

  it("omits size and data from tabs", () => {
    const files = [makeFile("f1", "a.har", 9999)];
    const state = makeState({ files });
    const [tab] = selectFileTabs(state);
    expect(tab).not.toHaveProperty("size");
    expect(tab).not.toHaveProperty("data");
  });
});
