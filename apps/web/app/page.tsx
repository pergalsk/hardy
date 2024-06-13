// import Image from "next/image";
// import { Card } from "@repo/ui/card";
// import { Code } from "@repo/ui/code";
// import styles from "./page.module.css";
// import { Button } from "@repo/ui/button";
import { Header } from "./Header";
import { Detail } from "./Detail";
import { List } from "./List";

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col bg-bunker-900 w-screen h-screen font-mono">
      <Header></Header>
      <main className="flex h-full">
        <List />
        <Detail />
      </main>
    </div>
  );
}
