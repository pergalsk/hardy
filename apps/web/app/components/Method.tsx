export const methodColors: { [key: string]: string } = {
  GET: "text-green-600",
  POST: "text-blue-500",
  DELETE: "text-yellow-600",
  PUT: "text-violet-500",
  PATCH: "text-cyan-400",
  OPTIONS: "text-mirage-400",
};

interface MethodProps {
  method: string;
  colored: boolean;
}

export function Method({ method, colored }: MethodProps): JSX.Element {
  const colorClass = colored
    ? methodColors[method] || "text-gray-500"
    : "text-white";

  return <span className={`${colorClass} font-bold`}>{method}</span>;
}
