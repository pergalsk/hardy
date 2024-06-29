export function prepareParts(data: any): any {
  if (!data) {
    return null;
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
    return null;
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
    console.info("Data is not a string.");
    return str;
  }

  if (!str.trim().startsWith("{") && !str.trim().startsWith("[")) {
    console.info("String is not JSON.");
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
