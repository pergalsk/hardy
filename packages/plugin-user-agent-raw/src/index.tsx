import type { Formatter, HeaderItem } from "@repo/formatter-core";

export const userAgentRawFormatter: Formatter<HeaderItem> = {
  id: "user-agent-raw-formatter",
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  fallback: true,
  format: (headerItem: HeaderItem): string => headerItem.value ?? "",
};
