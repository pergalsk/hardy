export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="bg-bunker-500 flex flex-row gap-2 p-2 pb-0 shadow-md">
      {children}
    </nav>
  );
}
