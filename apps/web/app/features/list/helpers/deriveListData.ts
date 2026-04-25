export function deriveListData(entries: any[]): any[] {
  if (!Array.isArray(entries)) return [];

  return entries.map((entry: any, index: number) => {
    const { pageref, startedDateTime, time, request, response } = entry;
    const { method, url } = request;
    const { status, statusText } = response;
    return { $$id: index, pageref, status, statusText, url, method, startedDateTime, time };
  });
}
