import { NoContent } from "./NoContent";
import { Time } from "./Time";

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
            className="hover:dark:bg-bunker-800 hover:dark:text-mirage-50 dark:text-mirage-200 dark:border-bunker-400 break-all border-b border-slate-100 text-black last:border-none hover:bg-slate-50"
          >
            <td className="w-[15%] whitespace-nowrap py-1 pr-2 align-top font-bold capitalize">
              {part[0]}:
            </td>
            <td className="w-[15%] py-1 text-right">
              <Time time={part[1]} />
            </td>
            <td className="w-[70%]"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
