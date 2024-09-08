import { useState } from "react";
import { HeadersIcons } from "./HeadersIcons";
import {
  HeaderItem,
  headerValueFormatters,
} from "../providers/headerValueFormatter";

export function HeadersValue({
  headerItem,
}: {
  headerItem: HeaderItem;
}): JSX.Element | string {
  const { name, value } = headerItem;

  const formatters = headerValueFormatters.getFormatters(name);

  if (!formatters) {
    return value || "";
  }

  const firstId = Object.keys(formatters)[0];
  if (!firstId) {
    return value || "";
  }

  // set first formatter from catalog
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
