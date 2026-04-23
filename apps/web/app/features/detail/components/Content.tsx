import type React from "react";
import { useState } from "react";
import { findHeader } from "../../../core/helpers/findHeader";
import { parseMimeType } from "../../../core/helpers/parseMimeType";
import { contentValueFormatters } from "@repo/formatter-core/registry";
import { NoContent } from "@repo/ui/no-content";
import { TextContent } from "@repo/ui/text-content";
import { CollapsibleTitle } from "../../../components/CollapsibleTitle";
import { Collapsible } from "../../../components/Collapsible";

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
  const size = content != null ? ` ${bodySize} B` : "No data";
  const info = [contentType.value, size].filter(Boolean).join(" | ");
  const title = <CollapsibleTitle title={"Content"} info={info} />;

  let ContentValue = <TextContent data={content} />;

  if (!content) {
    ContentValue = <NoContent showIcon={false}>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    ContentValue = formatFn({ value: content }) as React.JSX.Element;
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
