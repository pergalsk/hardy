export function ToggleMark({ opened }: { opened: boolean }): JSX.Element {
  const rotation = opened ? "rotate-90" : "rotate-0";

  return (
    <div className="my-auto flex align-middle">
      <span
        className={`${rotation} iconify material-symbols--keyboard-arrow-right relative bottom-[1px] transform text-xl transition-transform duration-200`}
      ></span>
    </div>
  );
}
