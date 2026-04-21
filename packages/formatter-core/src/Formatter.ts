import type React from "react";

export type Formatter<T> = {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  format: (data: T) => React.JSX.Element | string | null;
};
