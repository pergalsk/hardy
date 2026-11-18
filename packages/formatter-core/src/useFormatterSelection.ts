import { useState } from "react";
import type { Formatter } from "./Formatter";

export function useFormatterSelection<T>(
  formatterList: { [id: string]: Formatter<T> } | null,
): {
  activeId: string;
  setActiveId: (id: string) => void;
  formatFn: Formatter<T>["format"] | null;
} {
  const ids = formatterList ? Object.keys(formatterList) : [];
  const firstKey = ids[0] ?? "";
  const [activeId, setActiveId] = useState(firstKey);

  // reset the selection when the formatter list changes (e.g. another entry is shown)
  const listKey = ids.join("\n");
  const [prevListKey, setPrevListKey] = useState(listKey);
  if (listKey !== prevListKey) {
    setPrevListKey(listKey);
    setActiveId(firstKey);
  }

  const formatFn = formatterList?.[activeId]?.format ?? null;
  return { activeId, setActiveId, formatFn };
}
