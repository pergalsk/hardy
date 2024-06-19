export function prepareList(data: any): any {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    const { startedDateTime, time, request, response } = item;

    const { method, url } = request;
    const { status, statusText } = response;

    return {
      status,
      statusText,
      url,
      method,
      startedDateTime,
      time,
    };
  });
}

export function prepareCommon(data: any): any {
  if (!data) {
    return {};
  }

  const { request, response, serverIPAddress, time } = data;
  const { method, url } = request;
  const { status, statusText } = response;

  return {
    status,
    statusText,
    url,
    method,
    serverIPAddress,
    time,
  };
}

export function prepareParts(data: any): any {
  if (!data) {
    return {};
  }

  const { request, response, timings } = data;

  return {
    request: {
      headers: request.headers,
      headersSize: request.headersSize,
      bodySize: request.bodySize,
      content: request.postData?.text,
    },
    response: {
      headers: response.headers,
      headersSize: response.headersSize,
      bodySize: response.bodySize,
      content: response.content?.text,
    },
    timings,
  };
}

export function prepareFooter(data: any): any {
  if (!data) {
    return {};
  }

  const { version, creator, entries } = data;

  return {
    version,
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

export function formatAsJson(str: string): string {
  if (typeof str !== "string" || !str.length) {
    console.info("Data is not a string:", str);
    return str;
  }

  if (!str.trim().startsWith("{") && !str.trim().startsWith("[")) {
    console.info("String is not JSON:", str);
    return str;
  }

  try {
    const parsedJson = JSON.parse(str);
    return JSON.stringify(parsedJson, null, 2);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return str;
  }
}
