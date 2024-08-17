// import { invoke } from "@tauri-apps/api/core";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HARDY | HAR viewer",
  description: "App for viewing HAR files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // Tauri command for showing main window.
  // It should solve the white background blink before page display.
  // It is necessary to hide main window first in tauri.conf.json (app.windows.visible: false).
  // https://v2.tauri.app/learn/splashscreen/
  // https://tauri.app/v1/guides/features/splashscreen/
  // invoke("show_main_window");

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
