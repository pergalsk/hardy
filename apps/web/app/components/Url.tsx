import { getUrlParts } from "../helpers/helpers";

interface UrlProps {
  url: string;
}

export function Url({ url }: UrlProps): JSX.Element {
  const { protocol, domain, port, path, params, hash } = getUrlParts(url);

  return (
    <span className="break-all text-sm">
      {protocol && <span className="text-mirage-400">{protocol + "//"}</span>}
      <span className="text-mirage-200">{domain}</span>
      {port && <span className="text-mirage-400">{":" + port}</span>}
      <span className="text-black dark:text-white">{path}</span>
      <span className="text-mirage-200">{params}</span>
      <span className="text-mirage-400">{hash}</span>
    </span>
  );
}
