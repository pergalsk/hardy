import type React from "react";
import { useState, useCallback } from "react";
import { useCollapsed } from "./use-collapsed";
import { useButtonFits } from "./use-button-fits";
import { ExpandButton } from "./expand-button";

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
}) {
  if (!active) return <>{children}</>;

  const [collapseRef, isCollapsed] = useCollapsed();
  const [expanded, setExpanded] = useState(false);
  const { containerRef, buttonRef, buttonFits } = useButtonFits(expanded);

  const setContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      collapseRef(node);
    },
    [collapseRef, containerRef],
  );

  const handleClick = () => setExpanded(!expanded);

  const isHidden = expanded && buttonFits === null;
  const buttonInline = !expanded ? inline : buttonFits !== false;

  const button = (
    <ExpandButton
      ref={buttonRef}
      inline={buttonInline}
      classes={isHidden ? `${classes ?? ""} opacity-0 pointer-events-none`.trim() : classes}
      handleClick={handleClick}
    >
      {expanded ? "...Hide" : label}
    </ExpandButton>
  );

  const showButton = isCollapsed || expanded;
  const buttonElement =
    expanded && buttonFits === false ? (
      <div className="flex justify-end">{button}</div>
    ) : (
      button
    );

  return (
    <div
      ref={setContainerRef}
      className={`relative ${lineClampClassMap[expanded ? 0 : lines]}`}
    >
      {children}
      {showButton && buttonElement}
    </div>
  );
}
