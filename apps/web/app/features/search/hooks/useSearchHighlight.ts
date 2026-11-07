import { useEffect } from "react";
import type { RefObject } from "react";
import { useAppStore } from "../../../store/store";
import { selectSearchTarget } from "../selectors";
import { selectRowId } from "../../list/selectors";
import { highlightText, clearHighlight } from "../helpers/highlightText";

/**
 * Scrolls to and highlights the current search target inside the detail
 * and scrolls the list to the selected row.
 */
export function useSearchHighlight(rootRef: RefObject<HTMLElement | null>): void {
  const target = useAppStore(selectSearchTarget);
  const rowId = useAppStore(selectRowId);

  useEffect(() => {
    const root = rootRef.current;
    if (!target || !root) return;

    document
      .querySelector(`[data-row-id="${rowId}"]`)
      ?.scrollIntoView({ block: "nearest" });

    const container = root.querySelector<HTMLElement>(
      `[data-search-section="${target.section}"]`,
    );
    if (container) highlightText(container, target.query, target.label);

    return clearHighlight;
  }, [target, rowId, rootRef]);
}
