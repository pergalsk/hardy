import { removeToast } from "../store/actions";
import { selectToasts } from "../store/selectors";
import { Toast, useAppStore } from "../store/store";

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
}): JSX.Element {
  return (
    <div
      className={`${toastTypesMap[type]} flex gap-3 rounded-lg p-3 align-middle shadow-xl`}
    >
      <div className={`${icon} text-2xl`}></div>
      <div className="my-auto flex-1">{message}</div>
      <div
        className={`iconify material-symbols--close-rounded text-2xl`}
        onClick={() => removeToast(id)}
      ></div>
    </div>
  );
}

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
