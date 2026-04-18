import { Formatter } from "@repo/formatter-core";
import { ContentValue } from "../../providers/contentValueFormatter";
import { TextContent } from "@repo/ui/text-content";

export const jsonRawFormatter: Formatter<ContentValue> = {
  id: "json-raw-formatter",
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  format: (content: ContentValue): JSX.Element | string => {
    return <TextContent data={content.value ?? ""} />;
  },
};
