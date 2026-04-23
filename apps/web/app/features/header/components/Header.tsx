import type React from "react";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "../../file/components/FileTabs";
import { AppHeaderActions } from "./AppHeaderActions";

export function Header(): React.JSX.Element {
  return (
    <Navigation>
      <Logo />
      <FileTabs />
      <AppHeaderActions />
    </Navigation>
  );
}
