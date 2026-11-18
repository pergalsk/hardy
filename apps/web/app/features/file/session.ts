import {
  useAppStore,
  AppState,
  File,
  initialFilterFieldsState,
} from "../../store/store";

// File session: the only place that decides what resets
// when a file is opened, switched or closed.

// State for showing `fileId` with a clean row selection, pins and filter.
const activate = (state: AppState, fileId: string): Partial<AppState> => ({
  ui: {
    ...state.ui,
    fileId,
    rowId: 0,
    searchTarget: null,
    pinnedIds: new Set<number>(),
    showPinnedOnly: false,
  },
  filter: {
    ...state.filter,
    fields: { ...initialFilterFieldsState },
  },
});

export const openFile = (file: File) =>
  useAppStore.setState((state) => ({
    files: [...state.files, file],
    ...activate(state, file.fileId),
  }));

export const switchFile = (fileId: string) =>
  useAppStore.setState((state) =>
    fileId === state.ui.fileId ? {} : activate(state, fileId),
  );

// Closing the active file selects the previous one (like browsers),
// the next one if it was first, or nothing (start screen) if none is left.
export const closeFile = (fileId: string) =>
  useAppStore.setState((state) => {
    const index = state.files.findIndex((file) => file.fileId === fileId);
    if (index === -1) {
      return {};
    }

    const files = state.files.filter((file) => file.fileId !== fileId);
    if (fileId !== state.ui.fileId) {
      return { files };
    }

    const nextFile = files[Math.max(0, index - 1)];
    return { files, ...activate(state, nextFile?.fileId ?? "") };
  });
