"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

import HeaderSecound from "./HeaderSecound";
import MobileHeaderPopup from "./MobileHeaderPopup";
import TopHeader from "./TopHeader";

// Routes that use the secondary (solid) header instead of the hero header
const SECONDARY_HEADER_PATHS = ["/blog", "/career/career-details"];

function useSecondaryHeader() {
  const pathname = usePathname();
  return SECONDARY_HEADER_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function Header({ themeOptions = {}, menuItems = [] }) {
  const [activeMenu, setActive] = useState(false);
  const useSecondary = useSecondaryHeader();

  if (useSecondary) {
    return (
      <HeaderSecound
        setActive={setActive}
        activeMenu={activeMenu}
        themeOptions={themeOptions}
        menuItems={menuItems}
      />
    );
  }

  return (
    <>
      <TopHeader setActive={setActive} activeMenu={activeMenu} themeOptions={themeOptions} menuItems={menuItems} />
      <MobileHeaderPopup setActive={setActive} activeMenu={activeMenu} themeOptions={themeOptions} menuItems={menuItems} />
    </>
  );
}