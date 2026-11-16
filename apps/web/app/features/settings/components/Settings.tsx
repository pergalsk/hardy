"use client";
import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import { ActionIcon } from "@repo/ui/action-icon";

export function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionIcon
        onClick={() => setOpen(true)}
        label="Settings"
        icon="iconify material-symbols--settings-outline-rounded"
      />

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
