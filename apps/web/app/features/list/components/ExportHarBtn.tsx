import type React from "react";
import { ActionIcon } from "@repo/ui/action-icon";
import { useAppStore } from "../../../store/store";
import { selectFile } from "../../../core/selectors";
import { useListView } from "../hooks/useListView";
import { buildFilteredHar, getFilteredFileName } from "../helpers/exportHar";

export function ExportHarBtn(): React.JSX.Element {
  const file = useAppStore(selectFile);
  const { visibleIds } = useListView();

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

  const disabled = !file?.data || visibleIds.length === 0;

  return (
    <ActionIcon
      onClick={handleExport}
      disabled={disabled}
      label="Export HAR"
      icon="iconify material-symbols--download-rounded"
    />
  );
}
