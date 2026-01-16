import React from "react";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";
import { Settings } from "./Settings";

export function Header(): JSX.Element {
  return (
    <Navigation>
      <Logo />
      <FileTabs />
      {/*       <div
        className={`iconify material-symbols--note-stack-outline hover:text-accent-600 my-auto ml-auto text-xl dark:bg-slate-500 dark:hover:bg-slate-400`}
      ></div>
      */}
      <Settings />
    </Navigation>
  );
}
