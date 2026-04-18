import type { Formatter } from "@repo/formatter-core";
import { TextContent } from "@repo/ui/text-content";

export type ContentValue = {
  value: string | null | undefined;
};

export const jsonRawFormatter: Formatter<ContentValue> = {
  id: "json-raw-formatter",
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  format: (content: ContentValue): JSX.Element | string => {
    return <TextContent data={content.value ?? ""} />;
  },
};
