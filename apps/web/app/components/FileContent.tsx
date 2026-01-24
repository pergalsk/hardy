import React from "react";
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
import { detailFormatters } from "../providers/detailFormatter";

export function FileContent(): JSX.Element {
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);
  const detailFormatterId = useAppStore(selectDetailFormatterId);
  const entry = useAppStore(selectEntry);

  const formatFn = detailFormatterId
    ? detailFormatters.getFormatter("detail", detailFormatterId)?.format
    : null;

  const DetailView = formatFn ? formatFn(entry) : null;

  return (
    <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
      <Panel>
        {filterActive && <ListFilter />}
        {sortingActive && <ListSorting />}
        <List />
      </Panel>
      <Panel>{DetailView}</Panel>
    </main>
  );
}
