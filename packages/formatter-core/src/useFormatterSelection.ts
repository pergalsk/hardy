import { useState } from "react";
import type { Formatter } from "./Formatter";

export function useFormatterSelection<T>(
  formatterList: { [id: string]: Formatter<T> } | null,
): {
  activeId: string;
  setActiveId: (id: string) => void;
  formatFn: Formatter<T>["format"] | null;
} {
  const firstKey = formatterList ? (Object.keys(formatterList)[0] ?? "") : "";
  const [activeId, setActiveId] = useState(firstKey);
  const formatFn = formatterList?.[activeId]?.format ?? null;
  return { activeId, setActiveId, formatFn };
}
