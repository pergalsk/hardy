import { useCallback, useState } from "react";

export function useCollapsed() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const previousObserver = { current: null as ResizeObserver | null };

  const customRef = useCallback((node: HTMLElement | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const collapsed = node.scrollHeight > node.clientHeight;
      setIsCollapsed(collapsed);
    });

    observer.observe(node);
    previousObserver.current = observer;
  }, []);

  return [customRef, isCollapsed] as [(node: HTMLElement | null) => void, boolean];
}
