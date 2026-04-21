import type { ContentValue, Formatter } from "@repo/formatter-core";
import { TextContent } from "@repo/ui/text-content";
import { JsonView } from "@repo/formatter-ui/json-view";
import { parseJsonData } from "./parseJsonData";

export const jsonPrettyFormatter: Formatter<ContentValue> = {
  id: "json-pretty-formatter",
  title: "Pretty",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Pretty formatted value",
  format: (content: ContentValue): React.JSX.Element | string => {
    const jsonObj = parseJsonData(content.value || "");

    if (!jsonObj) {
      return <TextContent data={content.value || ""} />;
    }

    return <JsonView data={jsonObj} />;
  },
};
