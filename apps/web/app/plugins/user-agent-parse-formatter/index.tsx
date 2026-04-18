import { Formatter } from "../../providers/Formatter";
import UAParser from "ua-parser-js";
import { HeaderItem } from "../../providers/headerValueFormatter";
import { InfoBadge } from "../../components/InfoBadge";

export const userAgentParseFormatter: Formatter<HeaderItem> = {
  id: "user-agent-parse-formatter",
  title: "Parse",
  icon: "iconify material-symbols--notes-rounded",
  tooltip: "Parse User Agent",
  format: (headerItem: HeaderItem): JSX.Element | string => {
    const { value } = headerItem;

    const parser = new UAParser(value ?? "");
    const { browser, device, os } = parser.getResult();

    const { name: browserName, version: browserVersion, major } = browser;
    const { name: osName, version: osVersion } = os;
    const { vendor, model, type } = device;

    const browserValue =
      browserName && major ? (
        <span>
          {browserName} {major}{" "}
          <span className="text-xs opacity-60">{browserVersion}</span>
        </span>
      ) : null;

    const osValue =
      osName && osVersion ? (
        <span>
          {osName} {osVersion}
        </span>
      ) : null;

    const deviceValue = (
      <span>
        {vendor} {model} {type}
      </span>
    );

    return (
      <div className="inline-flex flex-wrap gap-2">
        <InfoBadge style={"green"} title={"Browser"} value={browserValue} />
        <InfoBadge style={"yellow"} title={"OS"} value={osValue} />
        {vendor && model && type ? (
          <InfoBadge style={"violet"} title={"Device"} value={deviceValue} />
        ) : null}
      </div>
    );
  },
};
