import React from "react";
import { useAppStore } from "../store/store";
import {
  selectDetailFormatterId,
  selectFiles,
  selectFilterActive,
  selectPinnedIds,
  selectShowPages,
  selectShowPinnedOnly,
  selectSortingActive,
} from "../store/selectors";
import {
  clearAllPinned,
  clearFilter,
  clearSorting,
  setDetailFormatter,
  setFilterActive,
  setShowPages,
  setShowPinnedOnly,
  setSortingActive,
} from "../store/actions";
import { ActionBar } from "./ActionBar";
import { ActionText } from "./ActionText";
import { ActionSeparator } from "./ActionSeparator";
import { ActionIcon } from "./ActionIcon";
import { FileOpener } from "./FileOpener";
import { Settings } from "./Settings";
import { detailFormatters } from "../providers/detailFormatter";

const formatters = detailFormatters.getFormatters("detail") || {};

export function AppHeaderActions(): JSX.Element {
  const files = useAppStore(selectFiles);
  const filterActive = useAppStore(selectFilterActive);
  const sortingActive = useAppStore(selectSortingActive);
  const showPages = useAppStore(selectShowPages);
  const showPinnedOnly = useAppStore(selectShowPinnedOnly);
  const pinnedIds = useAppStore(selectPinnedIds);
  const detailFormatterId = useAppStore(selectDetailFormatterId);

  const isPinnedEmpty = pinnedIds.size === 0;

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

  const handleShowPinnedOnly = () => {
    setShowPinnedOnly(!showPinnedOnly);
  };

  const handleClearPinned = () => {
    clearAllPinned();
  };

  return (
    <ActionBar>
      {files.length === 0 && (
        <>
          <ActionText>Open</ActionText>
          <FileOpener>
            <ActionIcon
              onClick={handleFilterActive}
              icon="iconify material-symbols--folder-open-outline-rounded"
            />
          </FileOpener>
        </>
      )}

      <ActionSeparator type="space" />

      {files.length > 0 && (
        <>
          <ActionText>List</ActionText>

          <ActionIcon
            onClick={handleFilterActive}
            active={filterActive}
            icon="iconify material-symbols--filter-alt-outline"
          />

          <ActionIcon
            onClick={handleSortingActive}
            active={sortingActive}
            icon="iconify material-symbols--sort-rounded"
          />

          <ActionIcon
            onClick={handleShowPages}
            active={showPages}
            icon="iconify material-symbols--note-stack-outline"
          />

          <ActionIcon
            onClick={handleShowPinnedOnly}
            active={showPinnedOnly}
            disabled={isPinnedEmpty}
            icon={
              isPinnedEmpty
                ? `iconify material-symbols--bookmarks-outline`
                : `iconify material-symbols--bookmarks-rounded`
            }
          />

          <ActionIcon
            onClick={handleClearPinned}
            disabled={isPinnedEmpty}
            icon="iconify material-symbols--bookmark-remove-outline-rounded"
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
