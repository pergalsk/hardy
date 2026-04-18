import type { HeaderItem } from "@repo/formatter-core";
import { headersFormatters } from "@repo/formatter-core/registry";
import { headersRawFormatter } from "@repo/plugin-headers-raw";
import { headersTableFormatter } from "@repo/plugin-headers-table";

export type { HeaderItem };
export { headersFormatters };

headersFormatters.addFormatters("headers", [headersTableFormatter]);
headersFormatters.addFormatters("headers", [headersRawFormatter]);
