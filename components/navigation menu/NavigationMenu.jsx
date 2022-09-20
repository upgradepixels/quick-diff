import Image from "next/image";
import React from "react";
import RightNavigationMenu from "./RightNavigationMenu";

const NavigationMenu = () => {
  return (
    <div className="pt-4 pb-10 h-20 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <div className="w-8 h-8">
          <Image
            src="/favicon_io/android-chrome-192x192.png"
            alt="Quick Diff logo"
            width={32}
            height={32}
          />
        </div>
        <div className="text-3xl text-[#1a1523] font-bold">
          Quick
          <span className="highlightText">Diff</span>
        </div>
      </div>
      <RightNavigationMenu />
    </div>
  );
};

export default NavigationMenu;
