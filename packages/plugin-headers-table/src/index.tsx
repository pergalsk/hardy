import type { Formatter, HeaderItem } from "@repo/formatter-core";
import { HeadersTable } from "./HeadersTable";

export const headersTableFormatter: Formatter<HeaderItem[]> = {
  id: "headers-table-formatter",
  title: "Table",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Headers in table format",
  format: (headers: HeaderItem[]): React.JSX.Element | string => {
    return <HeadersTable headers={headers} />;
  },
};
