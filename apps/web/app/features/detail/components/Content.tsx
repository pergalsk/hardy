import type React from "react";
import { useState } from "react";
import type { ReqTabData, ResTabData } from "../types";
import type { SearchSection } from "../../search/types";
import { useAppStore } from "../../../store/store";
import { selectSearchTarget } from "../../search/selectors";
import { findHeader } from "../../../core/helpers/findHeader";
import { parseMimeType } from "../../../core/helpers/parseMimeType";
import { contentValueFormatters } from "@repo/formatter-core/registry";
import { useFormatterSelection } from "@repo/formatter-core";
import { NoContent } from "@repo/ui/no-content";
import { TextContent } from "@repo/ui/text-content";
import { CollapsibleTitle } from "../../../components/CollapsibleTitle";
import { Collapsible } from "../../../components/Collapsible";

export function Content({
  data,
  searchSection,
}: {
  data: ReqTabData | ResTabData;
  searchSection?: SearchSection;
}) {
  const { headers, content, bodySize } = data;

  const contentType = headers.find(findHeader("Content-Type")) ?? { name: "", value: "" };

  const mimeType = parseMimeType(contentType.value);

  const formatterList = mimeType
    ? contentValueFormatters.getFormatters(mimeType)
    : null;

  const { activeId, setActiveId, formatFn } = useFormatterSelection(formatterList);

  // switch to the raw formatter when search jumps here, so the match is visible
  const searchTarget = useAppStore(selectSearchTarget);
  const [appliedSearchKey, setAppliedSearchKey] = useState<number>();
  if (searchTarget && searchTarget.key !== appliedSearchKey) {
    setAppliedSearchKey(searchTarget.key);
    const rawId = Object.keys(formatterList ?? {}).find((id) => id.includes("raw"));
    if (searchTarget.section === searchSection && rawId) setActiveId(rawId);
  }
  const size = content != null ? ` ${bodySize} B` : "No data";
  const info = [contentType.value, size].filter(Boolean).join(" | ");
  const title = <CollapsibleTitle title={"Content"} info={info} />;

  let ContentValue = <TextContent data={content ?? ""} />;

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
      activeActionId={activeId}
      onAction={setActiveId}
    >
      {ContentValue}
    </Collapsible>
  );
}
