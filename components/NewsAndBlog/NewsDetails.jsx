"use client";

import { useState } from "react";
import GridBlogCard from "./GridBlogCard";

import Image from "next/image";

const newsBlogs = [
  {
    id: 1,
    category: "NEWS & BLOG",
    date: "NOV 03, 2025",
    title: "Infonet Technology launches next-gen EMV Pay-at-the-Pump module",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 2,
    category: "NEWS & BLOG",
    date: "OCT 28, 2025",
    title:
      "AI-powered analytics integration for convenience store loyalty programmes",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 3,
    category: "NEWS & BLOG",
    date: "OCT 27, 2025",
    title: "Cloud-native back-office fuel site management suite",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 4,
    category: "NEWS & BLOG",
    date: "SEPT 01, 2025",
    title:
      "Global card-processor to enable contactless & mobile-wallet payments",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 5,
    category: "NEWS & BLOG",
    date: "AUG 12, 2025",
    title: "Infonet expands into Middle East—with new regional office",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 6,
    category: "NEWS & BLOG",
    date: "JULY 01, 2025",
    title: "Infonet announces integration of RFID-based inventory tracking",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 7,
    category: "NEWS & BLOG",
    date: "SEPT 09, 2025",
    title: "Subscription-based SaaS model for fuel-site operators",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 8,
    category: "NEWS & BLOG",
    date: "AUG 12, 2025",
    title: "Infonet Signs Strategic Partnership with Global Petroleum",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 9,
    category: "NEWS & BLOG",
    date: "JULY 01, 2025",
    title:
      "Advanced Cyber-Threat Monitoring Dashboard for Fuel-Retail Networks",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 10,
    category: "NEWS & BLOG",
    date: "SEPT 09, 2025",
    title: "Subscription-based SaaS model for fuel-site operators",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 11,
    category: "NEWS & BLOG",
    date: "AUG 12, 2025",
    title: "Infonet Signs Strategic Partnership with Global Petroleum",
    image: "/assets/newsandblog/blog1.png",
  },
  {
    id: 12,
    category: "NEWS & BLOG",
    date: "JULY 01, 2025",
    title:
      "Advanced Cyber-Threat Monitoring Dashboard for Fuel-Retail Networks",
    image: "/assets/newsandblog/blog1.png",
  },
];

const NewsDetails = () => {
  const [activeTab, setActiveTab] = useState("news");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const tabs = [
    { id: "news", label: "NEWS & BLOG" },
    { id: "events", label: "EVENTS" },
  ];

  const totalPages = Math.ceil(newsBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = newsBlogs.slice(startIndex, endIndex);

  //reset to page 1 when changing tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-25 pb-25 lg:pb-45 bg-[#f8f8f3]">
      <div className="container mx-auto px-2.5">
        <div className="flex gap-1.5 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-3 py-1.5 text-base font-jetbrains leading-4.5  uppercase rounded-[999px] transition-colors ${
                activeTab === tab.id
                  ? "bg-[#EBFF3A] text-[#020617]"
                  : "bg-transparent text-[#020617] border border-[#08090D1A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div className="mt-12.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {activeTab === "news" &&
            currentItems.map((item) => (
              <GridBlogCard key={item.id} item={item} />
            ))}
        </div>

        {/* pagination */}

        {activeTab === "news" && (
          <div className="flex items-center justify-center gap-1 mt-15">
            {/* previous btn */}
            <button
              className="flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed px-3 py-1.5 bg-white rounded-full"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Image
                src="/assets/newsandblog/left-nav.svg"
                alt="left-nav"
                width={24}
                height={24}
              />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 w-12 h-9 flex items-center justify-center rounded-[999px] font-jetbrains text-base leading-4.5 uppercase tracking-[0px] transition-colors ${
                  currentPage === page
                    ? "bg-[#EBFF3A] text-[#08090d]"
                    : "bg-white text-[#08090d]/60"
                }`}
              >
                {page}
              </button>
            ))}

            {/* next btn */}
            <button
              className="px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed bg-white rounded-full flex items-center justify-center"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image
                src="/assets/newsandblog/right-nav.svg"
                alt="left-nav"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsDetails;
