import { useState } from "react";
import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { findHeader, parseMimeType } from "../helpers/helpers";

import { contentValueFormatters } from "../providers/contentValueFormatter";
import { headersFormatters } from "../providers/headersFormatter";

export function ResTab({ data }: { data: any }): JSX.Element {
  // content
  const { headers, content, bodySize } = data;
  const cType: { name: string; value: string } =
    headers?.find(findHeader("Content-Type")) || {};
  const mimeType = parseMimeType(cType.value);
  const contentValueFormatterList = mimeType
    ? contentValueFormatters.getFormatters(mimeType)
    : null;
  const contentFirstKey = contentValueFormatterList
    ? Object.keys(contentValueFormatterList)[0] || ""
    : "";
  const [contentActionId, setContentActionId] = useState(contentFirstKey);
  const contentFormatFn = contentValueFormatterList?.[contentActionId]?.format;
  const cInfo = content != null ? ` ${bodySize} b` : "No data";
  const cTitle = (
    <CollapsibleTitle
      title={"Content"}
      info={[cType.value, cInfo].filter(Boolean).join(" | ")}
    />
  );

  return (
    <>
      <Headers data={data} />

      <Collapsible
        title={cTitle}
        disabled={!content}
        actions={contentValueFormatterList}
        activeActionId={contentActionId}
        onAction={(contentActionId: string) =>
          setContentActionId(contentActionId)
        }
      >
        <Content data={content} formatFn={contentFormatFn} />
      </Collapsible>
    </>
  );
}
