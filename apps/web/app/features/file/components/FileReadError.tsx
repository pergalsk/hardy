import type React from "react";

type FileReadErrorProps = {
  name: string;
  reason: string;
};

export function FileReadError({ name, reason }: FileReadErrorProps): React.JSX.Element {
  return (
    <>
      File <span className="underline-offset-3 italic underline">{name}</span>{" "}
      could not be opened. {reason}
    </>
  );
}
