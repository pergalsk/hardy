import type React from "react";
import { useCallback, useState } from "react";
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
  active = true,
  children,
}: {
  lines?: number;
  label?: string;
  classes?: string;
  active?: boolean;
  children: React.ReactNode;
}): React.JSX.Element {
  if (!active) return <>{children}</>;

  const [collapsedRef, isCollapsed] = useCollapsed();
  const [expanded, setExpanded] = useState(false);
  const { containerRef, buttonRef, buttonFits } = useButtonFits(expanded);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      collapsedRef(node);
      containerRef.current = node;
    },
    [collapsedRef, containerRef],
  );

  const handleClick = () => setExpanded(!expanded);

  const buttonInline = !expanded || buttonFits !== false;

  const button = (
    <ExpandButton
      ref={buttonRef}
      inline={buttonInline}
      classes={classes}
      handleClick={handleClick}
    >
      {expanded ? "...Hide" : label}
    </ExpandButton>
  );

  return (
    <div
      ref={setRef}
      className={`relative ${lineClampClassMap[expanded ? 0 : lines]}`}
    >
      {children}
      {expanded || isCollapsed ? (
        buttonInline ? button : <div className="flex justify-end">{button}</div>
      ) : null}
    </div>
  );
}
