import { Formatter } from "@repo/formatter-core";
import { HeaderItem } from "../../providers/headerValueFormatter";

export const userAgentRawFormatter: Formatter<HeaderItem> = {
  id: "user-agent-raw-formatter",
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  format: (headerItem: HeaderItem): string => {
    return headerItem.value ?? "";
  },
};
