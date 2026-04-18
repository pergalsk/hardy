export function TextContent({ data }: { data: string }): JSX.Element {
  return (
    <span className="dark:text-mirage-200 break-all text-sm text-black">
      {data}
    </span>
  );
}
