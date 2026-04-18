import { Formatter } from "@repo/formatter-core";
import { FormatterProvider } from "@repo/formatter-core/registry";
import { detailEnhancedFormatter } from "../plugins/detail-enhanced-formatter";
import { detailRawFormatter } from "../plugins/detail-raw-formatter";

export const detailFormatters = FormatterProvider<Formatter<any>>();

detailFormatters.addFormatters("detail", [detailEnhancedFormatter]);
detailFormatters.addFormatters("detail", [detailRawFormatter]);
