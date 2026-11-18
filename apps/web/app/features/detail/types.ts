import type { Entry } from "@repo/har-types";

/** Request or response part shown in the Request / Response tab. */
export type MessageData = {
  headers: Entry["request"]["headers"];
  headersSize: number;
  bodySize: number;
  content: string | undefined;
};

export type CookiesData = {
  request: Entry["request"]["cookies"];
  response: Entry["response"]["cookies"];
};

export type TimingData = {
  timings: Record<string, number>;
  totalTime: Entry["time"];
};

export type TabData =
  | { tab: "REQ"; data: MessageData }
  | { tab: "RES"; data: MessageData }
  | { tab: "COO"; data: CookiesData }
  | { tab: "TIM"; data: TimingData };

export type CommonData = {
  status: Entry["response"]["status"];
  statusText: Entry["response"]["statusText"];
  url: Entry["request"]["url"];
  method: Entry["request"]["method"];
  serverIPAddress: Entry["serverIPAddress"];
  time: Entry["time"];
  httpVersion: Entry["request"]["httpVersion"];
  _securityState: string | null | undefined;
};
