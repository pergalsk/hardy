// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deriveCommonData(entry: any): any {
  if (!entry) return null;

  const { request, response, serverIPAddress, time, _securityState } = entry;
  const { method, url, httpVersion } = request;
  const { status, statusText } = response;

  return { status, statusText, url, method, serverIPAddress, time, httpVersion, _securityState };
}
