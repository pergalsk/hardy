export type Formatter<T> = {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  format: (data: T) => JSX.Element | string | null;
};
