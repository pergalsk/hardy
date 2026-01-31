import React from "react";

export default function ListItemWrapper({
  selected = false,
  pinned = false,
  error = false,
  hidden = false,
  onClick,
  children,
}: {
  selected?: boolean;
  pinned?: boolean;
  error?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const selectedClasses = selected
    ? error
      ? "border-red-400 hover:border-red-600 dark:border-red-800 dark:hover:border-red-600"
      : "border-accent-500 hover:border-accent-600 dark:border-accent-700 dark:hover:border-accent-400"
    : error
      ? "border-transparent hover:border-red-200 dark:hover:border-red-950"
      : "border-transparent hover:border-mirage-100 dark:hover:border-bunker-200";

  const baseBg = error
    ? "bg-[#ff000013] dark:bg-[#ff00001c]"
    : "dark:bg-bunker-800 bg-slate-100";
  const bgClasses = `${baseBg}${pinned ? " pinned-overlay" : ""}`;

  const containerClass = `${selectedClasses} ${bgClasses} ${hidden ? "opacity-20" : ""} text-mirage-800 dark:text-mirage-200 group flex w-full flex-col gap-2 rounded-xl border-2 p-2 transition-colors duration-200 hover:border-2 relative`;

  return (
    <div className={containerClass} onClick={onClick}>
      {children}
    </div>
  );
}
