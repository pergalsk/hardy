"use client";

// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";

import React from "react";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Footer } from "./components/Footer";

export default function Page(): JSX.Element {
  return (
    <div className="dark:bg-bunker-900 flex h-screen w-screen flex-col bg-white font-mono text-base">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
