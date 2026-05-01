import type React from "react";
import type { HeaderItem } from "@repo/formatter-core";
import { useFormatterSelection } from "@repo/formatter-core";
import { headerValueFormatters } from "@repo/formatter-core/registry";
import { HeadersIcons } from "./HeadersIcons";

export function HeadersValue({
  headerItem,
}: {
  headerItem: HeaderItem;
}): React.JSX.Element | string {
  const { name, value } = headerItem;

  const formatterList = headerValueFormatters.getFormatters(name);
  const { setActiveId, formatFn } = useFormatterSelection(formatterList);

  if (!formatterList || !formatFn) {
    return value || "";
  }

  return (
    <>
      {formatFn(headerItem)}
      <HeadersIcons formatters={formatterList} setFormatter={setActiveId} />
    </>
  );
}
