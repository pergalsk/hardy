import type React from "react";
export function WrongFile({ name }: { name: string }): React.JSX.Element {
  return (
    <>
      File <span className="underline-offset-3 italic underline">{name}</span>{" "}
      cannot be opened. Wrong or disrupted content.
    </>
  );
}
