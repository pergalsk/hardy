export function parseJsonData(str: string): any {
  if (typeof str !== "string" || !str.length) {
    return null;
  }

  if (!str.trim().startsWith("{") && !str.trim().startsWith("[")) {
    return null;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
