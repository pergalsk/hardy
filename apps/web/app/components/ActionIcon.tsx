import React from "react";

export function ActionIcon({
  onClick,
  active,
  icon,
}: {
  onClick?: () => void;
  active?: boolean;
  icon?: string;
}) {
  const base = "hover:text-accent-600 my-auto text-xl";

  const stateClasses = active
    ? "dark:text-accent-500 dark:hover:text-accent-300"
    : "dark:bg-slate-400 dark:hover:bg-slate-300";

  const handleClick = () => onClick?.();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      className={`${stateClasses} ${base} ${icon ?? ""}`}
    />
  );
}
