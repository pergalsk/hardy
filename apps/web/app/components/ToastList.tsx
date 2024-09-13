import { selectToasts } from "../store/selectors";
import { Toast, useAppStore } from "../store/store";
import { ToastItem } from "./ToastItem";

export function ToastList(): JSX.Element | null {
  const toasts = useAppStore(selectToasts);

  if (toasts.length < 1) {
    return null;
  }

  return (
    <div className="fixed bottom-16 z-10 mx-auto flex min-w-[400px] max-w-[500px] flex-col items-center gap-2 self-center">
      {toasts.map((toast: Toast) => {
        const { id, type, message } = toast;
        return <ToastItem key={id} id={id} type={type} message={message} />;
      })}
    </div>
  );
}
