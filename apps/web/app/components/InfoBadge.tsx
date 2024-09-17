const badgeStyles = {
  green: [
    "dark:bg-green-900 dark:text-white",
    "dark:bg-accent-950 dark:text-white",
  ],
  yellow: [
    "dark:bg-yellow-700 dark:text-white",
    "dark:bg-yellow-800 dark:text-white",
  ],
  brown: [
    "dark:bg-blue-500 dark:text-white",
    "dark:bg-blue-800 dark:text-white",
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
        {value ?? "N/A"}
      </div>
    </div>
  );
}
