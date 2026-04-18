import { Formatter } from "./Formatter";
import { FormatterProvider } from "./FormatterProvider";
import { detailEnhancedFormatter } from "../plugins/detail-enhanced-formatter";
import { detailRawFormatter } from "../plugins/detail-raw-formatter";

export const detailFormatters = FormatterProvider<Formatter<any>>();

detailFormatters.addFormatters("detail", [detailEnhancedFormatter]);
detailFormatters.addFormatters("detail", [detailRawFormatter]);
