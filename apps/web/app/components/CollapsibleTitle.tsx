export function CollapsibleTitle({
  title,
  info,
}: {
  title: string;
  info?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold uppercase">{title}</span>
      {info && <span className="text-sm">{info}</span>}
    </div>
  );
}
