import { useState } from "react";
import { headersFormatters } from "../providers/headersFormatter";
import { Collapsible } from "./Collapsible";
import { CollapsibleTitle } from "./CollapsibleTitle";
import { NoContent } from "./NoContent";

export function Headers({ data }: { data: any }) {
  const { headers, headersSize } = data;

  const formatterList = headersFormatters.getFormatters("headers") || {};
  const firstKey = Object.keys(formatterList)[0] || "";

  const [actionId, setActionId] = useState(firstKey);

  const formatFn = formatterList?.[actionId]?.format;
  const info = headers != null ? ` ${headersSize} b` : "No data";
  const title = <CollapsibleTitle title={"Headers"} info={info} />;

  let HeadersContent = null;

  if (!Array.isArray(headers) || headers.length === 0) {
    HeadersContent = <NoContent>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    HeadersContent = formatFn(headers) as JSX.Element;
  }

  return (
    <Collapsible
      title={title}
      disabled={!Array.isArray(headers) || headers.length === 0}
      actions={formatterList}
      activeActionId={actionId}
      onAction={(actionId: string) => setActionId(actionId)}
    >
      {HeadersContent}
    </Collapsible>
  );
}
