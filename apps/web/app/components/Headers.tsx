export interface HeaderItem {
  name: string;
  value: string;
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
                <td className="py-1">{header.value}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
