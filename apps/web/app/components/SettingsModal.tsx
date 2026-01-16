"use client";
import React, { useEffect, useState } from "react";
import { useAppStore } from "../store/store";
import type { Settings as AppSettings } from "../store/store";
import Modal from "./Modal";
import Button from "./Button";
import { SettingItem } from "./Settings";
import SettingsList from "./SettingsList";

type Props = {
  open: boolean;
  onClose: () => void;
  initialForm: AppSettings;
};

const items: SettingItem[] = [
  {
    id: "showPages",
    key: "showPages",
    label: "Show Pages",
    desc: "Group requests by pages if pages are defined.",
    type: "switch",
  },
  {
    id: "hideEmptyPages",
    key: "hideEmptyPages",
    label: "Exclude Empty Pages",
    desc: "Hide pages that contain no entries.",
    type: "switch",
  },
  {
    id: "excludeHidden",
    key: "excludeHidden",
    label: "Exclude Hidden Items",
    desc: "Completely exclude hidden items from the list.",
    type: "switch",
  },
  {
    id: "groupHidden",
    key: "groupHidden",
    label: "Group Hidden Items",
    desc: "Group items marked as hidden instead of listing them individually.",
    type: "switch",
  },
];

export default function SettingsModal({ open, onClose, initialForm }: Props) {
  const [form, setForm] = useState<AppSettings>(initialForm);

  // keep local form in sync whenever modal opens with new initialForm
  useEffect(() => {
    if (open) setForm(initialForm);
  }, [open, initialForm]);

  const setFormValue = (key: keyof AppSettings, value: any) =>
    setForm((f) => ({ ...(f as AppSettings), [key]: value }) as AppSettings);

  const toggleKey = (key: keyof AppSettings) =>
    setForm(
      (f) =>
        ({ ...(f as AppSettings), [key]: !(f[key] as boolean) }) as AppSettings,
    );

  const save = () => {
    useAppStore.setState({ settings: { ...form } });
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Settings"
      closeOnBackdropClick
    >
      <div className="space-y-2 p-4">
        <SettingsList
          items={items}
          form={form}
          onToggle={(k) => toggleKey(k)}
          onChange={(k, v) => setFormValue(k, v)}
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-200 p-4 dark:border-slate-700">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={save}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
