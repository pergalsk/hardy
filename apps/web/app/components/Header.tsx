import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export function Header(): JSX.Element {
  return (
    <Navigation>
      <Logo />
    </Navigation>
  );
}
