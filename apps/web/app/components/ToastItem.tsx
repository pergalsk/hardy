import { Toast } from "../store/store";
import { removeToast } from "../store/actions";
import { useFadeId } from "../helpers/useFadeIn";

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
  const ref = useFadeId(450, 20);

  return (
    <div
      ref={ref}
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
