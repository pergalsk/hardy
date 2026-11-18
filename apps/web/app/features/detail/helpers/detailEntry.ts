import type { Entry } from "@repo/har-types";
import type { TabCode } from "../../../store/store";
import type { CommonData, MessageData, TabData } from "../types";

/** Data for the summary shown above the detail tabs. */
export function getCommonData(entry: Entry): CommonData {
  const { request, response, serverIPAddress, time, _securityState } = entry;

  return {
    status: response.status,
    statusText: response.statusText,
    url: request.url,
    method: request.method,
    serverIPAddress,
    time,
    httpVersion: request.httpVersion,
    _securityState: _securityState as string | null | undefined,
  };
}

const getMessageData = (
  { headers, headersSize, bodySize }: Entry["request"] | Entry["response"],
  content: string | undefined,
): MessageData => ({ headers, headersSize, bodySize, content });

/** Data for one detail tab. */
export function getTabData(entry: Entry, tab: TabCode): TabData {
  const { request, response } = entry;

  switch (tab) {
    case "REQ":
      return { tab, data: getMessageData(request, request.postData?.text) };
    case "RES":
      return { tab, data: getMessageData(response, response.content?.text) };
    case "COO":
      return { tab, data: { request: request.cookies, response: response.cookies } };
    case "TIM":
      return {
        tab,
        data: {
          timings: entry.timings as unknown as Record<string, number>,
          totalTime: entry.time,
        },
      };
  }
}
