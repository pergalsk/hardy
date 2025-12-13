import { NA } from "../constants/global";

/**
 * Pretty print a file size using B, kB, and MB.
 * Uses binary base (1024).
 * Negative inputs are treated as N/A.
 */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes)) return NA;
  if (bytes < 0) return NA;

  const value = bytes;

  const KB = 1024;
  const MB = KB * 1024;

  let result: string;
  const convertedToLargerUnit = value >= KB;

  if (!convertedToLargerUnit) {
    result = `${value} B`;
  } else if (value < MB) {
    const kib = value / KB;
    result = `${format(kib)} kB`;
  } else {
    const mib = value / MB;
    result = `${format(mib)} MB`;
  }

  return result;
}

function format(n: number): string {
  // Show up to two decimals for values < 10, otherwise no decimals.
  return n < 10 ? Number(n.toFixed(2)).toString() : Math.round(n).toString();
}

export default formatFileSize;
