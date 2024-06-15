export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="flex bg-bunker-600 flex-row p-2 gap-2 shadow-md">
      {children}
    </nav>
  );
}
