"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function MobileHeaderPopup({ setActive, activeMenu, themeOptions = {}, menuItems = [] }) {
  const logo = themeOptions?.companyLogo;
  const letsTalkTitle = themeOptions?.letstalkTitle || "get in touch";
  const letsTalkUrl = themeOptions?.letstalkUrl || "/contact";
  const [openMenu, setOpenMenu] = useState(null);
  const dropdownRefs = useRef([]);

  const handleClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const getHeight = (index) => {
    return dropdownRefs.current[index]?.scrollHeight ?? 0;
  };

  const hidePopupMenu = () => {
    setActive(!activeMenu); 
  };

  return (
    <div className={ `fixed w-full bg-white h-screen top-0 left-0 z-9991 p-[10px] ${activeMenu ? 'flex' : 'hidden'}` }>
      <div className="relative neon-green-bg w-full h-full rounded-[8px] px-[16px] pb-[90px]">

        {/* Close Button */}
        <div className="float-right absolute right-0 pt-[14px]">
          <button
            onClick={() => hidePopupMenu()}
          >
            <svg width={40} height={32} viewBox="0 0 40 32" fill="none">
              <rect width={40} height={32} rx={4} fill="#EBFF3A" />
              <g clipPath="url(#clip0_407_16244)">
                <path
                  d="M20 14.586L24.95 9.636L26.364 11.05L21.414 16L26.364 20.95L24.95 22.364L20 17.414L15.05 22.364L13.636 20.95L18.586 16L13.636 11.05L15.05 9.636L20 14.586Z"
                  fill="#020617"
                />
              </g>
            </svg>
          </button>
        </div>

        <div className="pt-[76px] flex flex-col gap-[20px] w-full max-h-[600px] pb-200px overflow-y-auto">
          {menuItems.length > 0 ? (
            menuItems.map((item, i) =>
              item.children?.length > 0 ? (
                <div key={i} className="relative group">
                  <button
                    onClick={() => handleClick(i)}
                    className="relative cursor-pointer font-medium flex items-center gap-[4px] uppercase border-transparent group transition-colors duration-200 leading-[22px] w-full justify-start"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`transition-transform duration-300 shrink-0 ${openMenu === i ? "rotate-180" : ""}`}
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M8 3.33334V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12.6667 8L8 12.6667L3.33334 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <div
                    ref={(el) => (dropdownRefs.current[i] = el)}
                    style={{
                      maxHeight: openMenu === i ? getHeight(i) + "px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                    className="w-full"
                  >
                    <div className="w-full mt-[20px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[10px] flex flex-col gap-[4px]">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]"
                          href={child.url}
                          onClick={() => hidePopupMenu()}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="relative group">
                  <Link
                    href={item.url}
                    className="uppercase relative transition-colors duration-200 font-medium leading-[22px] block"
                    onClick={() => hidePopupMenu()}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )
          ) : (
            <>
              <Link href="/" className="uppercase font-medium leading-[22px]" onClick={() => hidePopupMenu()}>
                Home
              </Link>
              <Link href="/Industries" className="uppercase font-medium leading-[22px]" onClick={() => hidePopupMenu()}>
                Industries
              </Link>
              <Link href="/solutions" className="uppercase font-medium leading-[22px]" onClick={() => hidePopupMenu()}>
                Solutions
              </Link>
              <Link href="/service" className="uppercase font-medium leading-[22px]" onClick={() => hidePopupMenu()}>
                Services
              </Link>
            </>
          )}
        </div>

        <Link 
          href={letsTalkUrl}
          className="bg-white w-[calc(100%-32px)] left-[16px] flex items-center justify-between rounded-[4px] px-[16px] py-[12px] uppercase font-medium leading-[18px] text-[14px] text-[#08090D] absolute bottom-[10px]"
          >
          <span>{letsTalkTitle}</span>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <g clipPath="url(#clip0_456_2571)"> <path d="M2.5 8H13.5" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" /> <path d="M9.8 3.5L14.3 8L9.8 12.5" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" /> </g> <defs> <clipPath id="clip0_456_2571"> <rect width={16} height={16} fill="white" /> </clipPath> </defs> </svg>
        </Link>

      </div>
    </div>
  );
}
