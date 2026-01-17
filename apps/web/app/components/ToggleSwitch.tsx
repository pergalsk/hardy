"use client";
import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
  className = "",
}: ToggleSwitchProps) {
  const base =
    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-300 dark:focus:ring-accent-500";

  const stateClasses = checked
    ? "bg-accent-600 hover:bg-accent-500"
    : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500";

  const disabledClasses = disabled ? "opacity-40" : "";

  const buttonClass = [base, stateClasses, disabledClasses, className]
    .filter(Boolean)
    .join(" ");

  const knobBase =
    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200";

  const knobClass = `${knobBase} ${checked ? "translate-x-6" : "translate-x-1"}`;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={buttonClass}
    >
      <span className={knobClass} />
    </button>
  );
}
