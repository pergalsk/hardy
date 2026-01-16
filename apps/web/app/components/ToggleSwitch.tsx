"use client";
import React from "react";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

export default function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
  className = "",
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange()}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-accent-600" : "bg-gray-300 dark:bg-slate-600"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
