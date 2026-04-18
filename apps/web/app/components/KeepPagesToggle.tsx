import React from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function KeepPagesToggle(props: {
  isActive: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const { isActive, checked, onChange } = props;

  const labelClasses = `${isActive ? "" : "opacity-40"} mt-0.5 text-sm uppercase`;

  return (
    <div className="flex items-center gap-2">
      <div className={labelClasses}>Keep pages</div>
      <ToggleSwitch
        checked={checked}
        disabled={!isActive}
        onChange={onChange}
        size="small"
      />
    </div>
  );
}
