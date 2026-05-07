import type React from "react";
import { Formatter } from "@repo/formatter-core";
import { JsonView } from "@repo/formatter-ui/json-view";

function stripInternalKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripInternalKeys);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !key.startsWith("$$"))
        .map(([key, val]) => [key, stripInternalKeys(val)]),
    );
  }
  return value;
}

export const detailRawFormatter: Formatter<unknown> = {
  id: "detail-raw-formatter",
  title: "Raw",
  icon: "iconify material-symbols--code-blocks-outline-rounded",
  tooltip: "Detail raw view",
  format: (data: unknown): React.JSX.Element | string => {
    return <JsonView data={stripInternalKeys(data)} collapseBtns={true} />;
  },
};
