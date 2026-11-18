import { describe, it, expect } from "vitest";
import type { Entry } from "@repo/har-types";
import { deriveListView } from "./listView";
import type { ListSettings } from "./listView";

const makeEntry = (
  pageref: string,
  method: string,
  url: string,
  status: number,
  time: number,
) =>
  ({
    pageref,
    startedDateTime: "2024-01-01T00:00:00.000Z",
    time,
    request: { method, url },
    response: { status, statusText: String(status) },
  }) as unknown as Entry;

// ids:            0         1         2         3
const entries = [
  makeEntry("page_1", "GET", "https://x.com/b", 200, 30),
  makeEntry("page_1", "POST", "https://x.com/a", 404, 10),
  makeEntry("page_2", "GET", "https://x.com/c", 500, 20),
  makeEntry("page_2", "DELETE", "https://x.com/d", 201, 5),
];

const makeSettings = (overrides: Partial<ListSettings> = {}): ListSettings => ({
  filterFields: { url: "", method: "", status: "" },
  showPinnedOnly: false,
  pinnedIds: new Set(),
  sorting: { sortBy: undefined, sortDir: "asc", sortInsidePages: false },
  showPages: false,
  hideEmptyPages: false,
  ...overrides,
});

const ids = (items: { $$id: number }[]) => items.map((item) => item.$$id);
const hiddenIds = (items: { $$id: number; $$hidden: boolean }[]) =>
  items.filter((item) => item.$$hidden).map((item) => item.$$id);

describe("deriveListView", () => {
  it("returns an empty view when there are no entries", () => {
    const view = deriveListView(null, makeSettings());
    expect(view.items).toEqual([]);
    expect(view.groups).toBeNull();
    expect(view.visibleIds).toEqual([]);
    expect(view.visibleCount).toBe(0);
    expect(view.isEntryVisible(0)).toBe(false);
  });

  it("shows all entries in original order by default", () => {
    const view = deriveListView(entries, makeSettings());
    expect(ids(view.items)).toEqual([0, 1, 2, 3]);
    expect(view.visibleIds).toEqual([0, 1, 2, 3]);
    expect(view.visibleCount).toBe(4);
    expect(view.groups).toBeNull();
  });

  describe("filter", () => {
    const settings = makeSettings({
      filterFields: { url: "", method: "GET", status: "" },
    });

    it("marks non-matching entries as hidden but keeps them in items", () => {
      const view = deriveListView(entries, settings);
      expect(ids(view.items)).toEqual([0, 1, 2, 3]);
      expect(hiddenIds(view.items)).toEqual([1, 3]);
    });

    it("counts and reports only matching entries as visible", () => {
      const view = deriveListView(entries, settings);
      expect(view.visibleIds).toEqual([0, 2]);
      expect(view.visibleCount).toBe(2);
      expect(view.isEntryVisible(0)).toBe(true);
      expect(view.isEntryVisible(1)).toBe(false);
    });
  });

  describe("pinned only", () => {
    it("keeps only pinned entries", () => {
      const view = deriveListView(
        entries,
        makeSettings({ showPinnedOnly: true, pinnedIds: new Set([1, 3]) }),
      );
      expect(ids(view.items)).toEqual([1, 3]);
      expect(view.visibleIds).toEqual([1, 3]);
      expect(view.isEntryVisible(0)).toBe(false);
      expect(view.isEntryVisible(1)).toBe(true);
    });

    it("is ignored when nothing is pinned", () => {
      const view = deriveListView(
        entries,
        makeSettings({ showPinnedOnly: true, pinnedIds: new Set() }),
      );
      expect(view.visibleCount).toBe(4);
    });

    it("is ignored when turned off", () => {
      const view = deriveListView(
        entries,
        makeSettings({ showPinnedOnly: false, pinnedIds: new Set([1]) }),
      );
      expect(view.visibleCount).toBe(4);
    });

    it("combines with the filter", () => {
      const view = deriveListView(
        entries,
        makeSettings({
          showPinnedOnly: true,
          pinnedIds: new Set([0, 1]),
          filterFields: { url: "", method: "GET", status: "" },
        }),
      );
      expect(ids(view.items)).toEqual([0, 1]);
      expect(view.visibleIds).toEqual([0]);
      expect(view.isEntryVisible(2)).toBe(false);
    });
  });

  describe("sorting without pages", () => {
    it.each([
      ["url", "asc", [1, 0, 2, 3]],
      ["url", "desc", [3, 2, 0, 1]],
      ["method", "asc", [3, 0, 2, 1]],
      ["status", "asc", [0, 3, 1, 2]],
      ["status", "desc", [2, 1, 3, 0]],
      ["time", "asc", [3, 1, 2, 0]],
      ["pageref", "desc", [2, 3, 0, 1]],
    ] as const)("sorts by %s %s", (sortBy, sortDir, expected) => {
      const view = deriveListView(
        entries,
        makeSettings({
          sorting: { sortBy, sortDir, sortInsidePages: false },
        }),
      );
      expect(ids(view.items)).toEqual(expected);
    });

    it("keeps visible ids in original order", () => {
      const view = deriveListView(
        entries,
        makeSettings({
          sorting: { sortBy: "time", sortDir: "asc", sortInsidePages: false },
        }),
      );
      expect(view.visibleIds).toEqual([0, 1, 2, 3]);
    });
  });

  describe("page groups", () => {
    it("groups by page in original order when not sorted", () => {
      const view = deriveListView(entries, makeSettings({ showPages: true }));
      expect(view.groups!.map(ids)).toEqual([
        [0, 1],
        [2, 3],
      ]);
    });

    it("sorts inside each page when sortInsidePages is on", () => {
      const view = deriveListView(
        entries,
        makeSettings({
          showPages: true,
          sorting: { sortBy: "time", sortDir: "asc", sortInsidePages: true },
        }),
      );
      expect(view.groups!.map(ids)).toEqual([
        [1, 0],
        [3, 2],
      ]);
    });

    it("sorts first and then groups when sortInsidePages is off", () => {
      const view = deriveListView(
        entries,
        makeSettings({
          showPages: true,
          sorting: { sortBy: "time", sortDir: "asc", sortInsidePages: false },
        }),
      );
      // time order: 3 (p2), 1 (p1), 2 (p2), 0 (p1)
      expect(view.groups!.map(ids)).toEqual([[3], [1], [2], [0]]);
    });
  });

  describe("hide empty pages", () => {
    const filterFields = { url: "", method: "", status: "404" };

    it("removes pages with no visible entries", () => {
      const view = deriveListView(
        entries,
        makeSettings({ showPages: true, hideEmptyPages: true, filterFields }),
      );
      expect(view.groups!.map(ids)).toEqual([[0, 1]]);
      expect(hiddenIds(view.groups![0]!)).toEqual([0]);
    });

    it("keeps pages with no visible entries when turned off", () => {
      const view = deriveListView(
        entries,
        makeSettings({ showPages: true, hideEmptyPages: false, filterFields }),
      );
      expect(view.groups!.map(ids)).toEqual([
        [0, 1],
        [2, 3],
      ]);
    });

    it("removes pages emptied by pinned only", () => {
      const view = deriveListView(
        entries,
        makeSettings({
          showPages: true,
          hideEmptyPages: true,
          showPinnedOnly: true,
          pinnedIds: new Set([2]),
        }),
      );
      expect(view.groups!.map(ids)).toEqual([[2]]);
    });
  });
});
