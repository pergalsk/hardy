import { getUrlParts } from "../helpers/helpers";

interface UrlProps {
  url: string;
}

export function Url({ url }: UrlProps): JSX.Element {
  const { protocol, domain, port, path, params, hash } = getUrlParts(url);

  return (
    <span className="break-all">
      {protocol && (
        <span className="dark:text-mirage-400 text-slate-600">
          {protocol + "//"}
        </span>
      )}
      <span className="dark:text-mirage-200 text-slate-600">{domain}</span>
      {port && (
        <span className="dark:text-mirage-400 text-slate-400">
          {":" + port}
        </span>
      )}
      <span className="font-bold text-black dark:text-white">{path}</span>
      <span className="dark:text-mirage-200 text-slate-600">{params}</span>
      <span className="dark:text-mirage-400 text-slate-400">{hash}</span>
    </span>
  );
}
