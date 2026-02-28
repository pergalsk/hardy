import React from "react";

export function ActionIcon({
  onClick,
  active,
  disabled,
  icon,
}: {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
}) {
  const base = "my-auto text-xl";

  const stateClasses = active
    ? "text-accent-300 hover:text-accent-100 dark:text-accent-500 dark:hover:text-accent-300"
    : "text-slate-300 hover:text-white dark:bg-slate-400 dark:hover:bg-slate-300";

  const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";

  const handleClick = () => onClick?.();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={disabled ? undefined : handleClick}
      className={`${stateClasses} ${base} ${disabledClasses} ${icon ?? ""}`}
    />
  );
}
