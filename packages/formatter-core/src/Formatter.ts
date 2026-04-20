import type { ReactElement } from "react";
export type Formatter<T> = {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  format: (data: T) => ReactElement | string | null;
};
