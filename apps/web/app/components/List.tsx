import { useEffect } from "react";
import { useAppStore } from "../store/store";
import {
  selectFilter,
  selectListData,
  selectSettings,
  selectSorting,
} from "../store/selectors";
import { setFilteredCount } from "../store/actions";
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

export function List(): JSX.Element {
  const filter = useAppStore(selectFilter);
  const rawListData = useAppStore(selectListData);
  const { showPages, hideEmptyPages } = useAppStore(selectSettings);
  const sorting = useAppStore(selectSorting);

  const entriesWithVisibility = rawListData.map(markVisible(filter));
  const visibleEntries = entriesWithVisibility.filter(
    (entry: any) => !entry.$$hidden,
  );

  const sortByField = sorting.sortBy;
  const sortDirection = sorting.sortDir || "asc";
  const sortInsidePages = !!sorting.sortInsidePages;

  useEffect(() => {
    setFilteredCount(visibleEntries.length);
  }, [visibleEntries.length]);

  if (!showPages) {
    const sortedList = sortItemsArray(
      entriesWithVisibility,
      sortByField,
      sortDirection,
    );
    return (
      <PanelList rightGap>
        <ListItems items={sortedList} />
      </PanelList>
    );
  }

  // when pages are shown
  if (sortInsidePages) {
    // keep page groups as-is, but sort items inside each page group
    return (
      <PanelList rightGap>
        {groupByProperty(entriesWithVisibility, "pageref").map(
          (pageGroup, groupIndex) => {
            const pageHasVisible = pageGroup.some((entry) => !entry.$$hidden);
            if (hideEmptyPages && !pageHasVisible) return null;

            const sortedPageItems = sortItemsArray(
              pageGroup,
              sortByField,
              sortDirection,
            );
            return <PageRefGroup key={groupIndex} items={sortedPageItems} />;
          },
        )}
      </PanelList>
    );
  }

  // sort globally then group preserving the new order
  const globallySorted = sortItemsArray(
    entriesWithVisibility,
    sortByField,
    sortDirection,
  );
  return (
    <PanelList rightGap>
      {groupByProperty(globallySorted, "pageref").map(
        (pageGroup, groupIndex) => {
          if (hideEmptyPages && !pageGroup.some((entry) => !entry.$$hidden))
            return null;
          return <PageRefGroup key={groupIndex} items={pageGroup} />;
        },
      )}
    </PanelList>
  );
}
