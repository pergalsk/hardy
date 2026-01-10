export function PanelList({
  children,
  rightGap = false,
}: {
  children: React.ReactNode;
  rightGap?: boolean;
}): JSX.Element {
  return (
    <div
      className={`${rightGap ? "pr-2" : ""} flex flex-col gap-2 overflow-y-auto`}
    >
      {children}
    </div>
  );
}
