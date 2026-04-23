export function DateTime({ value }: { value: string }) {
  return value ? <div className="ml-auto">{value}</div> : null;
}
