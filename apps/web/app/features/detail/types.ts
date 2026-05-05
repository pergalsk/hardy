import type { Entry } from "@repo/har-types";

export type ReqTabData = {
  headers: Entry["request"]["headers"];
  headersSize: Entry["request"]["headersSize"];
  bodySize: Entry["request"]["bodySize"];
  content: string | undefined;
};

export type ResTabData = {
  headers: Entry["response"]["headers"];
  headersSize: Entry["response"]["headersSize"];
  bodySize: Entry["response"]["bodySize"];
  content: string | undefined;
};

export type CooTabData = {
  cookies: {
    request: Entry["request"]["cookies"];
    response: Entry["response"]["cookies"];
  };
};

export type TimTabData = {
  timings: Record<string, number>;
  totalTime: Entry["time"];
};

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
