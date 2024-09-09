import { DateTime } from "./DateTime";
import { TrueFalseMark } from "./TrueFalseMark";

export function Cookies({ data }: { data: any }): JSX.Element {
  return (
    <table className="w-full text-sm">
      <thead className="dark:bg-bunker-950 dark:border-bunker-400 sticky top-0 border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase">
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
              className="dark:text-mirage-200 dark:border-bunker-400 hover:dark:bg-bunker-800 hover:dark:text-mirage-50 group border-b border-slate-100 text-black last:border-none hover:bg-slate-50"
            >
              <td className="break-all px-2 py-1">{name}</td>
              <td className="break-all px-2 py-1">{value}</td>
              <td className="break-all px-2 py-1">{path ?? ""}</td>
              <td className="break-all px-2 py-1">{domain ?? ""}</td>
              <td className="px-2 py-1 text-center">
                <DateTime dateTime={expires} timeOnly={false}></DateTime>
              </td>
              <td className="px-2 py-1 text-center">{sameSite ?? ""}</td>
              <td className="px-2 py-1 text-center">
                <TrueFalseMark value={httpOnly} />
              </td>
              <td className="px-2 py-1 text-center">
                <TrueFalseMark value={secure} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
