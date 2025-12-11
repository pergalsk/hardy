import { useState } from "react";
import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { findHeader, parseMimeType } from "../helpers/helpers";

import { contentValueFormatters } from "../providers/contentValueFormatter";
import { headersFormatters } from "../providers/headersFormatter";

export function ResTab({ data }: { data: any }): JSX.Element {
  // headers
  const { headers, headersSize } = data;
  const headersFormatterList = headersFormatters.getFormatters("headers");
  const headersFirstKey = headersFormatterList
    ? Object.keys(headersFormatterList)[0] || ""
    : "";
  const [headersActionId, setHeadersActionId] = useState(headersFirstKey);
  const headersFormatFn = headersFormatterList?.[headersActionId]?.format;
  const hInfo = headers != null ? ` ${headersSize} b` : "No data";
  const hTitle = <CollapsibleTitle title={"Headers"} info={hInfo} />;

  //
  // content
  const { content, bodySize } = data;
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
      <Collapsible
        title={hTitle}
        disabled={!Array.isArray(headers) || headers.length === 0}
        actions={headersFormatterList}
        activeActionId={headersActionId}
        onAction={(headersActionId: string) =>
          setHeadersActionId(headersActionId)
        }
      >
        <Headers data={headers} formatFn={headersFormatFn} />
      </Collapsible>

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
