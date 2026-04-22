import React from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store/store";
import {
  selectDetailFormatterId,
  selectEntry,
  selectFilterActive,
  selectSortingActive,
} from "../store/selectors";
import { List } from "./List";
import { Panel } from "./Panel";
import { ListFilter } from "./ListFilter";
import { ListSorting } from "./ListSorting";
import { detailFormatters } from "@repo/formatter-core/registry";
import SplitPanels from "./SplitPanels";

export function FileContent(): React.JSX.Element {
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);
  const detailFormatterId = useAppStore(selectDetailFormatterId);
  // useShallow prevents re-renders when selectEntry returns a new object with the same field values.
  const entry = useAppStore(useShallow(selectEntry));

  const formatFn = detailFormatterId
    ? detailFormatters.getFormatter("detail", detailFormatterId)?.format
    : null;

  const DetailView = formatFn ? formatFn(entry) : null;

  const leftPanel = (
    <Panel>
      {filterActive && <ListFilter />}
      {sortingActive && <ListSorting />}
      <List />
    </Panel>
  );

  const rightPanel = <Panel>{DetailView}</Panel>;

  return (
    <main className="flex flex-1 items-stretch overflow-hidden">
      <SplitPanels
        left={leftPanel}
        right={rightPanel}
        initialLeftPercent={50}
      />
    </main>
  );
}
