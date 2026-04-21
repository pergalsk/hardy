"use client";

import type React from "react";
import { HostProvider } from "@repo/formatter-core";
import { useAppStore } from "../store/store";
import { selectJsonViewerSettings } from "../store/selectors";
import { addToast } from "../store/actions";
import { useDarkMode } from "../helpers/useDarkMode";
import "../plugins.config";

export function FormatterHostBridge({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonViewer = useAppStore(selectJsonViewerSettings);
  const isDark = useDarkMode();

  return (
    <HostProvider
      value={{
        theme: isDark ? "dark" : "light",
        jsonViewer,
        notify: (toast) => {
          addToast({
            type: toast.type as "info" | "alert",
            message: toast.message as string | React.JSX.Element,
          });
        },
      }}
    >
      {children}
    </HostProvider>
  );
}
