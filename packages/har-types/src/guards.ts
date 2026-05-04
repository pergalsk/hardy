import type { Har, PostData, Param } from "./types";

export function isHar(data: unknown): data is Har {
  if (data === null || typeof data !== "object") {
    return false;
  }

  const obj = data as Record<string, unknown>;
  if (obj["log"] === null || typeof obj["log"] !== "object") {
    return false;
  }

  const log = obj["log"] as Record<string, unknown>;
  if (!Array.isArray(log["entries"])) {
    return false;
  }

  if (log["creator"] === null || typeof log["creator"] !== "object") {
    return false;
  }

  const creator = log["creator"] as Record<string, unknown>;
  return (
    typeof creator["name"] === "string" &&
    typeof creator["version"] === "string"
  );
}

export function hasPostDataText(
  pd: PostData,
): pd is PostData & { text: string } {
  return typeof pd.text === "string" && pd.text.length > 0;
}

export function hasPostDataParams(
  pd: PostData,
): pd is PostData & { params: Param[] } {
  return Array.isArray(pd.params) && pd.params.length > 0;
}
