"use client";
import React, { useEffect, useState } from "react";
import { ActionIcon } from "@repo/ui/action-icon";
import { SearchModal } from "./SearchModal";

const isSearchShortcut = (e: KeyboardEvent) =>
  (e.ctrlKey || e.metaKey) &&
  (e.key.toLowerCase() === "k" || (e.shiftKey && e.key.toLowerCase() === "f"));

export function Search() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isSearchShortcut(e)) return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ActionIcon
        onClick={() => setOpen(true)}
        icon="iconify material-symbols--search-rounded"
      />

      {open && <SearchModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
