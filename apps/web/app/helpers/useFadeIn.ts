import { useEffect, useRef } from "react";

export function useFadeId(duration: number, fromPosition: number) {
  const ref = useRef<HTMLDivElement>(null);

  let id: number;
  let startTime: DOMHighResTimeStamp = 0;

  useEffect(() => {
    function callback(now: DOMHighResTimeStamp) {
      const opacity = Math.min((now - startTime) / duration, 1);
      const position = Math.max(
        fromPosition - (now - startTime) / fromPosition,
        0,
      );

      if (ref.current) {
        ref.current.style.opacity = opacity.toString();
        ref.current.style.top = position.toString() + "px";
      }

      if (opacity < 1) {
        id = requestAnimationFrame(callback);
      }
    }

    startTime = performance.now();
    id = requestAnimationFrame(callback);

    if (ref.current) {
      ref.current.style.position = "relative";
      ref.current.style.opacity = "0";
    }

    return () => {
      cancelAnimationFrame(id);
      startTime = 0;
      id = 0;
    };
  }, [ref]);

  return ref;
}
