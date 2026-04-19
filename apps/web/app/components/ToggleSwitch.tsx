"use client";
import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  size?: "normal" | "small";
};

export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
  className = "",
  size = "normal",
}: ToggleSwitchProps) {
  const sizes = {
    normal: {
      switch: "h-6 w-11",
      knob: "h-4 w-4",
      translateOn: "translate-x-6",
      translateOff: "translate-x-1",
    },
    small: {
      switch: "h-5 w-9",
      knob: "h-3 w-3",
      translateOn: "translate-x-5",
      translateOff: "translate-x-1",
    },
  }[size];

  const base = `relative inline-flex ${sizes.switch} items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-300 dark:focus:ring-accent-500`;

  const stateClasses = checked
    ? "bg-accent-600 hover:bg-accent-500 dark:hover:bg-accent-500"
    : "bg-gray-300 dark:bg-slate-600";

  const disabledClasses = disabled
    ? "opacity-40"
    : "hover:bg-gray-400 dark:hover:bg-slate-500";

  const buttonClass = [base, stateClasses, disabledClasses, className]
    .filter(Boolean)
    .join(" ");

  const knobBase = `inline-block ${sizes.knob} transform rounded-full bg-white transition-transform duration-200`;

  const knobClass = `${knobBase} ${checked ? sizes.translateOn : sizes.translateOff}`;

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
