import { UAParser } from "ua-parser-js";
import { LineClamp } from "./LineClamp";
import { FormatterProvider } from "../providers/FormatterProvider";

export interface HeaderItem {
  name: string;
  value: string | null | undefined;
}

export type HeaderValueFormatter = {
  icon: string;
  tooltip: string;
  format: (headerItem: HeaderItem) => JSX.Element | string | null;
};

const headerValueFormatters = FormatterProvider<HeaderValueFormatter>();

const userAgentParseFormatter: HeaderValueFormatter = {
  icon: "iconify material-symbols--desktop-windows-outline-rounded",
  tooltip: "Parse User Agent",
  format: (headerItem: HeaderItem): string => {
    const { value } = headerItem;
    const { name: browser, version } = new UAParser(value ?? "").getBrowser();

    return `${browser} ${version}`;
  },
};

const userAgentBgFormatter: HeaderValueFormatter = {
  icon: "iconify material-symbols--background-replace-rounded",
  tooltip: "User Agent+",
  format: (headerItem: HeaderItem): JSX.Element => {
    const { value } = headerItem;
    return <span className="bg-red-900">{value}</span>;
  },
};

const id1 = headerValueFormatters.addFormatter(
  "User-Agent",
  userAgentParseFormatter,
);
const id2 = headerValueFormatters.addFormatter(
  "User-Agent",
  userAgentBgFormatter,
);

export function HeaderValue({
  header,
}: {
  header: HeaderItem;
}): JSX.Element | string {
  const formatters = headerValueFormatters.getFormatters(header.name) || {};

  const applyFormat = (
    format: HeaderValueFormatter["format"],
    tooltip: string,
  ) => {
    alert(tooltip);
  };

  const Icons = (): JSX.Element => (
    <span className="my-auto ml-2 inline-flex items-center gap-1 align-middle dark:text-white">
      {Object.entries(formatters).map(([, { tooltip, icon, format }]) => {
        return (
          <span
            className={`dark:hover:text-accent-100 text-lg ${icon}`}
            onClick={() => applyFormat(format, tooltip)}
          ></span>
        );
      })}
    </span>
  );

  return (
    <>
      {header.value || ""}
      <Icons />
    </>
  );
}

export function Headers({ headers }: { headers: HeaderItem[] }): JSX.Element {
  return (
    <table className="w-full table-auto text-sm">
      <tbody>
        {Array.isArray(headers) &&
          headers
            .sort((a: HeaderItem, b: HeaderItem) =>
              a.name.localeCompare(b.name),
            )
            .map((header: HeaderItem, index: number) => (
              <tr
                key={index}
                className="dark:text-mirage-200 dark:border-bunker-400 break-all border-b border-slate-100 font-mono text-black last:border-none"
              >
                <td className="w-auto whitespace-nowrap py-1 pr-2 align-top font-bold">
                  {header.name}:
                </td>
                <td className="py-1">
                  <LineClamp
                    lines={2}
                    active={(header.value || "").length > 100}
                    classes={"dark:bg-bunker-900 bg-white"}
                  >
                    <HeaderValue header={header} />
                  </LineClamp>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
