import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { Toast } from "../../../store/store";
import { removeToast } from "../actions";
import { useFadeIn } from "../../../core/hooks/useFadeIn";

// How long a toast stays visible before it fades out and is removed (ms)
const TOAST_AUTO_DISMISS_MS = 15000;
const FADE_DURATION = 500;

// todo: improve using Toast['type]
const toastTypesMap: { [key: string]: string } = {
  info: "dark:bg-accent-800 dark:text-white bg-accent-400 text-black",
  alert: "dark:bg-yellow-500 dark:text-black bg-yellow-500 text-black",
};

export function ToastItem({
  id,
  message,
  type = "info",
  icon = "iconify material-symbols--info-outline-rounded",
}: {
  id: Toast["id"];
  message: Toast["message"];
  type?: Toast["type"];
  icon?: Toast["icon"];
}): React.JSX.Element {
  const ref = useFadeIn(450, 20);
  const dismissTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fadeOutAndRemove = useCallback(() => {
    dismissTimers.current.forEach(clearTimeout);
    if (ref.current) {
      ref.current.style.transition = `opacity ${FADE_DURATION}ms ease-out`;
      ref.current.style.opacity = "0";
    }
    dismissTimers.current = [setTimeout(() => removeToast(id), FADE_DURATION)];
  }, [id]);

  useEffect(() => {
    const fadeTimer = setTimeout(fadeOutAndRemove, TOAST_AUTO_DISMISS_MS - FADE_DURATION);
    dismissTimers.current = [fadeTimer];

    return () => dismissTimers.current.forEach(clearTimeout);
  }, [fadeOutAndRemove]);

  return (
    <div
      ref={ref}
      className={`${toastTypesMap[type]} flex rounded-lg align-middle shadow-xl`}
    >
      <div className={`p-3 pr-0`}>
        <span className={`${icon} text-2xl`}></span>
      </div>
      <div className="my-auto flex-1 p-3">{message}</div>
      <div className="p-2 pl-0">
        <div
          className="flex rounded-md p-1 transition-colors duration-200 hover:bg-black hover:bg-opacity-10"
          onClick={fadeOutAndRemove}
        >
          <span className="iconify material-symbols--close-rounded text-2xl"></span>
        </div>
      </div>
    </div>
  );
}
