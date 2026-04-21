export function Time({ time }: { time: number }) {
  if (typeof time !== "number") {
    return null;
  }
  return <span>{time.toFixed(2)} ms</span>;
}
