"use client";
import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import { ActionIcon } from "./ActionIcon";

export function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionIcon
        onClick={() => setOpen(true)}
        icon="iconify material-symbols--settings-outline-rounded"
      />

      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
