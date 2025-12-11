import { Formatter, HeaderItem } from "../providers/headersFormatter";
import { NoContent } from "./NoContent";
// import { TextContent } from "./TextContent";

export function Headers({
  data,
  formatFn,
}: {
  data: HeaderItem[];
  formatFn?: Formatter<HeaderItem[]>["format"];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return <NoContent>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    return formatFn(data) as JSX.Element;
  }
}
