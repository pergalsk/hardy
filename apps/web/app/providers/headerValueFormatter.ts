import { Formatter } from "./Formatter";
import { FormatterProvider } from "./FormatterProvider";
import { userAgentParseFormatter } from "../plugins/user-agent-parse-formatter";
import { userAgentRawFormatter } from "../plugins/user-agent-raw-formatter";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export const headerValueFormatters = FormatterProvider<Formatter<HeaderItem>>();

headerValueFormatters.addFormatters("User-Agent", [userAgentParseFormatter]);
headerValueFormatters.addFormatters("User-Agent", [userAgentRawFormatter]);
