import { useCallback, useEffect, useRef, useState, RefObject } from "react";

export function useDragging<T extends HTMLElement>(
  callbackFn: (e: DragEvent) => void,
) {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  // dragenter/dragleave also fire when moving over child elements,
  // so count them and turn off the highlight only when the drag leaves the zone.
  const dragCounter = useRef(0);

  const onDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  }, []);

  const onDragleave = useCallback((e: DragEvent) => {
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const onDragover = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
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

  return [ref, isDragging] as [RefObject<T>, boolean];
}
