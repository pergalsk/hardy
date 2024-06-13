interface UrlProps {
  url: string;
}
export function Url({ url }: UrlProps): JSX.Element {
  return <div className="flex-1 text-sm text-mirage-200 truncate">{url}</div>;
}
