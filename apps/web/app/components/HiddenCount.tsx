export function HiddenCount({ count }: { count: number }): JSX.Element {
  return (
    <div className="dark:text-accent-500 dark:after:border-accent-500 after:border-mirage-600 text-mirage-600 relative select-none text-center text-xs uppercase opacity-45 after:relative after:bottom-2 after:flex after:border-b after:border-dashed">
      <span className="dark:bg-bunker-950 relative z-10 bg-white px-2">
        Hidden: {count}
      </span>
    </div>
  );
}
