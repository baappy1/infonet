"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Banner({
  bannerTopTitle,
  bannerImage,
  bannerVideo,
  bannerTitle,
  bannerDescription,
  bannerButtonTitle,
  bannerButtonURL,
  mediaType, // optional: 'image' or 'video'
}) {
  const topTitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Auto-detect media type if not explicitly provided
  const getMediaType = () => {
    // Explicit override wins
    if (mediaType) return mediaType;

    // Prefer explicit video prop
    if (bannerVideo) return "video";

    // Treat .mp4 bannerImage as video source
    if (bannerImage && bannerImage.toLowerCase().endsWith(".mp4")) {
      return "video";
    }

    // Fallback to image
    if (bannerImage) return "image";

    return "image";
  };

  const currentMediaType = getMediaType();
  const videoSrc =
    bannerVideo ||
    (bannerImage && bannerImage.toLowerCase().endsWith(".mp4") ? bannerImage : null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (topTitleRef.current) {
      gsap.set(topTitleRef.current, { opacity: 0, y: 30 });
      tl.to(topTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(
        titleRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }

    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      tl.to(
        descriptionRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 30 });
      tl.to(
        buttonRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4",
      );
    }
  }, []);

  // Video loading handler
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  };

  const renderBackground = () => {
    if (currentMediaType === "video" && videoSrc) {
      return (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            className="w-full h-full object-cover"
            // Only use poster when bannerImage is an actual image, not the mp4 itself
            poster={
              bannerImage && !bannerImage.toLowerCase().endsWith(".mp4")
                ? bannerImage
                : undefined
            } // Optional: show image as poster while video loads
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            {bannerImage && (
              <div
                style={{
                  backgroundImage: `url(${bannerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      );
    }

    // Default to image background
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  };

  return (
    <>
      <div className="banner pt-[10px] pl-[10px] pr-[10px] h-screen lg:min-h-[720px]">
        <div className="h-full rounded-[8px] relative overflow-hidden">
          {/* Background media (image or video) */}
          {renderBackground()}
          
          <div className="container h-full mx-auto pb-[10px] lg:pb-[120px] pl-[10px] pr-[10px] 2xl:pl-[0] 2xl:pr-[0] relative z-10">
            <div className="flex flex-wrap items-end h-full">
              <div className="w-full flex flex-col">
                <div className="p-[20px] lg:p-[30px] rounded-[8px] bg-[#08090D]/10 backdrop-blur-[30px] w-full xl:w-[620px]">
                  {bannerTopTitle && (
                    <div
                      ref={topTitleRef}
                      className="top-title text-white mb-[20px]"
                    >
                      {bannerTopTitle}
                    </div>
                  )}
                  {bannerTitle && (
                    <div
                      ref={titleRef}
                      className="heading-h1 text-white mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope"
                    >
                      {bannerTitle}
                    </div>
                  )}

                  {bannerDescription && (
                    <p
                      ref={descriptionRef}
                      className="text-white font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-medium"
                    >
                      {bannerDescription}
                    </p>
                  )}

                  {bannerButtonURL && (
                    <Link
                      ref={buttonRef}
                      href={bannerButtonURL}
                      className="primary-button text-[14px] lg:text-[16px] leading-4.5 font-medium lg:leading-5.5 max-h-12.5"
                    >
                      <span>{bannerButtonTitle}</span>
                      <svg
                        className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_456_280)">
                          <path
                            d="M3.125 10H16.875"
                            stroke="#08090D"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.25 4.375L17.875 10L12.25 15.625"
                            stroke="#08090D"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_456_280">
                            <rect width={20} height={20} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}