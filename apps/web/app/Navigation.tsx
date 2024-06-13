export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="flex bg-bunker-600 flex-row p-4 gap-4 shadow-md">
      {children}
    </nav>
  );
}
