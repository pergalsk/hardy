import { useState } from "react";
import { findHeader, parseMimeType } from "../helpers/helpers";
import { contentValueFormatters } from "../providers/contentValueFormatter";
import { NoContent } from "./NoContent";
import { TextContent } from "./TextContent";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { Collapsible } from "./Collapsible";

export function Content({ data }: { data: any }) {
  const { headers, content, bodySize } = data;

  const contentType: { name: string; value: string } =
    headers?.find(findHeader("Content-Type")) || {};

  const mimeType = parseMimeType(contentType.value);

  const formatterList = mimeType
    ? contentValueFormatters.getFormatters(mimeType)
    : null;

  const firstKey = formatterList ? Object.keys(formatterList)[0] || "" : "";

  const [actionId, setActionId] = useState(firstKey);

  const formatFn = formatterList?.[actionId]?.format;
  const size = content != null ? ` ${bodySize} b` : "No data";
  const info = [contentType.value, size].filter(Boolean).join(" | ");
  const title = <CollapsibleTitle title={"Content"} info={info} />;

  let ContentValue = <TextContent data={content} />;

  if (!content) {
    ContentValue = <NoContent showIcon={false}>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    ContentValue = formatFn({ value: content }) as JSX.Element;
  }

  return (
    <Collapsible
      title={title}
      disabled={!content}
      actions={formatterList}
      activeActionId={actionId}
      onAction={(actionId: string) => setActionId(actionId)}
    >
      {ContentValue}
    </Collapsible>
  );
}
