import { Formatter } from "@repo/formatter-core";
import { FormatterProvider } from "@repo/formatter-core/registry";
import { headersRawFormatter } from "../plugins/headers-raw-formatter";
import { headersTableFormatter } from "../plugins/headers-table-formatter";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export const headersFormatters = FormatterProvider<Formatter<HeaderItem[]>>();

headersFormatters.addFormatters("headers", [headersTableFormatter]);
headersFormatters.addFormatters("headers", [headersRawFormatter]);
