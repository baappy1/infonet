"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection({ data }) {
    const topTitleRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const {
        top_title = "",
        title = "",
        short_description = "",
        hero_buttons = [],
        video_file = "",
        banner_image = "",
    } = data || {};

    useEffect(() => {
        const tl = gsap.timeline();

        const elements = [topTitleRef, titleRef, descriptionRef, buttonRef];

        elements.forEach((ref, index) => {
            if (ref.current) {
                gsap.set(ref.current, { opacity: 0, y: 30 });
                tl.to(
                    ref.current,
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                    index === 0 ? 0 : "-=0.4"
                );
            }
        });
    }, []);

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const renderBackground = () => {
        if (video_file) {
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
                        poster={banner_image || undefined}
                    >
                        <source src={video_file} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            );
        }

        if (banner_image) {
            return (
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${banner_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            );
        }

        return null;
    };

    return (
        <div className="banner pt-[10px] pl-[10px] pr-[10px] h-screen lg:min-h-[720px]">
            <div className="h-full rounded-[8px] relative overflow-hidden">
                {renderBackground()}

                <div className="container h-full mx-auto pb-[10px] lg:pb-[120px] pl-[10px] pr-[10px] 2xl:pl-[0] 2xl:pr-[0] relative z-10">
                    <div className="flex flex-wrap items-end h-full">
                        <div className="w-full flex flex-col">
                            <div className="p-[20px] lg:p-[30px] rounded-[8px] bg-[#08090D]/10 backdrop-blur-[30px] w-full xl:w-[620px]">
                                {top_title && (
                                    <div
                                        ref={topTitleRef}
                                        className="top-title text-white mb-[20px]"
                                    >
                                        {top_title}
                                    </div>
                                )}
                                {title && (
                                    <div
                                        ref={titleRef}
                                        className="heading-h1 text-white mb-[20px] text-[36px] leading-[40px] xl:text-[50px] xl:leading-[60px] font-manrope"
                                    >
                                        {title}
                                    </div>
                                )}

                                {short_description && (
                                    <p
                                        ref={descriptionRef}
                                        className="text-white font-manrope mb-[20px] text-[14px] lg:text-[16px] leading-[20px] lg:leading-[22px] font-medium"
                                    >
                                        {short_description}
                                    </p>
                                )}

                                {hero_buttons && hero_buttons.length > 0 && (
                                    <div ref={buttonRef} className="flex flex-wrap gap-3">
                                        {hero_buttons.map((btn, index) => (
                                            <Link
                                                key={btn._id || index}
                                                href={btn.button_url || "#"}
                                                className="primary-button text-[14px] lg:text-[16px] leading-4.5 font-medium lg:leading-5.5 max-h-12.5"
                                            >
                                                <span>{btn.button_text}</span>
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
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
