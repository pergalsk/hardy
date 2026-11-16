import React from "react";
import { Tooltip } from "@repo/ui/tooltip";

export default function ResetSortingBtn(props: {
  isActive: boolean;
  onClick: () => void;
}) {
  const { isActive, onClick } = props;

  const buttonHoverClasses = isActive
    ? "dark:hover:bg-accent-700 hover:bg-accent-800 dark:hover:text-white"
    : "opacity-25";

  return (
    <Tooltip content="Reset sorting">
      <button
        type="button"
        aria-label="Reset sorting"
        className={`${buttonHoverClasses} flex rounded-md p-1 text-xl`}
        onClick={() => isActive && onClick()}
        aria-disabled={!isActive || undefined}
      >
        <span className="iconify material-symbols--delete-outline-rounded my-auto" />
      </button>
    </Tooltip>
  );
}
