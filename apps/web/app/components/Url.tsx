import { getUrlParts } from "../helpers/helpers";

interface UrlProps {
  url: string;
}

export function Url({ url }: UrlProps): JSX.Element {
  const { protocol, domain, port, path, params, hash } = getUrlParts(url);

  return (
    <span className="break-all text-sm">
      {protocol && (
        <span className="dark:text-mirage-400 text-slate-500">
          {protocol + "//"}
        </span>
      )}
      <span className="dark:text-mirage-200 text-slate-500">{domain}</span>
      {port && (
        <span className="dark:text-mirage-400 text-slate-400">
          {":" + port}
        </span>
      )}
      <span className="font-bold text-black dark:text-white">{path}</span>
      <span className="dark:text-mirage-200 text-slate-500">{params}</span>
      <span className="dark:text-mirage-400 text-slate-400">{hash}</span>
    </span>
  );
}
