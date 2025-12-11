import { Formatter, HeaderItem } from "../../providers/contentValueFormatter";
import { JsonContent } from "../../components/JsonContent";

export const headersRawFormatter: Formatter<HeaderItem[]> = {
  title: "Raw",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Raw formatted value",
  format: (headers: HeaderItem[]): JSX.Element | string => {
    return <JsonContent data={headers} collapseBtns={false} />;
  },
};
