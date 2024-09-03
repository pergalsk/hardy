import { useState } from "react";
import { useCollapsed } from "../helpers/useCollapsed";
import { ExpandButton } from "./ExpandButton";

const lineClampClassMap: { [key: number]: string } = {
  0: "line-clamp-none",
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export function LineClamp({
  lines = 3,
  label = "...More",
  classes,
  inline = true,
  isOpen = false,
  active = true,
  children,
}: {
  lines?: number;
  label?: string;
  classes?: string;
  inline?: boolean;
  isOpen?: boolean;
  active?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  if (!active) return <>{children}</>;

  const [ref, isCollapsed] = useCollapsed();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded(!expanded);

  const button = (
    <ExpandButton inline={inline} classes={classes} handleClick={handleClick}>
      {expanded ? "...Hide" : label}
    </ExpandButton>
  );

  return (
    <div
      ref={ref}
      className={`relative ${lineClampClassMap[expanded ? 0 : lines]}`}
    >
      {children}
      {isCollapsed ? button : null}
    </div>
  );
}
