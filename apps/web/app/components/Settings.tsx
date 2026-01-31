import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

export function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`iconify material-symbols--settings-outline-rounded my-auto mr-1 text-xl dark:bg-slate-400 dark:hover:bg-slate-300`}
        onClick={() => setOpen(true)}
      ></div>

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
