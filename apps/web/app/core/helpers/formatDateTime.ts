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
