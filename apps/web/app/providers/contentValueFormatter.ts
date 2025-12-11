import { FormatterProvider } from "./FormatterProvider";
import { jsonRawFormatter } from "../plugins/json-raw-formatter";
import { jsonPrettyFormatter } from "../plugins/json-pretty-formatter";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export type Formatter<T> = {
  title: string;
  icon: string;
  tooltip: string;
  format: (data: T) => JSX.Element | string | null;
};

export type ContentValue = {
  value: string | null | undefined;
};

export const contentValueFormatters =
  FormatterProvider<Formatter<ContentValue>>();

contentValueFormatters.addFormatters("application/json", [jsonPrettyFormatter]);
contentValueFormatters.addFormatters("application/json", [jsonRawFormatter]);
