import { useSyncExternalStore, useCallback } from "react";

export function useDarkMode() {
  const query = "(prefers-color-scheme: dark)";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribe = useCallback((callback: () => any) => {
    const matchMedia: MediaQueryList = window.matchMedia(query);
    matchMedia.addEventListener("change", callback);
    return () => matchMedia.removeEventListener("change", callback);
  }, []);

  const result: boolean = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );

  return result;
}
