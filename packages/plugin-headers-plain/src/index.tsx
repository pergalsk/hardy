import { Fragment } from "react";
import type { Formatter, HeaderItem } from "@repo/formatter-core";

export const headersPlainFormatter: Formatter<HeaderItem[]> = {
  id: "headers-plain-formatter",
  title: "Plain",
  icon: "iconify material-symbols--format-align-left-rounded",
  tooltip: "Headers as plain text",
  format: (headers: HeaderItem[]) => {
    return (
      <div className="dark:text-mirage-200 break-all px-2 font-mono text-sm text-black">
        {headers.map((header, idx) => (
          <Fragment key={header.name}>
            {header.name}: {header.value ?? ""}
            {idx < headers.length - 1 && <br />}
          </Fragment>
        ))}
      </div>
    );
  },
};
