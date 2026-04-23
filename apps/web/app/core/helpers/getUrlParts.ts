export function getUrlParts(url: string) {
  const parser = new URL(url);

  return {
    protocol: parser.protocol,
    domain: parser.hostname,
    port: parser.port,
    path: parser.pathname,
    params: parser.search,
    hash: parser.hash,
  };
}
