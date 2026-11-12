import type React from "react";
import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { ActionIcon } from "@repo/ui/action-icon";
import { useAppStore } from "../../../store/store";
import { selectFile } from "../../../core/selectors";
import {
  selectFilterFields,
  selectPinnedIds,
  selectShowPinnedOnly,
} from "../selectors";
import { deriveListData } from "../helpers/deriveListData";
import { markVisible } from "../helpers/filter";
import { buildFilteredHar, getFilteredFileName } from "../helpers/exportHar";

export function ExportHarBtn(): React.JSX.Element {
  const file = useAppStore(selectFile);
  const filterFields = useAppStore(useShallow(selectFilterFields));
  const showPinnedOnly = useAppStore(selectShowPinnedOnly);
  const pinnedIds = useAppStore(selectPinnedIds);

  // same visibility rules as the List component
  const visibleIds = useMemo(() => {
    const items = deriveListData(file?.data?.log.entries ?? null);
    const pinned =
      showPinnedOnly && pinnedIds.size > 0
        ? items.filter((item) => pinnedIds.has(item.$$id))
        : items;
    return pinned
      .map(markVisible(filterFields))
      .filter((item) => item.$$visible)
      .map((item) => item.$$id);
  }, [file, filterFields, showPinnedOnly, pinnedIds]);

  const handleExport = () => {
    if (!file?.data) return;

    const har = buildFilteredHar(file.data, visibleIds);
    const blob = new Blob([JSON.stringify(har, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getFilteredFileName(file.name);
    link.click();
    setTimeout(() => URL.revokeObjectURL(url));
  };

  return (
    <ActionIcon
      onClick={handleExport}
      disabled={!file?.data || visibleIds.length === 0}
      icon="iconify material-symbols--download-rounded"
    />
  );
}
