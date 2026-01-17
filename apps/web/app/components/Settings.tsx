import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

export function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`iconify material-symbols--settings hover:text-accent-600 my-auto ml-auto mr-1 text-xl dark:bg-slate-500 dark:hover:bg-slate-400`}
        onClick={() => setOpen(true)}
      ></div>

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
