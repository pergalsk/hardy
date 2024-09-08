import {
  HeaderItem,
  HeaderValueFormatter,
} from "../../providers/headerValueFormatter";

export const userAgentRawFormatter: HeaderValueFormatter = {
  title: "Original",
  icon: "iconify material-symbols--settings-backup-restore-rounded",
  tooltip: "Original raw value",
  format: (headerItem: HeaderItem): string => {
    return headerItem.value ?? "";
  },
};
