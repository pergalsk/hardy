import type { Entry } from "@repo/har-types";
import type { Filter, Sorting } from "../../../store/store";
import type { ListItem, SortField } from "../types";
import { deriveListData } from "./deriveListData";
import { markVisible } from "./filter";
import { groupByProperty } from "./groupByProperty";

export type ListSettings = {
  filterFields: Filter["fields"];
  showPinnedOnly: boolean;
  pinnedIds: Set<number>;
  sorting: Sorting;
  showPages: boolean;
  hideEmptyPages: boolean;
};

export type ListView = {
  /** sorted items, marked with `$$visible` / `$$hidden` */
  items: ListItem[];
  /** page groups (only when pages are shown), empty pages already removed if hidden */
  groups: ListItem[][] | null;
  /** ids of visible entries, in original order */
  visibleIds: number[];
  visibleCount: number;
  isEntryVisible: (id: number) => boolean;
};

function sortItemsArray(
  items: ListItem[],
  sortBy?: SortField | undefined,
  sortDirection: "asc" | "desc" = "asc",
) {
  if (!sortBy) return items.slice();

  const directionFactor = sortDirection === "asc" ? 1 : -1;

  const compareValues = (a: ListItem, b: ListItem) => {
    const va = a[sortBy];
    const vb = b[sortBy];

    if (va == null && vb == null) return 0;
    if (va == null) return -1 * directionFactor;
    if (vb == null) return 1 * directionFactor;

    if (sortBy === "time" || sortBy === "status") {
      const na = Number(va) || 0;
      const nb = Number(vb) || 0;
      return (na - nb) * directionFactor;
    }

    const sa = String(va).toLowerCase();
    const sb = String(vb).toLowerCase();
    return sa.localeCompare(sb) * directionFactor;
  };

  return items
    .map((value, index) => ({ value, index }))
    .sort((x, y) => {
      const cmp = compareValues(x.value, y.value);
      return cmp !== 0 ? cmp : x.index - y.index;
    })
    .map((x) => x.value);
}

/**
 * Single place for the list visibility rules:
 * pinned only, filter, sorting, page grouping and hidden empty pages.
 */
export function deriveListView(
  entries: Entry[] | null,
  settings: ListSettings,
): ListView {
  const { filterFields, showPinnedOnly, pinnedIds, sorting, showPages } =
    settings;

  const listData = deriveListData(entries);

  const pinned =
    showPinnedOnly && pinnedIds.size > 0
      ? listData.filter((item) => pinnedIds.has(item.$$id))
      : listData;

  const marked = pinned.map(markVisible(filterFields));

  const visibleIds = marked
    .filter((item) => item.$$visible)
    .map((item) => item.$$id);
  const visibleSet = new Set(visibleIds);

  const { sortBy, sortDir = "asc", sortInsidePages } = sorting;
  const items = sortItemsArray(marked, sortBy, sortDir);

  let groups: ListItem[][] | null = null;
  if (showPages) {
    groups = sortInsidePages
      ? groupByProperty(marked, "pageref").map((group) =>
          sortItemsArray(group, sortBy, sortDir),
        )
      : groupByProperty(items, "pageref");

    if (settings.hideEmptyPages) {
      groups = groups.filter((group) => group.some((item) => item.$$visible));
    }
  }

  return {
    items,
    groups,
    visibleIds,
    visibleCount: visibleIds.length,
    isEntryVisible: (id) => visibleSet.has(id),
  };
}
