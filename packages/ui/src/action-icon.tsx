import React from "react";
import { Tooltip } from "./tooltip";

export function ActionIcon({
  onClick,
  active,
  disabled,
  icon,
  label,
  shortcut,
}: {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon?: string;
  label: string;
  shortcut?: string;
}) {
  const base = "my-auto text-xl";

  const colorClasses = active
    ? "text-accent-300 dark:text-accent-500"
    : "text-slate-300 dark:bg-slate-400";

  const hoverClasses = active
    ? "hover:text-accent-100 dark:hover:text-accent-300"
    : "hover:text-white dark:hover:bg-slate-300";

  // aria-disabled (not `disabled` / pointer-events-none) keeps hover and focus, so the tooltip still shows
  const stateClasses = disabled
    ? `${colorClasses} opacity-50 cursor-default`
    : `${colorClasses} ${hoverClasses}`;

  const handleClick = () => {
    if (!disabled) onClick?.();
  };

  return (
    <Tooltip content={label} shortcut={shortcut}>
      <button
        type="button"
        aria-label={label}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        className={`${stateClasses} ${base} ${icon ?? ""}`}
      />
    </Tooltip>
  );
}
