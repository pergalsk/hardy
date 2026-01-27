import { Formatter } from "../../providers/Formatter";
import { HeaderItem } from "../../providers/headerValueFormatter";
import { JsonContent } from "../../components/JsonContent";

export const headersRawFormatter: Formatter<HeaderItem[]> = {
  id: "headers-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Raw formatted value",
  format: (headers: HeaderItem[]): JSX.Element | string => {
    return <JsonContent data={headers} collapseBtns={false} />;
  },
};
