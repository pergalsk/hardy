export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="dark:bg-bunker-500 bg-mirage-50 flex flex-row gap-2 p-2 pb-0 dark:shadow-md">
      {children}
    </nav>
  );
}
