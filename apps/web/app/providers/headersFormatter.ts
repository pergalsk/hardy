import { Formatter } from "./Formatter";
import { FormatterProvider } from "./FormatterProvider";
import { headersRawFormatter } from "../plugins/headers-raw-formatter";
import { headersTableFormatter } from "../plugins/headers-table-formatter";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export const headersFormatters = FormatterProvider<Formatter<HeaderItem[]>>();

headersFormatters.addFormatters("headers", [headersTableFormatter]);
headersFormatters.addFormatters("headers", [headersRawFormatter]);
