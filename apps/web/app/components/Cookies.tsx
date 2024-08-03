import { DateTime } from "./DateTime";

export function Cookies({ data }: { data: any }): JSX.Element {
  return (
    <table className="w-full text-sm">
      <thead className="dark:bg-bunker-950 dark:border-bunker-400 sticky top-0 border-b border-slate-100 text-xs uppercase">
        <tr className="dark:text-mirage-400 text-black">
          <th className="w-[25%] px-2 py-2">Name</th>
          <th className="px-2 py-2">Value</th>
          <th className="w-[10%] px-2 py-2">Path</th>
          <th className="w-[15%] px-2 py-2">Domain</th>
          <th className="px-2 py-2">Expires</th>
          <th className="px-2 py-2">Same Site</th>
          <th className="px-2 py-2">Http Only</th>
          <th className="px-2 py-2">Secure</th>
        </tr>
      </thead>
      <tbody>
        {data.map((cookie: any, index: number) => {
          const {
            name,
            value,
            path,
            domain,
            expires,
            sameSite,
            httpOnly,
            secure,
          } = cookie;

          return (
            <tr
              key={index}
              className="dark:text-mirage-200 dark:border-bunker-400 border-b border-slate-100 text-black last:border-none"
            >
              <td className="break-all px-2 py-1">{name}</td>
              <td className="break-all px-2 py-1">{value}</td>
              <td className="break-all px-2 py-1">{path ?? ""}</td>
              <td className="break-all px-2 py-1">{domain ?? ""}</td>
              <td className="px-2 py-1 text-center">
                {expires ? (
                  <DateTime dateTime={expires} timeOnly={false}></DateTime>
                ) : (
                  ""
                )}
              </td>
              <td className="px-2 py-1 text-center">{sameSite ?? ""}</td>
              <td className="px-2 py-1 text-center">
                {httpOnly === true ? (
                  <span className="bg-accent-900 rounded-md px-2 py-1">Y</span>
                ) : httpOnly === false ? (
                  <span className="bg-bunker-600 rounded-md px-2 py-1">N</span>
                ) : (
                  ""
                )}
              </td>
              <td className="px-2 py-1 text-center">
                {secure === true ? (
                  <span className="bg-accent-900 rounded-md px-2 py-1">Y</span>
                ) : secure === false ? (
                  <span className="bg-bunker-600 rounded-md px-2 py-1">N</span>
                ) : (
                  ""
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
