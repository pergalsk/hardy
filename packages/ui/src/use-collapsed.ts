import { useCallback, useRef, useState } from "react";

export function useCollapsed() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const previousObserver = useRef(null);

  // todo: proper typing
  const customRef: any = useCallback((node: HTMLElement) => {
    if (previousObserver.current) {
      (previousObserver.current as ResizeObserver).disconnect();
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
    (previousObserver.current as unknown) = observer; // todo: proper typing
  }, []);

  return [customRef, isCollapsed];
}
