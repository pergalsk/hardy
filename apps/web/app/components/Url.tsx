interface UrlProps {
  url: string;
}

function splitUrl(url: string) {
  const parser = document.createElement("a");
  parser.href = url;

  const protocol = parser.protocol;
  const domain = parser.hostname;
  const port = parser.port;
  const path = parser.pathname;
  const params = parser.search;
  const hash = parser.hash;

  return {
    protocol,
    domain,
    port,
    path,
    params,
    hash,
  };
}

export function Url({ url }: UrlProps): JSX.Element {
  const { protocol, domain, port, path, params, hash } = splitUrl(url);

  return (
    <span className="break-words">
      {protocol && (
        <span className="flex-1 text-sm text-mirage-400">
          {protocol + "//"}
        </span>
      )}
      <span className="flex-1 text-sm text-mirage-200">{domain}</span>
      {port && (
        <span className="flex-1 text-sm text-mirage-400">{":" + port}</span>
      )}
      <span className="flex-1 text-sm text-white">{path}</span>
      <span className="flex-1 text-sm text-mirage-200">{params}</span>
      <span className="flex-1 text-sm text-mirage-400">{hash}</span>
    </span>
  );
}
