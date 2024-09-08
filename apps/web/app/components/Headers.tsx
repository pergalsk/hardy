import { LineClamp } from "./LineClamp";
import { HeadersValue } from "./HeadersValue";
import { HeaderItem } from "../providers/headerValueFormatter";

export function Headers({ headers }: { headers: HeaderItem[] }): JSX.Element {
  const redirect = (name: string): void => {
    window.open(
      `https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/${encodeURIComponent(name)}`,
      "_blank",
    );
  };

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
                  {header.name}
                  <span
                    className="iconify material-symbols--help-outline-rounded dark:text-mirage-800 dark:hover:text-accent-300 ml-1 inline-flex select-none items-center align-top text-lg"
                    onClick={() => redirect(header.name)}
                  ></span>
                </td>
                <td className="py-1">
                  <LineClamp
                    lines={2}
                    active={(header.value || "").length > 100}
                    classes={"dark:bg-bunker-900 bg-white"}
                  >
                    <HeadersValue headerItem={header} />
                  </LineClamp>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
