export function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function DateTime({ dateTime }: { dateTime: string }) {
  return <div className="ml-auto">{formatDateTime(dateTime)}</div>;
}
