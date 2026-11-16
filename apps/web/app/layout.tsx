import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { FormatterHostBridge } from "./providers/FormatterHostBridge";
import { TooltipProvider } from "@repo/ui/tooltip";

const defaultMono = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "block",
  variable: "--font-default-mono",
});

export const metadata: Metadata = {
  title: "HARDY | HAR viewer",
  description: "App for viewing HAR files",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body className={`${defaultMono.variable} text-base`}>
        <TooltipProvider>
          <FormatterHostBridge>{children}</FormatterHostBridge>
        </TooltipProvider>
      </body>
    </html>
  );
}
