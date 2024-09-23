export function Time({ time }: { time: number }): JSX.Element | null {
  if (typeof time !== "number") {
    return null;
  }
  return <span>{time.toFixed(2)} ms</span>;
}
