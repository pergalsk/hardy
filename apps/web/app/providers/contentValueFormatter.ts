import { Formatter } from "@repo/formatter-core";
import { FormatterProvider } from "@repo/formatter-core/registry";
import { jsonRawFormatter } from "../plugins/json-raw-formatter";
import { jsonPrettyFormatter } from "../plugins/json-pretty-formatter";

export type ContentValue = {
  value: string | null | undefined;
};

export const contentValueFormatters =
  FormatterProvider<Formatter<ContentValue>>();

contentValueFormatters.addFormatters("application/json", [jsonPrettyFormatter]);
contentValueFormatters.addFormatters("application/json", [jsonRawFormatter]);
