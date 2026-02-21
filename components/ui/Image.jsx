"use client";

import NextImage from "next/image";

const EXTERNAL_DOMAINS = [
  "staging.hellonotionhive.com",
  "hellonotionhive.com",
  "infonet.local",
];

function isExternalWordPressUrl(src) {
  if (typeof src !== "string") return false;
  return EXTERNAL_DOMAINS.some((d) => src.includes(d));
}

export default function Image({ src, unoptimized: propUnoptimized, ...props }) {
  const useUnoptimized =
    propUnoptimized ?? (src && isExternalWordPressUrl(src));

  return (
    <NextImage
      src={src}
      unoptimized={useUnoptimized}
      {...props}
    />
  );
}
