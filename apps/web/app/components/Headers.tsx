export interface HeaderItem {
  name: string;
  value: string;
}
export function Headers({ headers }: { headers: HeaderItem[] }): JSX.Element {
  return (
    <div className="flex flex-col gap-1 text-sm">
      {Array.isArray(headers) &&
        headers
          .sort((a: HeaderItem, b: HeaderItem) => a.name.localeCompare(b.name))
          .map((header: HeaderItem, index: number) => (
            <div key={index} className="text-mirage-200 font-mono break-all">
              <span className="font-bold pr-2">{header.name}:</span>
              {header.value}
            </div>
          ))}
    </div>
  );
}
