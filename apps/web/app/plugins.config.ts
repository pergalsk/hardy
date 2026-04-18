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
import { userAgentParseFormatter } from "@repo/plugin-user-agent-parse";
import { userAgentRawFormatter } from "@repo/plugin-user-agent-raw";
import { detailEnhancedFormatter } from "./plugins/detail-enhanced-formatter";
import { detailRawFormatter } from "./plugins/detail-raw-formatter";

type Registry<T> = {
  addFormatters: (key: string, formatters: Formatter<T>[]) => void;
};

type Registration<T> = {
  registry: Registry<T>;
  key: string;
  formatters: Formatter<T>[];
};

const registrations: Registration<any>[] = [
  {
    registry: contentValueFormatters as Registry<ContentValue>,
    key: "application/json",
    formatters: [jsonPrettyFormatter, jsonRawFormatter],
  },
  {
    registry: headersFormatters as Registry<HeaderItem[]>,
    key: "headers",
    formatters: [headersTableFormatter, headersRawFormatter],
  },
  {
    registry: headerValueFormatters as Registry<HeaderItem>,
    key: "User-Agent",
    formatters: [userAgentParseFormatter, userAgentRawFormatter],
  },
  {
    registry: detailFormatters as Registry<any>,
    key: "detail",
    formatters: [detailEnhancedFormatter, detailRawFormatter],
  },
];

let bootstrapped = false;

export function bootstrapPlugins(): void {
  if (bootstrapped) return;
  bootstrapped = true;
  for (const { registry, key, formatters } of registrations) {
    registry.addFormatters(key, formatters);
  }
}

bootstrapPlugins();
