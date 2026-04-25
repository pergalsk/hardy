import type React from "react";
export function Navigation({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <nav className="dark:bg-bunker-500 bg-bunker-300 flex flex-row items-center gap-2 p-2 align-middle dark:shadow-md">
      {children}
    </nav>
  );
}
