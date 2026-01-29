"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const blogDetail = {
  id: 1,
  category: "NEWS & BLOG",
  date: "NOV 03, 2025",
  title: "From Feedback to Action: How to Turn Insights Into Measurable Growth",
  image: "/assets/newsandblog/green-pump.png",
  shareText: "Share this article on :",
  socialLinks: [
    {
      id: 1,
      name: "Twitter",
      icon: "/assets/newsandblog/twitter.svg",
      url: "#",
    },
    {
      id: 2,
      name: "Medium",
      icon: "/assets/newsandblog/medium.svg",
      url: "#",
    },
    {
      id: 3,
      name: "Facebook",
      icon: "/assets/newsandblog/facebook-circle-fill.svg",
      url: "#",
    },
    {
      id: 4,
      name: "LinkedIn",
      icon: "/assets/newsandblog/linkedin-box-fill.svg",
      url: "#",
    },
    {
      id: 5,
      name: "Telegram",
      icon: "/assets/newsandblog/send-plane-line.svg",
      url: "#",
    },
  ],
};

const BlogDetails = () => {
  return (
    <section className="pt-15 lg:pt-41.5 pb-8.5 bg-[#f8f8f3]">
      <div className="max-w-247.5 mx-auto px-2.5">
        <button className="flex  items-center px-3 py-1.5 justify-center border border-[#08090d]/10 gap-2 rounded-[999px]">
          <Image
            width={20}
            height={20}
            src="/assets/newsandblog/left-nav.svg"
            alt="left-nav"
          />
          <span className="font-jetbrains text-base leading-4.5 uppercase tracking-[0px]">
            back
          </span>
        </button>

        {/* blog header */}
        <div className="mt-7.5 flex flex-col gap-5 md:flex-row md:gap-8  w-full border-b border-[#08090d]/20 border-dashed pb-[34px]">
          {/* left */}
          <div className="max-w-119.75 w-full">
            <div className="flex items-center rounded-[999px] gap-2 font-jetbrains text-base leading-5.5 uppercase tracking-[0px] bg-[#EBFF3A] px-3 py-1.5 max-w-66.5">
              <span>{blogDetail.category}</span>
              <Image
                src="/assets/newsandblog/eclipse.svg"
                width={4}
                height={4}
                alt="dot"
              />
              <span>{blogDetail.date}</span>
            </div>

            <h2 className="heading-h2 text-[#08090D] max-w-119.75 mt-4">
              {blogDetail.title}
            </h2>

            {/*socail links  */}
            <div className="flex items-center gap-2 mt-15 sm:mt-38.25">
              <p className="font-manrope font-medium text-base leading-5.5 text-[#08090D]">
                {blogDetail.shareText}
              </p>

              <div className="flex items-center gap-1 ">
                {blogDetail.socialLinks.map((item) => (
                  <Link href={item.url} key={item.id}>
                    <Image src={item.icon} alt="icon" width={24} height={24} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* right */}
          <div className="relative w-full h-95">
            <Image
              src={blogDetail.image}
              alt="pump"
              fill
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
