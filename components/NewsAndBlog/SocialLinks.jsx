import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const SocialShare = ({ shareText = "Share this article on :" }) => {
  return (
    <div className="flex items- justify-end gap-2">
      <p className="font-manrope font-medium text-base leading-5.5 text-[#08090D]">
        {shareText}
      </p>

      <div className="flex items-center gap-1">
        {socialLinks.map((item) => (
          <Link href={item.url} key={item.id}>
            <Image src={item.icon} alt={item.name} width={24} height={24} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
