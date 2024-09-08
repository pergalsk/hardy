import UAParser from "ua-parser-js";
import {
  HeaderItem,
  HeaderValueFormatter,
} from "../../providers/headerValueFormatter";

export const userAgentParseFormatter: HeaderValueFormatter = {
  title: "Parse",
  icon: "iconify material-symbols--desktop-windows-outline-rounded",
  tooltip: "Parse User Agent",
  format: (headerItem: HeaderItem): string => {
    const { value } = headerItem;
    const { name: browser, version } = new UAParser(value ?? "").getBrowser();
    return browser && version ? `${browser} ${version}` : "N/A";
  },
};
