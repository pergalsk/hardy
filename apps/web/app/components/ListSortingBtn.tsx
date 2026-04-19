import React from "react";
import Button from "./Button";

type SortKey = "url" | "status" | "method" | "time" | "pageref";
type SortDir = "asc" | "desc";

function getSortDirIcon(sortDir: SortDir) {
  return sortDir === "asc"
    ? "iconify material-symbols--arrow-upward-rounded"
    : "iconify material-symbols--arrow-downward-rounded";
}

export default function ListSortingBtn(props: {
  sortKey: SortKey;
  label: string;
  isSelected: boolean;
  sortDir: SortDir;
  onClick: (sortKey: SortKey) => void;
}) {
  const { sortKey, label, isSelected, sortDir, onClick } = props;

  const variant = isSelected ? "primary" : "flat";
  const icon = isSelected ? getSortDirIcon(sortDir) : "";

  return (
    <Button
      variant={variant}
      icon={icon}
      size="nr"
      onClick={() => onClick(sortKey)}
      className="flex items-center gap-2 py-0"
    >
      {label}
    </Button>
  );
}
