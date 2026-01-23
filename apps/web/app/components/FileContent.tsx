import React from "react";
import { useAppStore } from "../store/store";
import { selectFilterActive, selectSortingActive } from "../store/selectors";
import { List } from "./List";
import { Detail } from "./Detail";
import { Panel } from "./Panel";
import { ListFilter } from "./ListFilter";
import { ListSorting } from "./ListSorting";

export function FileContent(): JSX.Element {
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);

  return (
    <main className="flex flex-1 flex-col items-stretch overflow-hidden lg:flex-row">
      <Panel>
        {filterActive && <ListFilter />}
        {sortingActive && <ListSorting />}
        <List />
      </Panel>
      <Panel>
        <Detail />
      </Panel>
    </main>
  );
}
