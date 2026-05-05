import type { Entry } from "@repo/har-types";
import type { CommonData } from "../types";

export function deriveCommonData(entry: Entry | null | undefined): CommonData | null {
  if (!entry) return null;

  const { request, response, serverIPAddress, time, _securityState } = entry;
  const { method, url, httpVersion } = request;
  const { status, statusText } = response;

  return {
    status,
    statusText,
    url,
    method,
    serverIPAddress,
    time,
    httpVersion,
    _securityState: _securityState as string | null | undefined,
  };
}
