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
      className={`${toastTypesMap[type]} flex rounded-lg align-middle shadow-xl`}
    >
      <div className={`p-3 pr-0`}>
        <span className={`${icon} text-2xl`}></span>
      </div>
      <div className="my-auto flex-1 p-3">{message}</div>
      <div className="pb-3 pl-0 pr-2 pt-2">
        <div
          className="rounded-md p-1 transition-colors duration-200 hover:bg-black hover:bg-opacity-10"
          onClick={() => removeToast(id)}
        >
          <span className="iconify material-symbols--close-rounded text-2xl"></span>
        </div>
      </div>
    </div>
  );
}
