import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";
import { AppHeaderActions } from "./AppHeaderActions";

export function Header() {
  return (
    <Navigation>
      <Logo />
      <FileTabs />
      <AppHeaderActions />
    </Navigation>
  );
}
