import { TabCode } from "../store/store";

export function deriveListData(entries: any[]): any[] {
  if (!Array.isArray(entries)) return [];

  return entries.map((entry: any, index: number) => {
    const { pageref, startedDateTime, time, request, response } = entry;
    const { method, url } = request;
    const { status, statusText } = response;
    return { $$id: index, pageref, status, statusText, url, method, startedDateTime, time };
  });
}

export function deriveCommonData(entry: any): any {
  if (!entry) return null;

  const { request, response, serverIPAddress, time, _securityState } = entry;
  const { method, url, httpVersion } = request;
  const { status, statusText } = response;

  return { status, statusText, url, method, serverIPAddress, time, httpVersion, _securityState };
}

export function deriveTabData(entry: any, tabCode: TabCode): any {
  if (!entry) return null;

  const { request, response, timings } = entry;

  if (tabCode === "REQ") {
    return {
      headers: request?.headers,
      headersSize: request?.headersSize,
      bodySize: request?.bodySize,
      content: request?.postData?.text,
    };
  }

  if (tabCode === "RES") {
    return {
      headers: response?.headers,
      headersSize: response?.headersSize,
      bodySize: response?.bodySize,
      content: response?.content?.text,
    };
  }

  if (tabCode === "COO") {
    return {
      cookies: {
        request: request?.cookies,
        response: response?.cookies,
      },
    };
  }

  if (tabCode === "TIM") {
    return { timings };
  }

  return null;
}

export function deriveFooterData(harData: any, fileSize: number): any {
  if (!harData) return null;

  const { version, creator, entries } = harData;

  return {
    version,
    fileSize,
    creatorName: creator?.name,
    creatorVersion: creator?.version,
    entriesNum: entries?.length || 0,
    totalTime: (
      entries?.reduce((acc: number, entry: any) => acc + entry.time, 0) || 0
    ).toFixed(2),
  };
}

export function getUrlParts(url: string) {
  const parser = new URL(url);

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

export function parseJsonData(str: string): any {
  if (typeof str !== "string" || !str.length) {
    return null;
  }

  if (!str.trim().startsWith("{") && !str.trim().startsWith("[")) {
    return null;
  }

  try {
    const parsedJson = JSON.parse(str);
    return parsedJson; //JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export function leadingZero(num: number): string {
  return (num < 10 ? "0" : "") + num;
}

export function formatDateTime(
  dateTime: string,
  timeOnly: boolean = false,
): string {
  const date = new Date(dateTime);
  const day = leadingZero(date.getDate());
  const month = leadingZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = leadingZero(date.getMinutes());
  const seconds = leadingZero(date.getSeconds());
  const milliseconds = date.getMilliseconds();

  if (timeOnly) {
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function readFileData(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target?.result as string;
      resolve(data);
    };

    reader.onerror = (event) => {
      reject(event.target?.error);
    };

    reader.readAsText(file);
  });
}

export const findHeader =
  (name: string) =>
  (header: { name: string; value: string }): boolean =>
    header.name.toLowerCase() === name.toLowerCase();

export function parseMimeType(headerValue?: string): string | null {
  if (!headerValue) {
    return null;
  }

  const firstPart = headerValue.split(";")[0];
  if (!firstPart) {
    return null;
  }

  return firstPart.trim().toLowerCase();
}
