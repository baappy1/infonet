"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import WhyWorkCard from "./WhyWorkCard";

const DEFAULT_FEATURES = [
  { image: "/assets/career/work/01.png", title: "Collaborate with Experts", description: "At InfoNet, we don't just write software — we build the backbone of modern fueling and retail operations." },
  { image: "/assets/career/work/02.png", title: "Impact and Scale", description: "Our solutions power thousands of modules, support tens of thousands of daily transactions." },
  { image: "/assets/career/work/03.png", title: "Continuous Learning", description: "Technology evolves — and so do we. At InfoNet, you'll have opportunities to expand your skills through ongoing training, mentorship." },
  { image: "/assets/career/work/04.png", title: "Ownership & Autonomy", description: "You'll own meaningful work here. Whether you're a developer or support engineer, you'll have direct influence on customers' success." },
  { image: "/assets/career/work/05.png", title: "Work Life & Flexibility", description: "We believe in balance. We offer flexible working arrangements, hybrid or remote possibilities, and encourage a healthy life-work integration." },
  { image: "/assets/career/work/06.png", title: "Good vibes, great people", description: "Even though we work apart, our culture is what keeps us close. The spirit of Infonet is in everything we do." },
];

const CARD_CLASSES = [
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b sm:border-r last:border-b-0 lg:last:border-r-0",
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b lg:border-r last:border-b-0 lg:last:border-r-0",
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b last:border-b-0 sm:border-r lg:border-r-0",
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 lg:border-r last:border-b-0 lg:last:border-r-0",
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 sm:border-r",
  "w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 lg:last:border-r-0",
];

export default function WhyWork({
  topTitle = "[ Why Work Here ]",
  title = "A Place Where Innovation Meets Real-World Influence",
  shortDescription = "At InfoNet, you're not just building software — you're shaping the technology that powers fuel stations, retail stores, and critical infrastructure across North America. Your ideas, your code, and your decisions make a measurable impact every single day.",
  features = DEFAULT_FEATURES,
}) {
  const topTitleRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);
  const list = Array.isArray(features) && features.length > 0 ? features : DEFAULT_FEATURES;

  useEffect(() => {
    const tl = gsap.timeline();
    if (topTitleRef.current) {
      gsap.set(topTitleRef.current, { opacity: 0, y: 30 });
      tl.to(topTitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
    }
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { opacity: 0, y: 30 });
      tl.to(cards, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }, "-=0.4");
    }
  }, []);

  return (
    <div className="bg-[#f8f8f3] px-2.5 pt-2.5">
      <div className="pt-22 lg:pt-35 pb-22 lg:pb-35 bg-[#ffffff] rounded-lg">
        <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5 ">
          <div className="w-full sm:w-164.75">
            <div ref={topTitleRef} className="top-title mb-5">{topTitle}</div>
            <h2 ref={titleRef} className="heading-h2 mb-5">{title}</h2>
            <p ref={descriptionRef} className="paragraph-text">{shortDescription}</p>
          </div>
          <div ref={cardsRef} className="flex flex-wrap mt-6 sm:mt-20">
            {list.map((f, i) => (
              <WhyWorkCard
                key={i}
                className={CARD_CLASSES[i % CARD_CLASSES.length]}
                title={f.title}
                description={f.description}
                image={f.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
