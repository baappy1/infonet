"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const borderRef = useRef(null);
  const borderFillRef = useRef(null);

  useEffect(() => {
    const stepsContainer =
      sectionRef.current?.querySelector(".steps-container");
    if (!stepsContainer) return;

    const stepEls = Array.from(
      stepsContainer.querySelectorAll('[id^="step-"]'),
    );
    const dotEls = stepEls
      .map((el) => el.querySelector("span"))
      .filter(Boolean);
    const cardEls = Array.from(
      sectionRef.current?.querySelectorAll("[data-card]") ?? [],
    );
    const totalSteps = stepEls.length || 6;

    const ctx = gsap.context(() => {
      // Clear any existing animations
      gsap.killTweensOf(cardEls);

      // Set initial states
      gsap.set(dotEls, { backgroundColor: "#fff" });
      const firstDot = stepsContainer.querySelector("#step-1 span");
      if (firstDot) gsap.set(firstDot, { backgroundColor: "#EBFF3A" });

      // Initialize border
      if (borderFillRef.current)
        gsap.set(borderFillRef.current, { height: "0%" });
      if (borderRef.current) {
        borderRef.current.style.borderLeftColor = "#08090D33";
        borderRef.current.style.borderLeftStyle = "dashed";
      }

      // Define the top positions for each position in the stack
      const topPositions = [11, 22, 33, 44, 55, 66]; // px values

      // Initialize all cards with step 1 as active
      cardEls.forEach((card, index) => {
        const step = Number(card.getAttribute("data-step") ?? index + 1);
        // For initial state (step 1 active), card with step 1 is at position 6 (top 66px)
        // Other cards fill positions 1-5 based on their step
        if (step === 1) {
          card.style.top = `${topPositions[5]}px`; // 66px
          card.style.zIndex = "6";
          card.classList.add("is-active-card");
        } else {
          card.style.top = `${topPositions[step - 2]}px`; // step 2 gets 11px, step 3 gets 22px, etc.
          card.style.zIndex = String(step - 1); // step 2 gets z-index 1, step 3 gets 2, etc.
          card.classList.remove("is-active-card");
        }
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.pointerEvents = step === 1 ? "auto" : "none";
      });

      // Fast setter for border height
      const setBorderHeight = borderFillRef.current
        ? gsap.quickSetter(borderFillRef.current, "height")
        : null;

      let activeStep = 1;

      const rearrangeCards = (activeStepNumber) => {
        // Create an array of steps in the new order
        // Active card goes to the back (position 6), others fill positions 1-5
        const stepsInOrder = [];

        // Add all steps except active
        for (let i = 1; i <= totalSteps; i++) {
          if (i !== activeStepNumber) {
            stepsInOrder.push(i);
          }
        }

        // Add active step at the end (position 6)
        stepsInOrder.push(activeStepNumber);

        // Apply positions to cards
        cardEls.forEach((card) => {
          const step = Number(card.getAttribute("data-step") ?? 0);
          if (!step) return;

          const positionIndex = stepsInOrder.indexOf(step);
          const isActive = step === activeStepNumber;

          // Animate to new position
          gsap.to(card, {
            top: `${topPositions[positionIndex]}px`,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });

          // Set z-index (position in array + 1 for 1-indexed z-index)
          card.style.zIndex = String(positionIndex + 1);

          // Update active class and pointer events
          card.classList.toggle("is-active-card", isActive);
          card.style.pointerEvents = isActive ? "auto" : "none";
        });
      };

      const setActiveStep = (nextStep) => {
        if (nextStep === activeStep) return;
        activeStep = nextStep;

        // Update dots
        gsap.to(dotEls, {
          backgroundColor: "#fff",
          duration: 0.2,
          overwrite: "auto",
          ease: "power2.out",
        });
        const currentDot = stepsContainer.querySelector(
          `#step-${nextStep} span`,
        );
        if (currentDot) {
          gsap.to(currentDot, {
            backgroundColor: "#EBFF3A",
            duration: 0.25,
            overwrite: "auto",
            ease: "power2.out",
          });
        }

        // Rearrange cards
        rearrangeCards(nextStep);
      };

      ScrollTrigger.create({
        trigger: stepsContainer,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Update border
          if (setBorderHeight) setBorderHeight(`${p * 100}%`);
          if (borderRef.current && p > 0) {
            borderRef.current.style.borderLeftColor = "#08090D";
            borderRef.current.style.borderLeftStyle =
              p > 0.5 ? "solid" : "dashed";
          }

          // Calculate current step
          const nextStep = Math.min(
            totalSteps,
            Math.max(1, Math.round(p * (totalSteps - 1) + 1)),
          );
          setActiveStep(nextStep);
        },
        onRefresh: (self) => {
          const p = self.progress;
          const nextStep = Math.min(
            totalSteps,
            Math.max(1, Math.round(p * (totalSteps - 1) + 1)),
          );
          setActiveStep(nextStep);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20 lg:pt-55 pb-20 lg:pb-55">
      <div className="container lg:pr-0 lg:pl-0 pr-5 pl-5">
        <div className="w-full lg:w-[40.7%] sm:mb-0 mb-20">
          <div className="top-title mb-5">[ Process ]</div>
          <h2 className="heading-h2 mb-5">
            How We Guide You From Start to Finish
          </h2>
          <p className="paragraph-text mb-5">
            We follow a proven, transparent process that keeps your project
            moving efficiently and ensures every detail is handled with care.
          </p>
        </div>

        <div
          className="flex md:flex-row flex-col mt-20 flex-wrap gap-[6%] justify-between"
          ref={sectionRef}
        >
          {/* Left Column - Steps List */}
          <div className="w-full md:w-[44.5%] relative mb-10 pl-10 steps-container">
            {/* Base dashed border */}
            <div
              ref={borderRef}
              className="absolute top-0 left-0 h-full w-[1px] border-l border-dashed border-[#08090D33] transition-all duration-500"
            />

            {/* Solid border overlay that grows */}
            <div
              ref={borderFillRef}
              className="absolute top-0 left-[-1px] h-0 w-[1px] bg-[#08090D] transition-all duration-500"
              style={{ height: "0%" }}
            />

            {/* Steps content */}
            <div className="relative z-10">
              {/* Step 1 - Consultation */}
              <div className="relative mb-22 md:mb-42.5" id="step-1">
                <span className="w-5.25 h-5.25 border bg-[#EBFF3A] border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5 leading-5.5">
                  Consultation
                </h4>
                <p className="font-manrope font-medium leading-5.5 text-[#08090D]/80">
                  We begin by learning about your site, your operational
                  challenges, and the outcomes you want to achieve. This helps
                  us determine the right hardware, software, and setup approach
                  for your environment.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-01.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>

              {/* Step 2 - Planning & Coordination */}
              <div className="relative mb-22 md:mb-42.5" id="step-2">
                <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5">
                  Planning & Coordination
                </h4>
                <p className="font-manrope medium">
                  We begin by learning about your site, your operational
                  challenges, and the outcomes you want to achieve. This helps
                  us determine the right hardware, software, and setup approach
                  for your environment.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-02.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>

              {/* Step 3 - Deployment */}
              <div className="relative mb-22 md:mb-42.5" id="step-3">
                <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5">Deployment</h4>
                <p className="font-manrope medium">
                  We begin by learning about your site, your operational
                  challenges, and the outcomes you want to achieve. This helps
                  us determine the right hardware, software, and setup approach
                  for your environment.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-03.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>

              {/* Step 4 - Training / Verification */}
              <div className="relative mb-22 md:mb-42.5" id="step-4">
                <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5">
                  Training / Verification
                </h4>
                <p className="font-manrope medium">
                  On your first day of operation with the new system, we provide
                  guidance and support to help everything run smoothly. This
                  includes monitoring performance and helping your team with
                  early-stage questions.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-04.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>

              {/* Step 5 - Ongoing Support */}
              <div className="relative mb-22 md:mb-42.5" id="step-5">
                <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5">
                  Ongoing Support
                </h4>
                <p className="font-manrope medium">
                  After deployment, we remain available for continuous technical
                  assistance, remote troubleshooting, maintenance, and updates.
                  Our goal is to help your operation stay reliable and efficient
                  long-term.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-05.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>

              {/* Step 6 - Go-Live Optimization */}
              <div className="relative" id="step-6">
                <span className="w-5.25 h-5.25 border bg-white border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20"></span>
                <h4 className="uppercase mb-6 font-bold mt-2.5">
                  Go-Live Optimization
                </h4>
                <p className="font-manrope medium">
                  After deployment, we remain available for continuous technical
                  assistance, remote troubleshooting, maintenance, and updates.
                  Our goal is to help your operation stay reliable and efficient
                  long-term.
                </p>
                <Image
                  src="/assets/service-details/thumbnail-06.png"
                  alt=""
                  width={600}
                  height={600}
                  className="w-full h-auto md:hidden mt-7"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="md:block hidden w-[49.2%] sticky top-0 self-start">
            <div className="relative h-[600px] isolate">
              {[
                {
                  step: 1,
                  src: "/assets/service-details/thumbnail-01.png",
                  alt: "Consultation Process Diagram",
                },
                {
                  step: 2,
                  src: "/assets/service-details/thumbnail-02.png",
                  alt: "Planning & Coordination Process Diagram",
                },
                {
                  step: 3,
                  src: "/assets/service-details/thumbnail-03.png",
                  alt: "Deployment Process Diagram",
                },
                {
                  step: 4,
                  src: "/assets/service-details/thumbnail-04.png",
                  alt: "Training Process Diagram",
                },
                {
                  step: 5,
                  src: "/assets/service-details/thumbnail-05.png",
                  alt: "Ongoing Support Process Diagram",
                },
                {
                  step: 6,
                  src: "/assets/service-details/thumbnail-06.png",
                  alt: "Go-Live Optimization Process Diagram",
                },
              ].map(({ step, src, alt }) => (
                <div
                  key={step}
                  className="absolute stacked-image left-0 w-full transition-all duration-500 ease-out"
                  style={{ top: "11px" }} // Initial top, will be overridden by GSAP
                  data-card
                  data-step={step}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 md:mt-42.5">
          <button className="flex items-center bg-[#EBFF3A] px-4 py-3 gap-2.5 font-jetbrains uppercase font-medium text-sm leading-4.5 text-[#08090D] rounded cursor-pointer">
            Request a Demo{" "}
            <Image
              src="/assets/service-details/arrow-right.svg"
              width={16}
              height={16}
              alt="right arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
