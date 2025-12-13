import { NA } from "../constants/global";

const badgeStyles = {
  green: [
    "bg-green-400 dark:bg-green-900 dark:text-white text-black",
    "bg-accent-300 dark:bg-accent-950 dark:text-white text-black",
  ],
  yellow: [
    "bg-yellow-400 dark:bg-yellow-700 dark:text-white text-black",
    "bg-yellow-500 dark:bg-yellow-800 dark:text-white text-black",
  ],
  violet: [
    "bg-violet-400 dark:bg-violet-500 dark:text-white",
    "bg-violet-300 dark:bg-violet-800 dark:text-white",
  ],
};

export function InfoBadge({
  title,
  value,
  style = "green",
}: {
  title: JSX.Element | string;
  value?: JSX.Element | string | null;
  style?: keyof typeof badgeStyles;
}): JSX.Element {
  const [classesTitle, classesValue] = badgeStyles[style];

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded">
      {title ? (
        <div
          className={`${classesTitle} flex items-center px-2 py-0 text-xs uppercase tracking-wider`}
        >
          {title}
        </div>
      ) : null}
      <div
        className={`${classesValue} flex items-center gap-2 px-2 py-0 text-sm`}
      >
        {value ?? NA}
      </div>
    </div>
  );
}
