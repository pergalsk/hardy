import { FormatterProvider } from "./FormatterProvider";
import type { Formatter } from "./Formatter";
import type { ContentValue, HeaderItem } from "./dataTypes";

export const contentValueFormatters =
  FormatterProvider<Formatter<ContentValue>>();
export const headersFormatters = FormatterProvider<Formatter<HeaderItem[]>>();
export const headerValueFormatters = FormatterProvider<Formatter<HeaderItem>>();
export const detailFormatters = FormatterProvider<Formatter<any>>();
