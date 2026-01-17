"use client";
import React from "react";
import type { Settings as AppSettings } from "../store/store";
import ToggleSwitch from "./ToggleSwitch";
import { SettingItem } from "./SettingsModal";

type Props = {
  items: SettingItem[];
  form: AppSettings;
  onChange: (key: keyof AppSettings, value?: any) => void;
};

type SettingComponentProps = {
  label: string;
  value: unknown;
  onChange: (value?: any) => void;
};

const SwitchRenderer: React.FC<SettingComponentProps> = ({
  label,
  value,
  onChange,
}) => (
  <ToggleSwitch
    checked={value as boolean}
    onChange={onChange}
    ariaLabel={label}
  />
);

const TextRenderer: React.FC<SettingComponentProps> = ({
  label,
  value,
  onChange,
}) => (
  <input
    aria-label={label}
    type="text"
    value={(value as string) ?? ""}
    onChange={(e) => onChange(e.target.value)}
    className="ml-4 w-48 rounded border border-gray-200 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
  />
);

const IntegerRenderer: React.FC<SettingComponentProps> = ({
  label,
  value,
  onChange,
}) => (
  <input
    aria-label={label}
    type="number"
    value={typeof value === "number" ? String(value) : ""}
    onChange={(e) => {
      const v = e.target.value === "" ? null : Number(e.target.value);
      onChange(v);
    }}
    className="ml-4 w-32 rounded border border-gray-200 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
  />
);

/**
 * Map of type -> renderer component
 */
const rendererMap: Record<
  SettingItem["type"],
  React.ComponentType<SettingComponentProps>
> = {
  switch: SwitchRenderer,
  text: TextRenderer,
  integer: IntegerRenderer,
};

/**
 * SettingsList - uses rendererMap based on item.type
 */
export default function SettingsList({ items, form, onChange }: Props) {
  return items.map((it) => {
    const value = form[it.key];

    // renderer by type from the mapping table
    const Renderer = rendererMap[it.type];

    if (!Renderer) {
      return null;
    }

    return (
      <div
        key={it.key}
        className="flex justify-between border-b border-gray-200 py-2 last:border-b-0 dark:border-slate-700"
      >
        <div className="mr-4">
          <div className="text-mirage-800 dark:text-mirage-100 text-md font-medium">
            {it.label}
          </div>

          {it.desc && (
            <div className="text-mirage-500 dark:text-mirage-300 text-sm">
              {it.desc}
            </div>
          )}
        </div>

        <div className="mt-1">
          <Renderer
            label={it.label}
            value={value as any}
            onChange={(v: any) => onChange(it.key, v)}
          />
        </div>
      </div>
    );
  });
}
