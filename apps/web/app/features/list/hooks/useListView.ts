import { useMemo } from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../../../store/store";
import { selectRawEntries } from "../../../core/selectors";
import { selectSettings, selectShowPages } from "../../settings/selectors";
import {
  selectFilterFields,
  selectPinnedIds,
  selectShowPinnedOnly,
  selectSorting,
} from "../selectors";
import { deriveListView } from "../helpers/listView";
import type { ListView } from "../helpers/listView";

/** List view of the current file, built from the list settings in the store. */
export function useListView(): ListView {
  const entries = useAppStore(selectRawEntries);
  const filterFields = useAppStore(useShallow(selectFilterFields));
  const showPinnedOnly = useAppStore(selectShowPinnedOnly);
  const pinnedIds = useAppStore(selectPinnedIds);
  const sorting = useAppStore(useShallow(selectSorting));
  const showPages = useAppStore(selectShowPages);
  const { hideEmptyPages } = useAppStore(useShallow(selectSettings));

  return useMemo(
    () =>
      deriveListView(entries, {
        filterFields,
        showPinnedOnly,
        pinnedIds,
        sorting,
        showPages,
        hideEmptyPages,
      }),
    [
      entries,
      filterFields,
      showPinnedOnly,
      pinnedIds,
      sorting,
      showPages,
      hideEmptyPages,
    ],
  );
}
