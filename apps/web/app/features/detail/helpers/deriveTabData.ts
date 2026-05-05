import type { Entry } from "@repo/har-types";
import type { ReqTabData, ResTabData, CooTabData, TimTabData } from "../types";
import { TabCode } from "../../../store/store";

export function deriveTabData(
  entry: Entry | null,
  tabCode: TabCode,
): ReqTabData | ResTabData | CooTabData | TimTabData | null {
  if (!entry) return null;

  const { request, response, timings } = entry;

  if (tabCode === "REQ") {
    return {
      headers: request.headers,
      headersSize: request.headersSize,
      bodySize: request.bodySize,
      content: request.postData?.text,
    };
  }

  if (tabCode === "RES") {
    return {
      headers: response.headers,
      headersSize: response.headersSize,
      bodySize: response.bodySize,
      content: response.content?.text,
    };
  }

  if (tabCode === "COO") {
    return {
      cookies: {
        request: request.cookies,
        response: response.cookies,
      },
    };
  }

  if (tabCode === "TIM") {
    return { timings: timings as unknown as Record<string, number>, totalTime: entry.time };
  }

  return null;
}
