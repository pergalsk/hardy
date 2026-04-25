import { nanoid } from "nanoid";
import { useAppStore, Toast } from "../../store/store";

export const addToast = (toast: Omit<Toast, "id">): string => {
  const id = nanoid();
  useAppStore.setState((state) => ({
    toasts: [...state.toasts, { ...toast, id }],
  }));
  return id;
};

export const removeToast = (id: Toast["id"]) =>
  useAppStore.setState((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  }));

export const removeAllToasts = () => useAppStore.setState({ toasts: [] });
