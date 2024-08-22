import { NoContent } from "./NoContent";

export function TimTab({ data }: { data: any }): JSX.Element {
  const { timings } = data;
  const parts = timings ? Object.entries(timings) : [];

  if (parts.length === 0) {
    return <NoContent />;
  }

  return (
    <table className="w-full table-auto text-sm">
      <tbody>
        {parts.map((part: [string, any], index: number) => (
          <tr
            key={index}
            className="dark:text-mirage-200 dark:border-bunker-400 break-all border-b border-slate-100 text-black last:border-none"
          >
            <td className="w-[15%] whitespace-nowrap py-1 pr-2 align-top font-bold capitalize">
              {part[0]}:
            </td>
            <td className="py-1">{part[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
