import { FormatterProvider } from "./FormatterProvider";
import { detailEnhancedFormatter } from "../plugins/detail-enhanced-formatter";
import { detailRawFormatter } from "../plugins/detail-raw-formatter";

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

export const detailFormatters = FormatterProvider<Formatter<any>>();

detailFormatters.addFormatters("detail", [detailEnhancedFormatter]);
detailFormatters.addFormatters("detail", [detailRawFormatter]);
