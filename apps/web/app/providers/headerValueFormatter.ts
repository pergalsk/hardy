import type { HeaderItem } from "@repo/formatter-core";
import { headerValueFormatters } from "@repo/formatter-core/registry";
import { userAgentParseFormatter } from "@repo/plugin-user-agent-parse";
import { userAgentRawFormatter } from "../plugins/user-agent-raw-formatter";

export type { HeaderItem };
export { headerValueFormatters };

headerValueFormatters.addFormatters("User-Agent", [userAgentParseFormatter]);
headerValueFormatters.addFormatters("User-Agent", [userAgentRawFormatter]);
