import type React from "react";
import { Formatter } from "@repo/formatter-core";
import { JsonView } from "@repo/formatter-ui/json-view";

export const detailRawFormatter: Formatter<unknown> = {
  id: "detail-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-blocks-outline-rounded",
  tooltip: "Detail raw view",
  format: (data: unknown): React.JSX.Element | string => {
    return <JsonView data={data} collapseBtns={true} />;
  },
};
