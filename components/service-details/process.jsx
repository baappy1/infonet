"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ProcessSection = () => {
    const sectionRef = useRef(null);
    const borderRef = useRef(null);
    const borderFillRef = useRef(null);

    useEffect(() => {
        // Function to activate a specific step
        const activateStep = (stepNumber) => {
            // Update all dots to white
            gsap.to('[id^="step-"] span', {
                backgroundColor: '#fff',
                duration: 0.3,
                ease: "power2.out"
            });

            // Update current dot to yellow
            const currentDot = document.querySelector(`#step-${stepNumber} span`);
            if (currentDot) {
                gsap.to(currentDot, {
                    backgroundColor: '#EBFF3A',
                    duration: 0.3,
                    ease: "power2.out"
                });
            }

            // Hide all images
            gsap.to('[data-image]', {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    // Show current image
                    const currentImage = document.querySelector(`[data-image="step-${stepNumber}"]`);
                    if (currentImage) {
                        gsap.to(currentImage, {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                }
            });

            // Update border based on step
            updateBorder(stepNumber);
        };

        // Function to update border based on step progress
        const updateBorder = (stepNumber) => {
            const totalSteps = 6;
            const progress = (parseInt(stepNumber) - 1) / (totalSteps - 1); // 0 to 1

            if (borderFillRef.current) {
                // Animate the height of the solid border overlay
                gsap.to(borderFillRef.current, {
                    height: `${progress * 100}%`,
                    duration: 0.5,
                    ease: "power2.out"
                });

                // Change border style from dashed to solid gradually
                if (progress > 0) {
                    gsap.to(borderRef.current, {
                        borderLeftColor: '#08090D',
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            }
        };

        // Initialize GSAP ScrollTrigger
        const setupScrollAnimation = () => {
            // Set initial state: only first image visible
            gsap.set('[data-image]', { opacity: 0 });
            gsap.set('[data-image="step-1"]', { opacity: 1 });

            // Initial border state
            if (borderFillRef.current) {
                gsap.set(borderFillRef.current, { height: '0%' });
            }

            // Get all step elements
            const stepElements = document.querySelectorAll('[id^="step-"]');

            // Create ScrollTrigger for each step
            stepElements.forEach((step, index) => {
                const stepNumber = step.id.split('-')[1];

                ScrollTrigger.create({
                    trigger: step,
                    start: "top 70%",
                    end: "bottom 30%",
                    onEnter: () => activateStep(stepNumber),
                    onEnterBack: () => activateStep(stepNumber),
                });
            });

            // Create continuous border animation
            createContinuousBorderAnimation();
        };

        // Function for smooth continuous border animation
        const createContinuousBorderAnimation = () => {
            const stepsContainer = document.querySelector('.steps-container');
            if (!stepsContainer) return;

            // Create a scroll timeline for the border
            gsap.timeline({
                scrollTrigger: {
                    trigger: stepsContainer,
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        if (borderFillRef.current) {
                            // Update the height of the solid border
                            gsap.to(borderFillRef.current, {
                                height: `${progress * 100}%`,
                                duration: 0.1
                            });

                            // Update border color based on progress
                            if (progress > 0) {
                                borderRef.current.style.borderLeftColor = '#08090D';
                                // Optional: Gradually change from dashed to solid
                                if (progress > 0.5) {
                                    borderRef.current.style.borderLeftStyle = 'solid';
                                }
                            }
                        }
                    }
                }
            });
        };

        setupScrollAnimation();

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='container hidden'>
            <div className="flex flex-wrap gap-[6%] justify-between" ref={sectionRef}>
                {/* Left Column - Steps List */}
                <div className="w-[44.5%] relative mb-10 pl-10 steps-container">
                    {/* Base dashed border */}
                    <div
                        ref={borderRef}
                        className="absolute top-0 left-0 h-full w-[1px] border-l border-dashed border-[#08090D33] transition-all duration-500"
                    />

                    {/* Solid border overlay that grows */}
                    <div
                        ref={borderFillRef}
                        className="absolute top-0 left-[-1px] h-0 w-[1px] bg-[#08090D] transition-all duration-500"
                        style={{ height: '0%' }}
                    />

                    {/* Steps content */}
                    <div className="relative z-10">
                        {/* Step 1 - Consultation */}
                        <div className="relative mb-42.5" id="step-1">
                            <span className="w-5.25 h-5.25 border bg-[#EBFF3A] border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Consultation</h4>
                            <p className="font-manrope medium">We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.</p>
                        </div>

                        {/* Step 2 - Planning & Coordination */}
                        <div className="relative mb-42.5" id="step-2">
                            <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Planning & Coordination</h4>
                            <p className="font-manrope medium">We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.</p>
                        </div>

                        {/* Step 3 - Deployment */}
                        <div className="relative mb-42.5" id="step-3">
                            <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Deployment</h4>
                            <p className="font-manrope medium">We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.</p>
                        </div>

                        {/* Step 4 - Training / Verification */}
                        <div className="relative mb-42.5" id="step-4">
                            <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Training / Verification</h4>
                            <p className="font-manrope medium">On your first day of operation with the new system, we provide guidance and support to help everything run smoothly. This includes monitoring performance and helping your team with early-stage questions.</p>
                        </div>

                        {/* Step 5 - Ongoing Support */}
                        <div className="relative mb-42.5" id="step-5">
                            <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Ongoing Support</h4>
                            <p className="font-manrope medium">After deployment, we remain available for continuous technical assistance, remote troubleshooting, maintenance, and updates. Our goal is to help your operation stay reliable and efficient long-term.</p>
                        </div>

                        {/* Step 6 - Go-Live Optimization */}
                        <div className="relative" id="step-6">
                            <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                            <h4 className="uppercase mb-6 font-bold mt-2.5">Go-Live Optimization</h4>
                            <p className="font-manrope medium">After deployment, we remain available for continuous technical assistance, remote troubleshooting, maintenance, and updates. Our goal is to help your operation stay reliable and efficient long-term.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Images */}
                <div className="w-[49.2%] relative" style={{ height: '600px' }}>
                    {/* Image for Step 1 */}
                    <Image
                        src="/assets/service-details/thumbnail-01.png"
                        alt="Consultation Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-1"
                    />

                    {/* Image for Step 2 */}
                    <Image
                        src="/assets/service-details/thumbnail-02.png"
                        alt="Planning & Coordination Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-2"
                        style={{ opacity: 0 }}
                    />

                    {/* Image for Step 3 */}
                    <Image
                        src="/assets/service-details/thumbnail-03.png"
                        alt="Deployment Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-3"
                        style={{ opacity: 0 }}
                    />

                    {/* Image for Step 4 */}
                    <Image
                        src="/assets/service-details/thumbnail-04.png"
                        alt="Training Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-4"
                        style={{ opacity: 0 }}
                    />

                    {/* Image for Step 5 */}
                    <Image
                        src="/assets/service-details/thumbnail-05.png"
                        alt="Ongoing Support Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-5"
                        style={{ opacity: 0 }}
                    />

                    {/* Image for Step 6 */}
                    <Image
                        src="/assets/service-details/thumbnail-06.png"
                        alt="Go-Live Optimization Process Diagram"
                        width={600}
                        height={600}
                        className="w-full h-auto absolute top-0 left-0"
                        data-image="step-6"
                        style={{ opacity: 0 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProcessSection;