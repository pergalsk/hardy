import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const defaultMono = JetBrains_Mono({
  subsets: ["latin"],
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
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${defaultMono.variable} text-base`}>{children}</body>
    </html>
  );
}
