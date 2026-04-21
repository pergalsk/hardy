import type React from "react";
import { useState } from "react";
import type { HeaderItem } from "@repo/formatter-core";
import { headerValueFormatters } from "@repo/formatter-core/registry";
import { HeadersIcons } from "./HeadersIcons";

export function HeadersValue({
  headerItem,
}: {
  headerItem: HeaderItem;
}): React.JSX.Element | string {
  const { name, value } = headerItem;

  const formatters = headerValueFormatters.getFormatters(name);

  if (!formatters) {
    return value || "";
  }

  const firstId = Object.keys(formatters)[0];
  if (!firstId) {
    return value || "";
  }

  const [id, setId] = useState(firstId);

  const formatter = formatters[id];
  if (!formatter) {
    return value || "";
  }

  const HeaderFormat = () => formatter.format(headerItem);

  const setFormatter = (id: string) => setId(id);

  return (
    <>
      <HeaderFormat />
      <HeadersIcons formatters={formatters} setFormatter={setFormatter} />
    </>
  );
}
