export const statusColors: { [key: string]: string } = {
  "1xx": "bg-violet-500 dark:bg-gray-800",
  "2xx": "bg-lime-700 dark:bg-green-900",
  "3xx": "bg-sky-600 dark:bg-blue-900",
  "4xx": "bg-orange-700 dark:bg-yellow-900",
  "5xx": "bg-pink-700 dark:bg-orange-900",
};

interface StatusProps {
  status: number;
  text: string;
  colored: boolean;
}

export function Status({ status, text, colored }: StatusProps): JSX.Element {
  let colorClass;

  const statusRange = Math.floor(status / 100);
  colorClass = colored
    ? statusColors[`${statusRange}xx` as keyof typeof statusColors] ||
      "bg-bunker-200"
    : "bg-bunker-100";

  return (
    <span>
      <span
        className={`${colorClass} rounded-md px-2 py-0.5 font-bold text-white`}
      >
        {status}
      </span>
      {text && <span className="ml-2">{text}</span>}
    </span>
  );
}
