export function TrueFalseMark({
  value,
}: {
  value: boolean;
}): JSX.Element | null {
  return value === true ? (
    <span className="bg-accent-50 dark:bg-accent-900 rounded-md px-2 py-1">
      Y
    </span>
  ) : value === false ? (
    <span className="dark:bg-bunker-600 rounded-md bg-slate-100 px-2 py-1">
      N
    </span>
  ) : null;
}
