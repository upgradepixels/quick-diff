import React from "react";
import RightNavigationMenu from "./RightNavigationMenu";

const NavigationMenu = () => {
  return (
    <div className="pt-4 pb-10 flex flex-row justify-between items-center">
      <div className="text-3xl text-[#1a1523] font-bold">
        Quick 
        <span className="highlightText">
          Diff
        </span>
      </div>
      <RightNavigationMenu />
    </div>
  );
};

export default NavigationMenu;
