export const methodColors: { [key: string]: string } = {
  GET: "text-green-400",
  POST: "text-blue-400",
  DELETE: "text-yellow-400",
  PUT: "text-purple-400",
  PATCH: "text-red-400",
};

interface MethodProps {
  method: string;
  colored: boolean;
}

export function Method({ method, colored }: MethodProps): JSX.Element {
  const colorClass = colored
    ? methodColors[method] || "text-gray-500"
    : "text-white";

  return (
    <span className={`${colorClass} rounded-md px-2 py-1 font-bold`}>
      {method}
    </span>
  );
}
