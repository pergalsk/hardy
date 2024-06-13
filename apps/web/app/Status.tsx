export const statusColors: { [key: string]: string } = {
  "1xx": "bg-gray-800",
  "2xx": "bg-green-900",
  "3xx": "bg-blue-900",
  "4xx": "bg-yellow-900",
  "5xx": "bg-orange-900",
};

interface StatusProps {
  status: number;
  colored: boolean;
}

export function Status({ status, colored }: StatusProps): JSX.Element {
  let colorClass;

  const statusRange = Math.floor(status / 100);
  colorClass = colored
    ? statusColors[`${statusRange}xx` as keyof typeof statusColors] ||
      "bg-bunker-700"
    : "bg-bunker-500";

  return (
    <div
      className={`${colorClass} rounded-md px-2 py-0.5 text-white font-bold text-sm`}
    >
      {status}
    </div>
  );
}
