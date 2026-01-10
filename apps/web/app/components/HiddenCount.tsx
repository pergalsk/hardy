import { ToggleMark } from "./ToggleMark";

export function HiddenCount({
  count,
  opened = true,
}: {
  count: number;
  opened?: boolean;
}): JSX.Element {
  return (
    <div className="dark:text-accent-600 dark:after:border-accent-600 after:border-mirage-600 text-mirage-600 relative select-none overflow-hidden text-center text-[0.7rem] uppercase opacity-45 after:relative after:bottom-[0.6rem] after:flex after:border-b after:border-dashed">
      <span className="dark:bg-bunker-950 relative z-10 bg-white pr-2">
        <span className="relative top-[0.35rem] mx-1">
          <ToggleMark opened={opened} size="small" />
        </span>
        Hidden: {count}
      </span>
    </div>
  );
}
