import React from "react";
import { useAppStore } from "../store/store";
import {
  selectDetailFormatterId,
  selectFiles,
  selectFilterActive,
  selectSettings,
  selectSortingActive,
} from "../store/selectors";
import {
  clearFilter,
  clearSorting,
  setDetailFormatter,
  setFilterActive,
  setShowPages,
  setSortingActive,
} from "../store/actions";
import { ActionBar } from "./ActionBar";
import { ActionText } from "./ActionText";
import { ActionSeparator } from "./ActionSeparator";
import { ActionIcon } from "./ActionIcon";
import { Settings } from "./Settings";
import { detailFormatters } from "../providers/detailFormatter";

const formatters = detailFormatters.getFormatters("detail") || {};

export function AppHeaderActions(): JSX.Element {
  const files = useAppStore(selectFiles);
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);
  const { showPages } = useAppStore(selectSettings);
  const detailFormatterId = useAppStore(selectDetailFormatterId);

  const handleFilterActive = () => {
    setFilterActive(!filterActive);
    clearFilter();
  };

  const handleSortingActive = () => {
    setSortingActive(!sortingActive);
    clearSorting();
  };

  const handleShowPages = () => {
    setShowPages(!showPages);
  };

  return (
    <ActionBar alignRight>
      {files.length > 0 && (
        <>
          <ActionText>List</ActionText>

          <ActionIcon
            onClick={handleSortingActive}
            active={sortingActive}
            icon="iconify material-symbols--sort-rounded"
          />

          <ActionIcon
            onClick={handleFilterActive}
            active={filterActive}
            icon="iconify material-symbols--filter-alt-outline"
          />

          <ActionIcon
            onClick={handleShowPages}
            active={showPages}
            icon="iconify material-symbols--note-stack-outline"
          />

          <ActionSeparator type="line" />

          <ActionText>Detail</ActionText>

          {Object.entries(formatters).map(([key, formatter]: [string, any]) => (
            <ActionIcon
              key={key}
              active={key === detailFormatterId}
              icon={`iconify ${formatter.icon}`}
              onClick={() => setDetailFormatter(key)}
            />
          ))}

          <ActionSeparator type="line" />
        </>
      )}

      <ActionText>Options</ActionText>

      <Settings />
    </ActionBar>
  );
}
