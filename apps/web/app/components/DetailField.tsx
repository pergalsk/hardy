export function DetailField({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="text-mirage-700 dark:text-mirage-200 font-mono">
      <span className="pr-2 font-bold text-slate-600">{label}</span>
      <span className="text-black dark:text-white">{children}</span>
    </div>
  );
}
