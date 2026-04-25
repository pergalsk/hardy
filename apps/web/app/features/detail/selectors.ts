import { AppState } from "../../store/store";

export const selectTab = (state: AppState) => state.ui.tab;
