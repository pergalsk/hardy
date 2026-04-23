import { TabCode } from "../../../store/store";

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
