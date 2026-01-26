'use client';
import WhyWorkCard from "./WhyWorkCard"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function WhyWork() {
    const topTitleRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardsRef = useRef(null);

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

    return(
        <>
            <div className="pt-22 lg:pt-35 pb-22 lg:pb-35 bg-[#fff]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
                    <div className="w-full sm:w-164.75">
                        <div ref={topTitleRef} className="top-title mb-5">
                            [ Why Work Here ]                         
                        </div>
                        <h2 ref={titleRef} className="heading-h2 mb-5">
                            A Place Where Innovation Meets Real-World Influence
                        </h2>
                        <p ref={descriptionRef} className="paragraph-text">At InfoNet, you're not just building software — you're shaping the technology that powers fuel stations, retail stores, and critical infrastructure across North America. Your ideas, your code, and your decisions make a measurable impact every single day.</p>
                    </div>
                    <div ref={cardsRef} className="flex flex-wrap mt-6 sm:mt-20">
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b sm:border-r last:border-b-0 lg:last:border-r-0" />
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b lg:border-r last:border-b-0 lg:last:border-r-0" />
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b last:border-b-0 sm:border-r lg:border-r-0" />
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 lg:border-r last:border-b-0 lg:last:border-r-0" />
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 sm:border-r" />
                        <WhyWorkCard className="w-full sm:w-1/2 lg:w-1/3 border-dashed border-[#08090D33] border-b sm:border-b lg:border-b-0 lg:last:border-r-0" />
                    </div>

                </div>
            </div>
        </>
    )
}
