"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export default function TopHeader( {setActive, activeMenu}  ) {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const dropdownRefs = {
    industries: useRef(null),
    solutions: useRef(null),
    services: useRef(null),
    company: useRef(null),
  };

  const handleClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setActiveTab(activeTab === menu ? null : menu);
};

  const getHeight = (menu) => {
    return dropdownRefs[menu].current ? dropdownRefs[menu].current.scrollHeight : 0;
  };

  const hidePopupMenu = () => {
    setActive(!activeMenu); 
  };

  return (
    <div className={ `fixed w-full bg-white h-screen top-0 left-0 z-50 p-[10px] ${activeMenu ? 'flex' : 'hidden'}` }>
      <div className="relative neon-green-bg w-full h-full rounded-[8px] px-[16px] pb-[90px]">

        {/* Close Button */}
        <div className="float-right absolute right-[0] pt-[14px]">
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

          {/* Home */}
          <div className="relative group">
            <Link href="/" className="uppercase relative transition-colors duration-200 font-medium leading-[22px]">
              Home
            </Link>
          </div>

          {/* Industries */}
          <div className="relative group">
            <button
              onClick={() => handleClick("industries")}
              className={` relative cursor-pointer font-medium flex items-center gap-[4px] uppercase border-transparent group transition-colors duration-200 leading-[22px]`}
            >
              <span>Industries</span>
              <svg 
                className={`transition-transform duration-300 ${
                  activeTab === "industries" ? "rotate-180" : ""
                }`}
                width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33334V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6667 8L8 12.6667L3.33334 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
            </button>

            <div
              ref={dropdownRefs.industries}
              style={{
                maxHeight: openMenu === "industries" ? getHeight("industries") + "px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
              className="w-full"
            >
              <div className="w-full mt-[20px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[10px] flex flex-col gap-[4px]">
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Retail Gas Stations</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Convenience Stores</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Unattended Fuel Sites</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Fleet Fueling</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">First Nations Retail</Link>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="relative group">
            <button
              onClick={() => handleClick("solutions")}
              className="relative font-medium cursor-pointer flex items-center gap-[4px] uppercase border-transparent group transition-colors duration-200 leading-[22px]"
            >
              <span>Solutions</span>
              <svg 
                className={`transition-transform duration-300 ${
                  activeTab === "solutions" ? "rotate-180" : ""
                }`}
                width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33334V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6667 8L8 12.6667L3.33334 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
            </button>

            <div
              ref={dropdownRefs.solutions}
              style={{
                maxHeight: openMenu === "solutions" ? getHeight("solutions") + "px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
              className="w-full"
            >
              <div className="w-full  mt-[20px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[10px] flex flex-col gap-[4px]">
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Retail Gas Stations</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Convenience Stores</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Unattended Fuel Sites</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Fleet Fueling</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] rounded-[8px] leading-[22px] w-full block transition-colors duration-200 p-[10px]" href="/industries">First Nations Retail</Link>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="relative group">
            <button
              onClick={() => handleClick("services")}
              className="relative font-medium cursor-pointer flex leading-[22px] items-center gap-[4px] uppercase border-transparent group transition-colors duration-200"
            >
              <span>Services</span>
              <svg 
              className={`transition-transform duration-300 ${
                  activeTab === "services" ? "rotate-180" : ""
                }`}
                width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33334V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6667 8L8 12.6667L3.33334 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
            </button>

            <div
              ref={dropdownRefs.services}
              style={{
                maxHeight: openMenu === "services" ? getHeight("services") + "px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
              className="w-full"
            >
              <div className="w-full mt-[20px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[10px] flex flex-col gap-[4px]">
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Retail Gas Stations</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Convenience Stores</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Unattended Fuel Sites</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Fleet Fueling</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">First Nations Retail</Link>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="relative group">
            <button
              onClick={() => handleClick("company")}
              className="relative font-medium cursor-pointer flex items-center gap-[4px] leading-[22px] uppercase border-transparent group transition-colors duration-200"
            >
              <span>Company</span>
              <svg 
                className={`transition-transform duration-300 ${
                  activeTab === "company" ? "rotate-180" : ""
                }`}
                width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8 3.33334V12.6667" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.6667 8L8 12.6667L3.33334 8" stroke="#08090D" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute bottom-[-3px] left-0 w-0 h-[2px] bg-[#EBFF3A] group-hover:w-full transition-all duration-300"></span>
            </button>

            <div
              ref={dropdownRefs.company}
              style={{
                maxHeight: openMenu === "company" ? getHeight("company") + "px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}
              className="w-full"
            >
              <div className="w-full mt-[20px] rounded-[8px] bg-[#08090D1A] backdrop-blur-[30px] p-[10px] flex flex-col gap-[4px]">
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Retail Gas Stations</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Convenience Stores</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Unattended Fuel Sites</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">Fleet Fueling</Link>
                <Link className="uppercase font-medium active:bg-[#08090D1A] leading-[22px] rounded-[8px] w-full block transition-colors duration-200 p-[10px]" href="/industries">First Nations Retail</Link>
              </div>
            </div>
          </div>

        </div>

        <Link 
          href="/contact"
          className="bg-white w-[calc(100%-32px)] left-[16px] flex items-center justify-between rounded-[4px] px-[16px] py-[12px] uppercase font-medium leading-[18px] text-[14px] text-[#08090D] absolute bottom-[10px]"
          >
          <span>get in touch</span>
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <g clipPath="url(#clip0_456_2571)"> <path d="M2.5 8H13.5" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" /> <path d="M9.8 3.5L14.3 8L9.8 12.5" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" /> </g> <defs> <clipPath id="clip0_456_2571"> <rect width={16} height={16} fill="white" /> </clipPath> </defs> </svg>
        </Link>

      </div>
    </div>
  );
}
