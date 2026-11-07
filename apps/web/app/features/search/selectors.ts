import { AppState } from "../../store/store";

export const selectSearchTarget = (state: AppState) => state.ui.searchTarget ?? null;
