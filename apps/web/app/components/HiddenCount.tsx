export function HiddenCount({ count }: { count: number }): JSX.Element {
  return (
    <div className="text-accent-500 after:border-accent-500 relative select-none text-center text-xs uppercase opacity-45 after:relative after:bottom-2 after:flex after:border-b after:border-dashed">
      <span className="bg-bunker-950 relative z-10 px-2">Hidden: {count}</span>
    </div>
  );
}
