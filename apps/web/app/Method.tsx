export const methodColors: { [key: string]: string } = {
  GET: "text-green-500",
  POST: "text-blue-500",
  DELETE: "text-yellow-500",
  PUT: "text-purple-500",
  PATCH: "text-red-500",
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
    <div className={`${colorClass} rounded-md px-2 py-1 font-bold text-sm`}>
      {method}
    </div>
  );
}
