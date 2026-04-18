import React from "react";

export default function ResetSortingBtn(props: {
  isActive: boolean;
  onClick: () => void;
}) {
  const { isActive, onClick } = props;

  const buttonHoverClasses = isActive
    ? "dark:hover:bg-accent-700 hover:bg-accent-800 dark:hover:text-white"
    : "opacity-25";

  return (
    <button
      className={`${buttonHoverClasses} flex rounded-md p-1 text-xl`}
      onClick={onClick}
      disabled={!isActive}
    >
      <span className="iconify material-symbols--delete-outline-rounded my-auto" />
    </button>
  );
}
