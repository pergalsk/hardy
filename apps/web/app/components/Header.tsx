import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";

export function Header({ files, onClose }: any): JSX.Element {
  return (
    <Navigation>
      <Logo />
      <FileTabs files={files} onClose={onClose} />
    </Navigation>
  );
}
