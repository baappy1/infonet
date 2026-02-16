"use client";

import Image from "next/image";
import { useState } from "react";
import GridBlogCard from "./GridBlogCard";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
}

const NewsDetails = ({ items = [] }) => {
  const [activeTab, setActiveTab] = useState("news");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const tabs = [
    { id: "news", label: "NEWS & BLOG" },
    { id: "events", label: "EVENTS" },
  ];

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedItems = currentItems.map((post) => ({
    id: post.id ?? post.databaseId,
    category: post.categories?.edges?.[0]?.node?.name || "NEWS & BLOG",
    date: formatDate(post.date),
    title: post.title || "",
    image: post.featuredImage?.node?.mediaItemUrl || "/assets/newsandblog/blog1.png",
    slug: post.slug,
  }));

  return (
    <section className="pt-25 pb-25 lg:pb-45 bg-[#f8f8f3]">
      <div className="container mx-auto px-2.5">
        <div className="flex gap-1.5 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex px-3 py-1.5 text-base font-jetbrains leading-5.5 uppercase rounded-full transition-colors items-center ${
                activeTab === tab.id
                  ? "bg-[#EBFF3A] text-[#020617]"
                  : "bg-white text-[#020617] border border-[#08090D1A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-12.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {activeTab === "news" &&
            formattedItems.map((item) => (
              <GridBlogCard key={item.id} item={item} />
            ))}
        </div>

        {activeTab === "news" && items.length > 0 && (
          <div className="flex items-center justify-center gap-1 mt-15">
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

            <button
              className="px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed bg-white rounded-full flex items-center justify-center"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image
                src="/assets/newsandblog/right-nav.svg"
                alt="right-nav"
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
