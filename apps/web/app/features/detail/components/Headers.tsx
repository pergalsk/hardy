import type React from "react";
import type { ReqTabData, ResTabData } from "../types";
import { headersFormatters } from "@repo/formatter-core/registry";
import { useFormatterSelection } from "@repo/formatter-core";
import { Collapsible } from "../../../components/Collapsible";
import { CollapsibleTitle } from "../../../components/CollapsibleTitle";
import { NoContent } from "@repo/ui/no-content";

export function Headers({ data }: { data: ReqTabData | ResTabData }) {
  const { headers, headersSize } = data;

  const formatterList = headersFormatters.getFormatters("headers");
  const { activeId, setActiveId, formatFn } = useFormatterSelection(formatterList);

  const info = headers != null ? ` ${headersSize} B` : "No data";
  const title = <CollapsibleTitle title={"Headers"} info={info} />;

  let HeadersContent = null;

  if (!Array.isArray(headers) || headers.length === 0) {
    HeadersContent = <NoContent>No Content</NoContent>;
  }

  if (typeof formatFn === "function") {
    HeadersContent = formatFn(headers) as React.JSX.Element;
  }

  return (
    <Collapsible
      title={title}
      disabled={!Array.isArray(headers) || headers.length === 0}
      actions={formatterList}
      activeActionId={activeId}
      onAction={setActiveId}
    >
      {HeadersContent}
    </Collapsible>
  );
}
