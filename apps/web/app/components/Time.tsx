export function Time({ time }: { time: number }) {
  return <span>{time.toFixed(2)}ms</span>;
}
