import { Formatter, HeaderItem } from "../../providers/contentValueFormatter";
import { HeadersTable } from "../../components/HeadersTable";

export const headersTableFormatter: Formatter<HeaderItem[]> = {
  title: "Table",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Headers in table format",
  format: (headers: HeaderItem[]): JSX.Element | string => {
    return <HeadersTable headers={headers} />;
  },
};
