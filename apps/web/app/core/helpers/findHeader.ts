export const findHeader =
  (name: string) =>
  (header: { name: string; value: string }): boolean =>
    header.name.toLowerCase() === name.toLowerCase();
