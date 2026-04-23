import React from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../../../store/store";
import {
  selectDetailFormatterId,
  selectFilterActive,
  selectSortingActive,
} from "../../settings/selectors";
import { selectEntry } from "../../../core/selectors";
import { List } from "../../list/components/List";
import { Panel } from "../../../components/Panel";
import { ListFilter } from "../../list/components/ListFilter";
import { ListSorting } from "../../list/components/ListSorting";
import { detailFormatters } from "@repo/formatter-core/registry";
import SplitPanels from "../../../components/SplitPanels";

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
