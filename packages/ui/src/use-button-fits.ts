import { useState, useRef, useEffect, useCallback } from "react";

export function useButtonFits(expanded: boolean) {
  const [buttonFits, setButtonFits] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    let lastTextNode: Text | null = null;
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!button.contains(node)) lastTextNode = node as Text;
    }

    if (!lastTextNode) { setButtonFits(true); return; }

    const range = document.createRange();
    range.selectNodeContents(lastTextNode);
    const rects = range.getClientRects();
    if (!rects.length) { setButtonFits(true); return; }

    const lastLineWidth = rects[rects.length - 1]!.width;
    const containerWidth = container.getBoundingClientRect().width;
    const buttonWidth = button.getBoundingClientRect().width;
    setButtonFits(containerWidth - lastLineWidth >= buttonWidth);
  }, []);

  useEffect(() => {
    if (!expanded) {
      setButtonFits(null);
      return;
    }
    const raf = requestAnimationFrame(measure);
    const container = containerRef.current;
    let observer: ResizeObserver | undefined;
    if (container) {
      observer = new ResizeObserver(measure);
      observer.observe(container);
    }
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [expanded, measure]);

  return { containerRef, buttonRef, buttonFits };
}
