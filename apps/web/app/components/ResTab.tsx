import { useState } from "react";
import { Collapsible } from "./Collapsible";
import { Headers } from "./Headers";
import { Content } from "./Content";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { findHeader, parseMimeType } from "../helpers/helpers";

import { contentValueFormatters } from "../providers/contentValueFormatter";

export function ResTab({ data }: { data: any }): JSX.Element {
  const { headers, headersSize, content, bodySize } = data;

  const hInfo = headers != null ? ` ${headersSize} b` : "No data";
  const hTitle = <CollapsibleTitle title={"Headers"} info={hInfo} />;

  const cType: { name: string; value: string } =
    headers?.find(findHeader("Content-Type")) || {};

  const mimeType = parseMimeType(cType.value);

  const contentValueFormatterList = mimeType
    ? contentValueFormatters.getFormatters(mimeType)
    : null;

  const firstKey = contentValueFormatterList
    ? Object.keys(contentValueFormatterList)[0] || ""
    : "";

  const [contentActionId, setContentActionId] = useState(firstKey);
  const formatFn = contentValueFormatterList?.[contentActionId]?.format;

  const cInfo = content != null ? ` ${bodySize} b` : "No data";
  const cTitle = (
    <CollapsibleTitle
      title={"Content"}
      info={[cType.value, cInfo].filter(Boolean).join(" | ")}
    />
  );

  return (
    <>
      <Collapsible title={hTitle} disabled={!headers}>
        {headers && <Headers headers={headers} />}
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
        <Content data={content} formatFn={formatFn} />
      </Collapsible>
    </>
  );
}
