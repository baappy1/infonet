"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logothree.png";

const ChevronIcon = ({ isOpen }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
    aria-hidden
  >
    <path
      d="M12.6667 8L8.00004 12.6667L3.33337 8"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TopHeader({ setActive, activeMenu, themeOptions = {}, menuItems = [] }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const logo = themeOptions?.companyLogo || Logo;
  const letsTalkTitle = themeOptions?.letstalkTitle || "get in touch";
  const letsTalkUrl = themeOptions?.letstalkUrl || "/contact";

  const handleMobileMenuClick = () => setActive(!activeMenu);

  // Close dropdown on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenDropdownIndex(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const getItemKey = (item, i) => item?.label ?? item?.url ?? i;

  return (
    <>
      <header className="main-header-item absolute w-full top-[10px] z-112 border-b-[1px] border-b border-[rgba(255,255,255,0.1)]">
        <div className="container mx-auto py-[14px] lg:py-[22px] pl-[25px] pr-[25px] 2xl:pl-[0] 2xl:pr-[0]">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-[94px] lg:w-[133px]">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Infonet Logo"
                  loading="eager"
                  width={133}
                  height={40}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            <div className="flex gap-[20px] tablet-hidden" ref={dropdownRef}>
              {menuItems.length > 0 ? (
                menuItems.map((item, i) =>
                  item.children?.length > 0 ? (
                    <div
                      key={getItemKey(item, i)}
                      className="relative group"
                      onMouseEnter={() => setOpenDropdownIndex(i)}
                      onMouseLeave={() => setOpenDropdownIndex(null)}
                    >
                      <button
                        type="button"
                        aria-expanded={openDropdownIndex === i}
                        aria-haspopup="true"
                        aria-controls={`menu-dropdown-${i}`}
                        id={`menu-trigger-${i}`}
                        className="relative cursor-pointer flex text-white items-center gap-[4px] uppercase border-transparent group transition-colors duration-200 font-medium leading-5.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EBFF3A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                        onClick={() => setOpenDropdownIndex(openDropdownIndex === i ? null : i)}
                      >
                        <span>{item.label}</span>
                        <ChevronIcon isOpen={openDropdownIndex === i} />
                        <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] transition-all duration-300 group-hover:w-full group-focus-within:w-full" style={{ width: openDropdownIndex === i ? "100%" : undefined }}></span>
                      </button>
                      <div
                        id={`menu-dropdown-${i}`}
                        role="menu"
                        aria-labelledby={`menu-trigger-${i}`}
                        className={`absolute w-[265px] z-[91] top-[20px] left-[-76px] ${openDropdownIndex === i ? "block" : "hidden"}`}
                      >
                        <div className="w-full mt-[42px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[20px] flex flex-col gap-2">
                          {item.children.map((child, j) => (
                            <Link
                              key={child?.label ?? child?.url ?? j}
                              role="menuitem"
                              className="text-white uppercase hover:bg-[#08090D1A] rounded-lg mb-1 w-full block transition-colors duration-200 p-2.5 leading-5.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EBFF3A] focus-visible:ring-inset"
                              href={child?.url ?? "#"}
                              onClick={() => setOpenDropdownIndex(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={getItemKey(item, i)} className="relative group">
                      <Link
                        href={item?.url ?? "#"}
                        className="text-white uppercase font-medium leading-5.5 relative transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EBFF3A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
                      >
                        {item.label}
                        <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </div>
                  )
                )
              ) : (
                <>
                  <div className="relative group">
                    <Link href="/" className="text-white uppercase font-medium leading-5.5 relative transition-colors duration-200">
                      Home
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                  <div className="relative group">
                    <Link href="/Industries" className="text-white uppercase font-medium leading-5.5 relative transition-colors duration-200">
                      Industries
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                  <div className="relative group">
                    <Link href="/solutions" className="text-white uppercase font-medium leading-5.5 relative transition-colors duration-200">
                      Solutions
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                  <div className="relative group">
                    <Link href="/service" className="text-white uppercase font-medium leading-5.5 relative transition-colors duration-200">
                      Services
                      <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <Link
              className="primary-button tablet-hidden max-h-12.5"
              href={letsTalkUrl}
            >
              <span className="font-medium leading-5.5">{letsTalkTitle}</span>
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_433_8)">
                  <path
                    d="M3.125 10H16.875"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.25 4.375L17.875 10L12.25 15.625"
                    stroke="#08090D"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_433_8">
                    <rect width={20} height={20} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>

            <div
              className="mobile-menu-expand tablet-show"
              onClick={handleMobileMenuClick}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleMobileMenuClick())}
              role="button"
              tabIndex={0}
              aria-label="Open menu"
            >
              <svg
                width={40}
                height={32}
                viewBox="0 0 40 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <rect width={40} height={32} rx={4} fill="#EBFF3A" />{" "}
                <g clipPath="url(#clip0_407_15754)">
                  {" "}
                  <path
                    d="M11 8H29V10H11V8ZM11 15H29V17H11V15ZM11 22H29V24H11V22Z"
                    fill="#020617"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_407_15754">
                    {" "}
                    <rect
                      width={24}
                      height={24}
                      fill="white"
                      transform="translate(8 4)"
                    />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
