// import { getCurrentWindow } from "@tauri-apps/api/window";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";
import { FileTabs } from "./FileTabs";

// const minimize = () => getCurrentWindow().minimize();
// const toggleMaximize = () => getCurrentWindow().toggleMaximize();
// const close = () => getCurrentWindow().close();

export function Header(): JSX.Element {
  return (
    <Navigation>
      <Logo />
      <FileTabs />
      {/* <div className="hover:bg-accent-800 cursor-pointer" onClick={minimize}>
        MIN
      </div>
      <div
        className="hover:bg-accent-800 cursor-pointer"
        onClick={toggleMaximize}
      >
        MAX
      </div>
      <div className="hover:bg-accent-800 cursor-pointer" onClick={close}>
        CLOSE
      </div> */}
    </Navigation>
  );
}
