import { useCallback, useEffect, useRef, useState } from "react";

export function useDragging<T extends HTMLElement>(
  callbackFn: (e: DragEvent) => void,
) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragleave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDragover = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    callbackFn(e);
  }, []);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.addEventListener("dragenter", onDragEnter);
      ref.current.addEventListener("dragleave", onDragleave);
      ref.current.addEventListener("dragover", onDragover);
      ref.current.addEventListener("drop", onDrop);
    }

    return () => {
      if (ref.current != null) {
        ref.current.removeEventListener("dragenter", onDragEnter);
        ref.current.removeEventListener("dragleave", onDragleave);
        ref.current.removeEventListener("dragover", onDragover);
        ref.current.removeEventListener("drop", onDrop);
      }
    };
  }, [ref.current]);

  return [ref, isDragging];
}
