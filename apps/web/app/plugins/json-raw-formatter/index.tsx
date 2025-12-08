import { Formatter, ContentValue } from "../../providers/contentValueFormatter";
import { TextContent } from "../../components/TextContent";

export const jsonRawFormatter: Formatter<ContentValue> = {
  title: "Original",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Original raw value",
  format: (content: ContentValue): JSX.Element | string => {
    return <TextContent data={content.value ?? ""} />;
  },
};
