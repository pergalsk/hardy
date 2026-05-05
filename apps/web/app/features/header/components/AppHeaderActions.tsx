import React from "react";
import { useAppStore } from "../../../store/store";
import {
  selectDetailFormatterId,
  selectFilterActive,
  selectShowPages,
  selectSortingActive,
} from "../../settings/selectors";
import { selectFiles } from "../../file/selectors";
import { selectPinnedIds, selectShowPinnedOnly } from "../../list/selectors";
import {
  clearSorting,
  setShowPinnedOnly,
  clearAllPinned,
} from "../../list/actions";
import { clearFilter } from "../../list/actions";
import {
  setFilterActive,
  setShowPages,
  setSortingActive,
} from "../../settings/actions";
import { setDetailFormatter } from "../../detail/actions";
import { ActionBar } from "@repo/ui/action-bar";
import { ActionText } from "@repo/ui/action-text";
import { ActionSeparator } from "@repo/ui/action-separator";
import { ActionIcon } from "@repo/ui/action-icon";
import { FileOpener } from "../../file/components/FileOpener";
import { Settings } from "../../settings/components/Settings";
import { detailFormatters } from "@repo/formatter-core/registry";

export function AppHeaderActions(): React.JSX.Element {
  const formatters = detailFormatters.getFormatters("detail") || {};
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

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
