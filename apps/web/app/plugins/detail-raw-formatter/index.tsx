import type React from "react";
import { Formatter } from "@repo/formatter-core";
import { JsonView } from "@repo/formatter-ui/json-view";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const detailRawFormatter: Formatter<any> = {
  id: "detail-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-blocks-outline-rounded",
  tooltip: "Detail raw view",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format: (data: any): React.JSX.Element | string => {
    return <JsonView data={data} collapseBtns={true} />;
  },
};
