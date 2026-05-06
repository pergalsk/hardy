import type React from "react";
import { Formatter } from "@repo/formatter-core";
import { Detail } from "../../features/detail/components/Detail";

export const detailEnhancedFormatter: Formatter<unknown> = {
  id: "detail-enhanced-formatter",
  title: "Table",
  icon: "iconify material-symbols--table-rows-outline",
  tooltip: "Detail enhanced view",
  format: (): React.JSX.Element | string => {
    return <Detail />;
  },
};
