export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <nav className="dark:bg-bunker-500 bg-bunker-300 flex flex-row gap-2 p-2 align-middle dark:shadow-md">
      {children}
    </nav>
  );
}
