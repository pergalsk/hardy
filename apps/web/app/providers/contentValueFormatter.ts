import type { ContentValue, Formatter } from "@repo/formatter-core";
import { FormatterProvider } from "@repo/formatter-core/registry";
import { jsonRawFormatter } from "@repo/plugin-json-raw";
import { jsonPrettyFormatter } from "@repo/plugin-json-pretty";

export type { ContentValue };

export const contentValueFormatters =
  FormatterProvider<Formatter<ContentValue>>();

contentValueFormatters.addFormatters("application/json", [jsonPrettyFormatter]);
contentValueFormatters.addFormatters("application/json", [jsonRawFormatter]);
