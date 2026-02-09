"use client";

import Image from "next/image";
import Link from "next/link";

const DEFAULT_CATEGORY = "NEWS & BLOG";
const socialLinks = [
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
];

function formatDate(isoDate) {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).toUpperCase().replace(",", "");
  } catch {
    return "";
  }
}

const BlogDetails = ({ post, slug }) => {
  const category = post?.categories?.edges?.[0]?.node?.name || DEFAULT_CATEGORY;
  const date = formatDate(post?.date) || "—";
  const title = post?.title || "";
  const imageUrl = post?.featuredImage?.node?.mediaItemUrl || "/assets/newsandblog/green-pump.png";

  return (
    <section className="pt-15 lg:pt-41.5 pb-8.5 bg-[#f8f8f3]">
      <div className="max-w-247.5 mx-auto px-2.5">
        <Link
          href="/blog"
          className="flex items-center px-3 py-1.5 justify-center border border-[#08090d]/10 gap-2 rounded-[999px] w-fit"
        >
          <Image
            width={20}
            height={20}
            src="/assets/newsandblog/left-nav.svg"
            alt="left-nav"
          />
          <span className="font-jetbrains text-base leading-4.5 uppercase tracking-[0px]">
            back
          </span>
        </Link>

        {/* blog header */}
        <div className="mt-7.5 flex flex-col gap-5 md:flex-row md:gap-8  w-full border-b border-[#08090d]/20 border-dashed pb-[34px]">
          {/* left */}
          <div className="max-w-119.75 w-full">
            <div className="flex items-center rounded-[999px] gap-2 font-jetbrains text-base leading-5.5 uppercase tracking-[0px] bg-[#EBFF3A] px-3 py-1.5 max-w-66.5">
              <span>{category}</span>
              <Image
                src="/assets/newsandblog/eclipse.svg"
                width={4}
                height={4}
                alt="dot"
              />
              <span>{date}</span>
            </div>

            <h2 className="heading-h2 text-[#08090D] max-w-119.75 mt-4">
              {title}
            </h2>

            {/* social links */}
            <div className="flex items-center gap-2 mt-15 sm:mt-38.25">
              <p className="font-manrope font-medium text-base leading-5.5 text-[#08090D]">
                Share this article on :
              </p>

              <div className="flex items-center gap-1 ">
                {socialLinks.map((item) => (
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
              src={imageUrl}
              alt={title || "Featured image"}
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
