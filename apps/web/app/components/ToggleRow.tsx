"use client";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function ToggleRow({
  label,
  desc,
  value,
  onToggle,
}: {
  label: string;
  desc?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return <ToggleSwitch checked={value} onChange={onToggle} ariaLabel={label} />;
}
