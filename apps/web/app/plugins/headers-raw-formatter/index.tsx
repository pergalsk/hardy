import { Formatter } from "@repo/formatter-core";
import { HeaderItem } from "../../providers/headerValueFormatter";
import { JsonView } from "@repo/formatter-ui/json-view";

export const headersRawFormatter: Formatter<HeaderItem[]> = {
  id: "headers-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-rounded",
  tooltip: "Raw formatted value",
  format: (headers: HeaderItem[]): JSX.Element | string => {
    return <JsonView data={headers} collapseBtns={false} />;
  },
};
