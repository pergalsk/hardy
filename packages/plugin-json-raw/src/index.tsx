import type React from "react";
import type { ContentValue, Formatter } from "@repo/formatter-core";
import { TextContent } from "@repo/ui/text-content";

export const jsonRawFormatter: Formatter<ContentValue> = {
  id: "json-raw-formatter",
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  format: (content: ContentValue): React.JSX.Element | string => {
    return <TextContent data={content.value ?? ""} />;
  },
};
