import { userAgentParseFormatter } from "../plugins/user-agent-parse-formatter";
import { userAgentRawFormatter } from "../plugins/user-agent-raw-formatter";
import { FormatterProvider } from "./FormatterProvider";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export type HeaderValueFormatter = {
  title: string;
  icon: string;
  tooltip: string;
  format: (headerItem: HeaderItem) => JSX.Element | string | null;
};

export const headerValueFormatters = FormatterProvider<HeaderValueFormatter>();

headerValueFormatters.addFormatters("User-Agent", [userAgentRawFormatter]);
headerValueFormatters.addFormatters("User-Agent", [userAgentParseFormatter]);
