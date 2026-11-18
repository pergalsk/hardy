import type { ReactElement } from "react";
export type Formatter<T> = {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  // marks the raw formatter that shows the original value (e.g. for search jumps)
  fallback?: boolean;
  format: (data: T) => ReactElement | string | null;
};
