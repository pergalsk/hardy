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
    },
    response: {
      headers: response.headers,
      headersSize: response.headersSize,
      bodySize: response.bodySize,
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
