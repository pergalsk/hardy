"use client";

import { HostProvider } from "@repo/formatter-core";
import { useAppStore } from "../store/store";
import { selectJsonViewerSettings } from "../store/selectors";
import { addToast } from "../store/actions";
import { useDarkMode } from "../helpers/useDarkMode";
import { bootstrapPlugins } from "../plugins.config";

bootstrapPlugins();

export function FormatterHostBridge({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
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
            message: toast.message as string | JSX.Element,
          });
        },
      }}
    >
      {children}
    </HostProvider>
  );
}
