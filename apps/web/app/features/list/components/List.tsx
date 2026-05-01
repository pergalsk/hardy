"use client";
import type React from "react";
import { useEffect, useMemo } from "react";
import { useAppStore } from "../../../store/store";
import {
  selectFilterFields,
  selectPinnedIds,
  selectShowPinnedOnly,
  selectSorting,
} from "../selectors";
import { selectRawEntries } from "../../../core/selectors";
import { selectSettings, selectShowPages } from "../../settings/selectors";
import { setFilteredCount } from "../actions";
import { deriveListData } from "../helpers/deriveListData";
import { markVisible } from "../helpers/filter";
import { groupByProperty } from "../helpers/groupByProperty";
import { PanelList } from "./PanelList";
import { ListItems } from "./ListItems";
import { PageRefGroup } from "./PageRefGroup";

function sortItemsArray(
  items: any[],
  sortBy?: string | undefined,
  sortDirection: "asc" | "desc" = "asc",
) {
  if (!sortBy) return items.slice();

  const directionFactor = sortDirection === "asc" ? 1 : -1;

  const compareValues = (a: any, b: any) => {
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

export function List(): React.JSX.Element {
  const filterFields = useAppStore(selectFilterFields);
  const rawEntries = useAppStore(selectRawEntries);
  const { hideEmptyPages } = useAppStore(selectSettings);
  const sorting = useAppStore(selectSorting);
  const showPages = useAppStore(selectShowPages);
  const showPinnedOnly = useAppStore(selectShowPinnedOnly);
  const pinnedIds = useAppStore(selectPinnedIds);

  const rawListData = useMemo(() => deriveListData(rawEntries), [rawEntries]);

  const rawListPinned = useMemo(
    () =>
      showPinnedOnly && pinnedIds.size > 0
        ? rawListData.filter((entry: any) => pinnedIds.has(entry.$$id))
        : rawListData,
    [rawListData, showPinnedOnly, pinnedIds],
  );

  const entriesWithVisibility = useMemo(
    () => rawListPinned.map(markVisible(filterFields)),
    [rawListPinned, filterFields],
  );

  const visibleEntries = useMemo(
    () => entriesWithVisibility.filter((entry: any) => !entry.$$hidden),
    [entriesWithVisibility],
  );

  const sortByField = sorting.sortBy;
  const sortDirection = sorting.sortDir || "asc";
  const sortInsidePages = !!sorting.sortInsidePages;

  const sortedList = useMemo(
    () => sortItemsArray(entriesWithVisibility, sortByField, sortDirection),
    [entriesWithVisibility, sortByField, sortDirection],
  );

  const sortedPageGroups = useMemo(
    () =>
      showPages
        ? sortInsidePages
          ? groupByProperty(entriesWithVisibility, "pageref").map((pageGroup) =>
              sortItemsArray(pageGroup, sortByField, sortDirection),
            )
          : groupByProperty(
              sortItemsArray(entriesWithVisibility, sortByField, sortDirection),
              "pageref",
            )
        : null,
    [
      entriesWithVisibility,
      sortByField,
      sortDirection,
      sortInsidePages,
      showPages,
    ],
  );

  useEffect(() => {
    setFilteredCount(visibleEntries.length);
  }, [visibleEntries.length]);

  if (!showPages) {
    return (
      <PanelList rightGap>
        <ListItems items={sortedList} />
      </PanelList>
    );
  }

  if (sortInsidePages) {
    return (
      <PanelList rightGap>
        {sortedPageGroups!.map((sortedPageItems, groupIndex) => {
          const pageHasVisible = sortedPageItems.some(
            (entry) => !entry.$$hidden,
          );
          if (hideEmptyPages && !pageHasVisible) return null;
          return <PageRefGroup key={groupIndex} items={sortedPageItems} />;
        })}
      </PanelList>
    );
  }

  return (
    <PanelList rightGap>
      {sortedPageGroups!.map((pageGroup, groupIndex) => {
        if (hideEmptyPages && !pageGroup.some((entry) => !entry.$$hidden))
          return null;
        return <PageRefGroup key={groupIndex} items={pageGroup} />;
      })}
    </PanelList>
  );
}
