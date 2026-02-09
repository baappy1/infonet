"use client";

import { useState } from "react";
import CareerListCard from "./CareerListCard";

const INITIAL_COUNT = 7;
const LOAD_MORE_COUNT = 2;

export default function CareerList({
  title = "Explore Open Roles",
  shortDescription = "Whether you're just starting out or bringing years of experience, explore our current openings.",
  careers = [],
}) {
  const list = Array.isArray(careers) ? careers : [];
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);

  const visibleCareers = list.slice(0, displayCount);
  const hasMore = displayCount < list.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + LOAD_MORE_COUNT);
  };

  return (
    <>
      <div className="pt-20 sm:pt-27.5 lg:pt-55 pb-20 sm:pb-27.5 lg:pb-55 bg-white">
        <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
          <div className="w-full sm:w-164.75 sm:mb-0 mb-10">
            <h2 className="heading-h2 mb-5">{title}</h2>
            <p className="paragraph-text mb-6 sm:mb-11">{shortDescription}</p>
          </div>
          <div className="flex flex-col">
            {list.length > 0 ? (
              visibleCareers.map((career) => (
                <CareerListCard
                  key={career.id ?? career.databaseId}
                  title={career.title}
                  jobLocation={career.jobLocation}
                  jobType={career.jobType}
                  jobDesignation={career.jobDesignation}
                  slug={career.slug}
                  databaseId={career.databaseId}
                />
              ))
            ) : (
              <>
                <CareerListCard />
                <CareerListCard />
                <CareerListCard />
              </>
            )}

            {list.length > 0 && hasMore && (
              <div className="mt-10 mx-auto">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="mx-auto inline-flex lg:px-4 px-4 py-3 lg:py-4 text-[14px] leading-4.5 font-medium box-border rounded-sm bg-[#EBFF3A] transition duration-150 hover:bg-white hover:text-[#08090D] uppercase gap-[10px]"
                  id="load-more-roles"
                >
                  <span className="font-medium sm:leading-[18px] text-[14px]">Load more roles</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_433_8)">
                      <path d="M3.125 10H16.875" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                      <path d="M12.25 4.375L17.875 10L12.25 15.625" stroke="#08090D" strokeWidth="1.5" strokeLinecap="square" />
                    </g>
                    <defs>
                      <clipPath id="clip0_433_8"><rect width="20" height="20" fill="white" /></clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[50px] lg:h-[220px] bg-[#F8F8F3]" />
    </>
  );
}
