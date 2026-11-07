"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import Modal from "../../../components/Modal";
import { useAppStore } from "../../../store/store";
import { selectRawEntries } from "../../../core/selectors";
import { selectFilterFields } from "../../list/selectors";
import { clearFilter } from "../../list/actions";
import { deriveListData } from "../../list/helpers/deriveListData";
import { markVisible } from "../../list/helpers/filter";
import { Method } from "@repo/ui/method";
import { Status } from "@repo/ui/status";
import { buildSearchIndex, searchIndex } from "../helpers/search";
import { openSearchMatch } from "../actions";
import { sectionTitles } from "../types";
import type { SearchMatch } from "../types";

const RESULT_LIMIT = 200;
const DEBOUNCE_MS = 150;

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rawEntries = useAppStore(useShallow(selectRawEntries));
  const filterFields = useAppStore(useShallow(selectFilterFields));
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [hiddenMatch, setHiddenMatch] = useState<SearchMatch | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(input), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [input]);

  const index = useMemo(() => buildSearchIndex(rawEntries), [rawEntries]);
  const matches = useMemo(
    () => searchIndex(index, query, RESULT_LIMIT),
    [index, query],
  );

  const groups = useMemo(() => {
    const byEntry = new Map<number, SearchMatch[]>();
    matches.forEach((match) => {
      byEntry.set(match.entryId, [
        ...(byEntry.get(match.entryId) ?? []),
        match,
      ]);
    });
    return [...byEntry.entries()];
  }, [matches]);

  const openMatch = (match: SearchMatch) => {
    openSearchMatch(match, query);
    setHiddenMatch(null);
    onClose();
  };

  const handleMatchClick = (match: SearchMatch) => {
    const listItem = deriveListData(rawEntries)[match.entryId];
    const isHidden = listItem && markVisible(filterFields)(listItem).$$hidden;
    if (isHidden) {
      setHiddenMatch(match);
    } else {
      openMatch(match);
    }
  };

  const handleClearFilter = () => {
    clearFilter();
    if (hiddenMatch) openMatch(hiddenMatch);
  };

  const handleClose = () => {
    setHiddenMatch(null);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={handleClose} title="Search" size="big">
      <div className="flex flex-col gap-3 select-text">
        {/* sticky, so the input and the filter prompt stay visible while results scroll */}
        <div className="sticky -top-4 z-10 -mt-4 flex flex-col gap-3 bg-white pt-4 pb-1 dark:bg-slate-800">
          <input
            type="text"
            autoFocus
            placeholder="Search URLs, headers, cookies, bodies…"
            aria-label="Search"
            className="focus:ring-accent-600 dark:bg-bunker-700 w-full rounded-md bg-slate-100 px-3 py-2 text-sm text-black focus:ring-2 focus:outline-hidden dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {hiddenMatch && (
            <div className="bg-accent-800 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white">
              <span className="flex-1">
                This entry is hidden by the filter. Clear the filter?
              </span>
              <button
                type="button"
                className="bg-accent-600 hover:bg-accent-500 rounded-md px-3 py-1"
                onClick={handleClearFilter}
              >
                Clear filter
              </button>
              <button
                type="button"
                className="rounded-md px-3 py-1 hover:bg-white/10"
                onClick={() => setHiddenMatch(null)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {query.trim() && (
          <div className="text-mirage-500 dark:text-mirage-300 text-sm">
            {matches.length === 0
              ? "No results"
              : `${matches.length}${matches.length >= RESULT_LIMIT ? "+" : ""} results in ${groups.length} entries`}
          </div>
        )}

        <div className="flex flex-col gap-2">
          {groups.map(([entryId, entryMatches]) => {
            const { request, response } = rawEntries![entryId]!;
            return (
              <div
                key={entryId}
                className="dark:border-bunker-600 dark:bg-bunker-600 overflow-hidden rounded-md border border-slate-200 bg-slate-50"
              >
                <div className="flex gap-2 truncate px-2 py-1 text-sm">
                  <Method method={request.method} colored={true} />
                  <Status status={response.status} text="" colored={true} />
                  <span className="truncate text-black dark:text-white">
                    {request.url}
                  </span>
                </div>
                {entryMatches.map((match, i) => (
                  <button
                    key={i}
                    type="button"
                    className="hover:bg-accent-700 dark:hover:bg-accent-800 dark:text-mirage-200 group block w-full cursor-pointer truncate px-2 py-1 text-left text-sm font-normal text-black hover:text-white dark:hover:text-white"
                    onClick={() => handleMatchClick(match)}
                  >
                    <span className="text-mirage-500 dark:text-mirage-400 group-hover:text-accent-100 pr-2 font-bold">
                      {sectionTitles[match.section]}
                    </span>
                    {match.before}
                    <mark className="bg-accent-300 rounded-sm text-black">
                      {match.match}
                    </mark>
                    {match.after}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
