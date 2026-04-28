import { describe, it, expect, vi } from "vitest";

vi.mock("../plugins.config", () => ({}));

import type { AppState } from "../store/store";
import {
  initialUiState,
  initialFilterState,
  initialSettings,
  initialUiPersistentState,
  initialSortingState,
  initialJsonViewerSettings,
} from "../store/store";
import {
  selectFile,
  selectHarData,
  selectRawEntries,
  selectRawEntry,
  selectFileEntries,
  selectEntry,
  selectFileSize,
  selectEntriesNum,
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

const makeFile = (overrides: Partial<{ fileId: string; name: string; size: number; data: any }> = {}) => ({
  fileId: "file-1",
  name: "test.har",
  size: 1024,
  data: null,
  ...overrides,
});

describe("selectFile", () => {
  it("returns null when files array is empty", () => {
    expect(selectFile(makeState())).toBeNull();
  });

  it("returns null when no file matches the active fileId", () => {
    const state = makeState({
      files: [makeFile({ fileId: "file-1" })],
      ui: { ...initialUiState, fileId: "other" },
    });
    expect(selectFile(state)).toBeNull();
  });

  it("returns the matching file", () => {
    const file = makeFile({ fileId: "file-1" });
    const state = makeState({
      files: [file],
      ui: { ...initialUiState, fileId: "file-1" },
    });
    expect(selectFile(state)).toEqual(file);
  });
});

describe("selectHarData", () => {
  it("returns null when no file is selected", () => {
    expect(selectHarData(makeState())).toBeNull();
  });

  it("returns log from selected file", () => {
    const log = { entries: [], pages: [] };
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log } })],
      ui: { ...initialUiState, fileId: "f1" },
    });
    expect(selectHarData(state)).toBe(log);
  });
});

describe("selectRawEntries", () => {
  it("returns null when no file is selected", () => {
    expect(selectRawEntries(makeState())).toBeNull();
  });

  it("returns entries array from selected file", () => {
    const entries = [{ request: {} }, { request: {} }];
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log: { entries } } })],
      ui: { ...initialUiState, fileId: "f1" },
    });
    expect(selectRawEntries(state)).toBe(entries);
  });
});

describe("selectRawEntry", () => {
  it("returns null when no entries", () => {
    expect(selectRawEntry(makeState())).toBeNull();
  });

  it("returns entry at rowId index", () => {
    const entries = [{ request: { url: "a" } }, { request: { url: "b" } }];
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log: { entries } } })],
      ui: { ...initialUiState, fileId: "f1", rowId: 1 },
    });
    expect(selectRawEntry(state)).toEqual({ request: { url: "b" } });
  });
});

describe("selectFileEntries", () => {
  it("returns empty array when no file selected", () => {
    expect(selectFileEntries(makeState())).toEqual([]);
  });

  it("maps entries with $$id index", () => {
    const entries = [{ request: { url: "a" } }, { request: { url: "b" } }];
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log: { entries } } })],
      ui: { ...initialUiState, fileId: "f1" },
    });
    const result = selectFileEntries(state);
    expect(result[0]).toMatchObject({ request: { url: "a" }, $$id: 0 });
    expect(result[1]).toMatchObject({ request: { url: "b" }, $$id: 1 });
  });
});

describe("selectEntry", () => {
  it("returns undefined when no file selected", () => {
    expect(selectEntry(makeState())).toBeUndefined();
  });

  it("returns entry matching rowId", () => {
    const entries = [{ request: { url: "a" } }, { request: { url: "b" } }];
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log: { entries } } })],
      ui: { ...initialUiState, fileId: "f1", rowId: 0 },
    });
    expect(selectEntry(state)).toMatchObject({ request: { url: "a" }, $$id: 0 });
  });
});

describe("selectFileSize", () => {
  it("returns -1 when no file found", () => {
    expect(selectFileSize(makeState())).toBe(-1);
  });

  it("returns size of the active file", () => {
    const state = makeState({
      files: [makeFile({ fileId: "f1", size: 2048 })],
      ui: { ...initialUiState, fileId: "f1" },
    });
    expect(selectFileSize(state)).toBe(2048);
  });
});

describe("selectEntriesNum", () => {
  it("returns 0 when no file selected", () => {
    expect(selectEntriesNum(makeState())).toBe(0);
  });

  it("returns entry count", () => {
    const entries = [{}, {}, {}];
    const state = makeState({
      files: [makeFile({ fileId: "f1", data: { log: { entries } } })],
      ui: { ...initialUiState, fileId: "f1" },
    });
    expect(selectEntriesNum(state)).toBe(3);
  });
});
