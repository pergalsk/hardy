import { Formatter } from "../../providers/Formatter";
import { ContentValue } from "../../providers/contentValueFormatter";
import { TextContent } from "../../components/TextContent";
import { JsonContent } from "../../components/JsonContent";
import { parseJsonData } from "../../helpers/helpers";

export const jsonPrettyFormatter: Formatter<ContentValue> = {
  id: "json-pretty-formatter",
  title: "Pretty",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Pretty formatted value",
  format: (content: ContentValue): JSX.Element | string => {
    const jsonObj = parseJsonData(content.value || "");

    if (!jsonObj) {
      return <TextContent data={content.value || ""} />;
    }

    return <JsonContent data={jsonObj} />;
  },
};
