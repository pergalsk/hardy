import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";

export function Header(): JSX.Element {
  return (
    <Navigation>
      <Logo />
      <FileTabs />
    </Navigation>
  );
}
