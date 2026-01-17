"use client";
import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import { useAppStore } from "../store/store";
import { selectSettings } from "../store/selectors";
import type { Settings as AppSettings } from "../store/store";

export type SettingItem = {
  id: string;
  key: keyof AppSettings;
  label: string;
  desc?: string;
  type: "switch" | "text" | "integer";
  disabled?: boolean;
};

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
