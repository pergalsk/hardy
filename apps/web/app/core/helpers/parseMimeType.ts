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
