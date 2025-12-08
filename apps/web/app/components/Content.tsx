import { Formatter, ContentValue } from "../providers/contentValueFormatter";
import { NoContent } from "./NoContent";
import { TextContent } from "./TextContent";

export function Content({
  data,
  formatFn,
}: {
  data: any;
  formatFn?: Formatter<ContentValue>["format"];
}): JSX.Element {
  if (!data) {
    return <NoContent>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    return formatFn({ value: data }) as JSX.Element;
  }

  return <TextContent data={data} />;
}
