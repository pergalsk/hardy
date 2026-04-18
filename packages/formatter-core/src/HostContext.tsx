"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { JsonViewerSettings } from "./JsonViewerSettings";

export type HostToast = {
  type: string;
  message: ReactNode;
};

export type HostContext = {
  theme: "light" | "dark";
  jsonViewer: JsonViewerSettings;
  notify: (toast: HostToast) => void;
};

const Context = createContext<HostContext | null>(null);

export function HostProvider({
  value,
  children,
}: {
  value: HostContext;
  children: ReactNode;
}) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useFormatterHost(): HostContext {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      "useFormatterHost must be used inside <HostProvider> — wrap the app root.",
    );
  }
  return ctx;
}
