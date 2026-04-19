export type Formatter<T> = {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  format: (_data: T) => JSX.Element | string | null; // unused, remove '_' later
};
