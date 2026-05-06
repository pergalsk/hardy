"use client";

import type { ContentValue, Formatter, HeaderItem } from "@repo/formatter-core";
import {
  contentValueFormatters,
  headersFormatters,
  headerValueFormatters,
  detailFormatters,
} from "@repo/formatter-core/registry";
import { jsonPrettyFormatter } from "@repo/plugin-json-pretty";
import { jsonRawFormatter } from "@repo/plugin-json-raw";
import { headersTableFormatter } from "@repo/plugin-headers-table";
import { headersRawFormatter } from "@repo/plugin-headers-raw";
import { headersPlainFormatter } from "@repo/plugin-headers-plain";
import { userAgentParseFormatter } from "@repo/plugin-user-agent-parse";
import { userAgentRawFormatter } from "@repo/plugin-user-agent-raw";
import { detailEnhancedFormatter } from "./plugins/detail-enhanced-formatter";
import { detailRawFormatter } from "./plugins/detail-raw-formatter";

type Registry<T> = {
  addFormatters: (key: string, formatters: Formatter<T>[]) => void;
};

let bootstrapped = false;

export function bootstrapPlugins(): void {
  if (bootstrapped) return;
  bootstrapped = true;

  (contentValueFormatters as Registry<ContentValue>).addFormatters("application/json", [jsonPrettyFormatter, jsonRawFormatter]);
  (headersFormatters as Registry<HeaderItem[]>).addFormatters("headers", [headersTableFormatter, headersPlainFormatter, headersRawFormatter]);
  (headerValueFormatters as Registry<HeaderItem>).addFormatters("User-Agent", [userAgentParseFormatter, userAgentRawFormatter]);
  (detailFormatters as Registry<unknown>).addFormatters("detail", [detailEnhancedFormatter, detailRawFormatter]);
}

bootstrapPlugins();
