import { NA } from "../constants/global";

export function FooterItem({
  label,
  value,
  extra,
}: {
  label: string;
  value: string | number | null | undefined;
  extra?: string | number | null | undefined;
}) {
  return (
    <div>
      <span className="text-accent-100 dark:text-accent-200">{label}:</span>{" "}
      <span>{value ?? NA}</span>{" "}
      {extra != null && <span className="text-accent-50">{extra}</span>}
    </div>
  );
}
