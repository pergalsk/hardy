import { Toast } from "../store/store";
import { addToast, removeAllToasts, removeToast } from "../store/actions";

export function useToast() {
  function showToast(toast: Omit<Toast, "id">) {
    return addToast(toast);
  }

  function hideToast(id: Toast["id"]) {
    removeToast(id);
  }

  function hideAllToasts() {
    removeAllToasts();
  }

  return {
    showToast,
    hideToast,
    hideAllToasts,
  };
}
