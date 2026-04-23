"use client";
import type React from "react";

import { HostProvider } from "@repo/formatter-core";
import { useAppStore } from "../store/store";
import { selectJsonViewerSettings } from "../features/settings/selectors";
import { addToast } from "../features/notifications/actions";
import { useDarkMode } from "../core/hooks/useDarkMode";
import "../plugins.config";

export function FormatterHostBridge({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
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
