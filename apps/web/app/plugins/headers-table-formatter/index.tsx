import { Formatter } from "../../providers/Formatter";
import { HeaderItem } from "../../providers/headerValueFormatter";
import { HeadersTable } from "../../components/HeadersTable";

export const headersTableFormatter: Formatter<HeaderItem[]> = {
  id: "headers-table-formatter",
  title: "Table",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Headers in table format",
  format: (headers: HeaderItem[]): JSX.Element | string => {
    return <HeadersTable headers={headers} />;
  },
};
