import type React from "react";
import Image from "next/image";
import logo from "../../../assets/logo.svg";

export function Logo(): React.JSX.Element {
  return (
    <div className="flex select-none content-center gap-3 font-black tracking-wide">
      <Image src={logo} alt="HARDY logo" width={32} height={32} />
      <div className="flex items-center text-white">HARDY</div>
    </div>
  );
}
