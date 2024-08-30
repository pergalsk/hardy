export function ToggleMark({ opened }: { opened: boolean }): JSX.Element {
  const rotation = opened ? "rotate-270" : "-rotate-90";
  return (
    <div className={`transform transition-transform duration-200 ${rotation}`}>
      ▼
    </div>
  );
}
