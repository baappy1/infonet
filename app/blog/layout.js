
"use client";
import { useEffect } from "react";
import HeaderSecound from "@/app/layout/HeaderSecound";

export default function CareerDetailsLayout({ children }) {
  useEffect(() => {
    // Hide root header (TopHeader with class "main-header-item") for blog routes
    const rootHeader = document.querySelector("header.main-header-item");
    const mobilePopup = document.querySelector(
      '[id*="mobile-header"], [class*="MobileHeaderPopup"]',
    );

    const elementsToHide = [];

    if (rootHeader) {
      rootHeader.style.display = "none";
      elementsToHide.push(rootHeader);
    }

    if (mobilePopup) {
      mobilePopup.style.display = "none";
      elementsToHide.push(mobilePopup);
    }

    return () => {
      elementsToHide.forEach((el) => {
        if (el) el.style.display = "";
      });
    };
  }, []);

  return (
    <>
      <HeaderSecound />
      {children}
    </>
  );
}
