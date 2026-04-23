import { AppState } from "../../store/store";

export const selectToasts = (state: AppState) => state.toasts;
