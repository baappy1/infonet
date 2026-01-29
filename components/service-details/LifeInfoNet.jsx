"use client"

import { useRef, useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import LifeInfoNetCard from "./LifeInfoNetCard"


export default function LifeInfoNet() {
    const [leftOffset, setLeftOffset] = useState(0);
    const containerRef = useRef(null);
    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    );

    useEffect(() => {
        // Function to calculate left offset
        const calculateLeftOffset = () => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                // Get the left position of container relative to viewport
                const containerLeft = containerRect.left;
                // Add any padding/margin from container if needed
                const leftPadding = 20; // If container has padding of 20px
                setLeftOffset(containerLeft + leftPadding);
            }
        };

        // Calculate on initial render
        calculateLeftOffset();

        // Recalculate on window resize
        window.addEventListener('resize', calculateLeftOffset);

        // Cleanup
        return () => {
            window.removeEventListener('resize', calculateLeftOffset);
        };
    }, []);

    return (
        <>
            <div className="pt-20 lg:pt-25 bg-[#F8F8F3]">
                <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5" ref={containerRef}>
                    <div className="w-full">
                        <div className="w-full lg:w-[49.7%]">
                            <div className="top-title mb-5">
                                [ Life at InfoNet ]
                            </div>
                            <h2 className="heading-h2 mb-5">
                                Perfect for All Retail Fuel & Convenience Environments
                            </h2>
                            <p className="paragraph-text mb-10 lg:mb-20">
                                Designed for operators who need reliable installations, compatible hardware, and hands-on support.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full relative life-info-net" style={{ left: `${leftOffset}px` }}>
                    <div className='relative infonet-left left:0 2xl:-left-[20px]'>
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/01.png" title="Retail Gas Stations" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/02.png" title="Convenience Stores" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/03.png" title="Unattended Fuel Sites" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/04.png" title="Fleet Fueling Operations" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/05.png" title="First Nations Retail" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/01.png" title="Retail Gas Stations" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/02.png" title="Convenience Stores" />
                                </CarouselItem>
                                <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-1/5">
                                    <LifeInfoNetCard image="/assets/service-details/infront/03.png" title="Unattended Fuel Sites" />
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div >
        </>
    );
}