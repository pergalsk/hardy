import { useAppStore } from "../../store/store";
import { detailFormatters } from "@repo/formatter-core/registry";
import { sectionTabs } from "./types";
import type { SearchMatch } from "./types";

/**
 * Opens the entry of a search match: selects the row, switches the tab
 * and stores the target, so the detail can scroll to it and highlight it.
 */
export const openSearchMatch = (match: SearchMatch, query: string) =>
  useAppStore.setState((state) => ({
    ui: {
      ...state.ui,
      rowId: match.entryId,
      tab: sectionTabs[match.section],
      searchTarget: {
        section: match.section,
        label: match.label,
        query: query.trim(),
        key: (state.ui.searchTarget?.key ?? 0) + 1,
      },
    },
    uiPersistent: {
      ...state.uiPersistent,
      // tabs are rendered by the default (first) detail formatter only
      detailFormatterId:
        detailFormatters.getDefaultFormatter("detail")?.[0] ??
        state.uiPersistent.detailFormatterId,
    },
  }));
