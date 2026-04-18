import type { HeaderItem } from "@repo/formatter-core";
import { headerValueFormatters } from "@repo/formatter-core/registry";
import { userAgentParseFormatter } from "@repo/plugin-user-agent-parse";
import { userAgentRawFormatter } from "@repo/plugin-user-agent-raw";

export type { HeaderItem };
export { headerValueFormatters };

headerValueFormatters.addFormatters("User-Agent", [userAgentParseFormatter]);
headerValueFormatters.addFormatters("User-Agent", [userAgentRawFormatter]);
