"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

const DEFAULT_CATEGORY = "NEWS & BLOG";

function getShareUrl(platform, url, text) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "telegram":
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    default:
      return url;
  }
}

const socialLinks = [
  { id: 1, platform: "twitter", name: "Twitter", icon: "/assets/newsandblog/twitter.svg" },
  { id: 2, platform: "copy", name: "Copy link", icon: "/assets/newsandblog/medium.svg" },
  { id: 3, platform: "facebook", name: "Facebook", icon: "/assets/newsandblog/facebook-circle-fill.svg" },
  { id: 4, platform: "linkedin", name: "LinkedIn", icon: "/assets/newsandblog/linkedin-box-fill.svg" },
  { id: 5, platform: "telegram", name: "Telegram", icon: "/assets/newsandblog/send-plane-line.svg" },
];

function formatDate(isoDate) {
  if (!isoDate) return "";
  try {
    const d = new Date(isoDate);
    return d
      .toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .toUpperCase()
      .replace(",", "");
  } catch {
    return "";
  }
}

const BlogDetails = ({ post, slug, shareUrl = "", shareTitle = "" }) => {
  const [copied, setCopied] = useState(false);
  const category = post?.categories?.edges?.[0]?.node?.name || DEFAULT_CATEGORY;
  const date = formatDate(post?.date) || "—";
  const title = post?.title || "";
  const fullShareUrl =
    shareUrl || (typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "");

  const handleCopyLink = useCallback(() => {
    if (!fullShareUrl) return;
    navigator.clipboard?.writeText(fullShareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullShareUrl]);

  const imageUrl =
    post?.featuredImage?.node?.mediaItemUrl ||
    "/assets/newsandblog/green-pump.png";

  return (
    <section className="pt-15 lg:pt-17.5 pb-8.5 bg-[#f8f8f3]">
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
                {socialLinks.map((item) =>
                  item.platform === "copy" ? (
                    <button
                      key={item.id}
                      type="button"
                      onClick={handleCopyLink}
                      className="transition-all duration-200 hover:scale-110 hover:-translate-y-1 cursor-pointer p-0 border-0 bg-transparent"
                      aria-label={item.name}
                      title={copied ? "Copied!" : item.name}
                    >
                      <Image src={item.icon} alt={item.name} width={24} height={24} />
                    </button>
                  ) : (
                    <Link
                      href={getShareUrl(item.platform, fullShareUrl, shareTitle || title)}
                      key={item.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-200 hover:scale-110 hover:-translate-y-1"
                      aria-label={`Share on ${item.name}`}
                    >
                      <Image src={item.icon} alt={item.name} width={24} height={24} />
                    </Link>
                  ),
                )}
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
