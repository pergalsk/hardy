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
  const current = useAppStore(selectSettings);
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  return (
    <>
      <div
        className={`iconify material-symbols--settings hover:text-accent-600 my-auto ml-auto mr-1 text-xl dark:bg-slate-500 dark:hover:bg-slate-400`}
        onClick={openModal}
      ></div>

      <SettingsModal
        open={open}
        onClose={() => setOpen(false)}
        initialForm={current}
      />
    </>
  );
}
