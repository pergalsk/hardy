// Insert a regular space as thousands separator.
// Avoid locale-specific separators (like commas or non-breaking spaces).
export function formatThousands(n: number): string {
  return Math.trunc(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
