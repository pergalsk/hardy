import { beforeEach, describe, expect, it } from "vitest";
import {
  useAppStore,
  initialFilterState,
  initialUiState,
  type File,
} from "../../store/store";
import { closeFile, openFile, switchFile } from "./session";

const makeFile = (fileId: string): File => ({
  fileId,
  name: `${fileId}.har`,
  size: 0,
  data: null,
});

// Row selection, pins and filter as left by working with a file.
const dirtyState = () =>
  useAppStore.setState((state) => ({
    ui: {
      ...state.ui,
      rowId: 5,
      pinnedIds: new Set([1, 2]),
      showPinnedOnly: true,
      searchTarget: { section: "url", label: "URL", query: "x", key: 1 },
    },
    filter: {
      ...state.filter,
      active: true,
      fields: { url: "api", method: "GET", status: "200" },
    },
  }));

// The state a file session resets.
const sessionState = () => {
  const { ui, filter } = useAppStore.getState();
  return {
    rowId: ui.rowId,
    pinnedIds: [...ui.pinnedIds],
    showPinnedOnly: ui.showPinnedOnly,
    searchTarget: ui.searchTarget ?? null,
    filterFields: filter.fields,
  };
};

const CLEAN = {
  rowId: 0,
  pinnedIds: [],
  showPinnedOnly: false,
  searchTarget: null,
  filterFields: { url: "", method: "", status: "" },
};

const DIRTY = {
  rowId: 5,
  pinnedIds: [1, 2],
  showPinnedOnly: true,
  searchTarget: { section: "url", label: "URL", query: "x", key: 1 },
  filterFields: { url: "api", method: "GET", status: "200" },
};

const fileIds = () => useAppStore.getState().files.map((f) => f.fileId);
const activeId = () => useAppStore.getState().ui.fileId;

beforeEach(() => {
  useAppStore.setState({
    files: [],
    ui: { ...initialUiState, pinnedIds: new Set() },
    filter: { ...initialFilterState },
  });
});

describe("openFile", () => {
  it("adds the file and makes it active", () => {
    openFile(makeFile("a"));
    openFile(makeFile("b"));

    expect(fileIds()).toEqual(["a", "b"]);
    expect(activeId()).toBe("b");
  });

  it("resets row selection, pins and filter", () => {
    openFile(makeFile("a"));
    dirtyState();

    openFile(makeFile("b"));

    expect(sessionState()).toEqual(CLEAN);
  });

  it("keeps the filter panel setting", () => {
    openFile(makeFile("a"));
    dirtyState();

    openFile(makeFile("b"));

    expect(useAppStore.getState().filter.active).toBe(true);
  });
});

describe("switchFile", () => {
  beforeEach(() => {
    openFile(makeFile("a"));
    openFile(makeFile("b"));
  });

  it("makes the file active and resets row selection, pins and filter", () => {
    dirtyState();

    switchFile("a");

    expect(activeId()).toBe("a");
    expect(fileIds()).toEqual(["a", "b"]);
    expect(sessionState()).toEqual(CLEAN);
  });

  it("does nothing when the file is already active", () => {
    dirtyState();

    switchFile("b");

    expect(activeId()).toBe("b");
    expect(sessionState()).toEqual(DIRTY);
  });
});

describe("closeFile", () => {
  beforeEach(() => {
    openFile(makeFile("a"));
    openFile(makeFile("b"));
    openFile(makeFile("c"));
  });

  it("selects the previous file when the active file is closed", () => {
    switchFile("b");
    dirtyState();

    closeFile("b");

    expect(fileIds()).toEqual(["a", "c"]);
    expect(activeId()).toBe("a");
    expect(sessionState()).toEqual(CLEAN);
  });

  it("selects the previous file when the last active file is closed", () => {
    closeFile("c");

    expect(fileIds()).toEqual(["a", "b"]);
    expect(activeId()).toBe("b");
  });

  it("selects the next file when the first active file is closed", () => {
    switchFile("a");

    closeFile("a");

    expect(fileIds()).toEqual(["b", "c"]);
    expect(activeId()).toBe("b");
  });

  it("shows the start screen when the only file is closed", () => {
    closeFile("a");
    closeFile("b");
    dirtyState();

    closeFile("c");

    expect(fileIds()).toEqual([]);
    expect(activeId()).toBe("");
    expect(sessionState()).toEqual(CLEAN);
  });

  it("keeps the active file and its state when another file is closed", () => {
    dirtyState();

    closeFile("a");

    expect(fileIds()).toEqual(["b", "c"]);
    expect(activeId()).toBe("c");
    expect(sessionState()).toEqual(DIRTY);
  });

  it("ignores an unknown file id", () => {
    dirtyState();

    closeFile("x");

    expect(fileIds()).toEqual(["a", "b", "c"]);
    expect(activeId()).toBe("c");
    expect(sessionState()).toEqual(DIRTY);
  });
});
