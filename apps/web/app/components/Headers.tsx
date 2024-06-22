export interface HeaderItem {
  name: string;
  value: string;
}

export function Headers({ headers }: { headers: HeaderItem[] }): JSX.Element {
  return (
    <table className="table-auto text-sm">
      <tbody>
        {Array.isArray(headers) &&
          headers
            .sort((a: HeaderItem, b: HeaderItem) =>
              a.name.localeCompare(b.name),
            )
            .map((header: HeaderItem, index: number) => (
              <tr
                key={index}
                className="text-mirage-200 border-bunker-400 break-all border-b font-mono"
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
