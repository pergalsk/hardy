import { NA } from "../constants/global";

/**
 * Pretty print a file size using B, kB, and MB.
 * Uses binary base (1024).
 * Negative inputs are treated as N/A.
 * Optionally appends the full byte length in parentheses, but only if using kB or MB.
 */
export function formatFileSize(
  bytes: number,
  showOriginal: boolean = true,
): string {
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

  if (showOriginal && convertedToLargerUnit) {
    const bytesStr = formatThousands(value);
    result += ` (${bytesStr} B)`;
  }

  return result;
}

function format(n: number): string {
  // Show up to two decimals for values < 10, otherwise no decimals.
  return n < 10 ? Number(n.toFixed(2)).toString() : Math.round(n).toString();
}

function formatThousands(n: number): string {
  // Insert a regular space as thousands separator.
  // Avoid locale-specific separators (like commas or non-breaking spaces).
  return Math.trunc(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default formatFileSize;
