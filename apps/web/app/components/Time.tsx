export function Time({ time }: { time: number }) {
  return <div>{time.toFixed(2)}ms</div>;
}
