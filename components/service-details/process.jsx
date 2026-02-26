"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_STEPS = [
  {
    step: 1,
    title: "Consultation",
    description:
      "We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.",
    image: "/assets/service-details/thumbnail-01.png",
  },
  {
    step: 2,
    title: "Planning & Coordination",
    description:
      "We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.",
    image: "/assets/service-details/thumbnail-02.png",
  },
  {
    step: 3,
    title: "Deployment",
    description:
      "We begin by learning about your site, your operational challenges, and the outcomes you want to achieve. This helps us determine the right hardware, software, and setup approach for your environment.",
    image: "/assets/service-details/thumbnail-03.png",
  },
  {
    step: 4,
    title: "Training / Verification",
    description:
      "On your first day of operation with the new system, we provide guidance and support to help everything run smoothly. This includes monitoring performance and helping your team with early-stage questions.",
    image: "/assets/service-details/thumbnail-04.png",
  },
  {
    step: 5,
    title: "Ongoing Support",
    description:
      "After deployment, we remain available for continuous technical assistance, remote troubleshooting, maintenance, and updates. Our goal is to help your operation stay reliable and efficient long-term.",
    image: "/assets/service-details/thumbnail-05.png",
  },
  {
    step: 6,
    title: "Go-Live Optimization",
    description:
      "After deployment, we remain available for continuous technical assistance, remote troubleshooting, maintenance, and updates. Our goal is to help your operation stay reliable and efficient long-term.",
    image: "/assets/service-details/thumbnail-06.png",
  },
];

const ProcessSection = ({
  topTitle = "[ Process ]",
  title = "How We Guide You From Start to Finish",
  shortDescription = "We follow a proven, transparent process that keeps your project moving efficiently and ensures every detail is handled with care.",
  processSteps,
}) => {
  const sectionRef = useRef(null);
  const borderRef = useRef(null);
  const borderFillRef = useRef(null);

  const steps =
    Array.isArray(processSteps) && processSteps.length > 0
      ? processSteps.map((s, i) => ({
          step: i + 1,
          title: s.step_title || "",
          description: (s.step_description || "").trim(),
          image:
            s.feature_image ||
            `/assets/service-details/thumbnail-0${(i % 6) + 1}.png`,
        }))
      : DEFAULT_STEPS;

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

      // Fixed sequence: front=66px/scale 1, back: 11px/0.86, 24.75px/0.9, 38.5px/0.93, 52.25px/0.96, 59.125px/0.98
      const CARD_POSITIONS = [
        { top: 11, scale: 0.86 },
        { top: 24.75, scale: 0.9 },
        { top: 38.5, scale: 0.93 },
        { top: 52.25, scale: 0.96 },
        { top: 59.125, scale: 0.98 },
        { top: 66, scale: 1 },
      ];
      const topPositions = [];
      const scalePositions = [];
      for (let i = 0; i < totalSteps; i++) {
        if (i === totalSteps - 1) {
          topPositions.push(66);
          scalePositions.push(1);
        } else {
          const p = CARD_POSITIONS[Math.min(i, CARD_POSITIONS.length - 2)];
          topPositions.push(p.top);
          scalePositions.push(p.scale);
        }
      }

      // QuickSetters for scroll-synced card positions (no gsap.to duration)
      const cardTopSetters = cardEls.map((card) =>
        gsap.quickSetter(card, "top", "px"),
      );
      const cardScaleSetters = cardEls.map((card) =>
        gsap.quickSetter(card, "scale"),
      );

      const applyCardPosition = (card, idx, topVal, scaleVal) => {
        cardTopSetters[idx](topVal);
        cardScaleSetters[idx](scaleVal);
      };

      // Initialize: step 1 at front (66px, scale 1), others cascade per sequence
      let initBackIdx = 0;
      cardEls.forEach((card, index) => {
        const step = Number(card.getAttribute("data-step") ?? index + 1);
        const isActive = step === 1;
        const posIdx = isActive ? totalSteps - 1 : initBackIdx++;
        const pos = Math.min(posIdx, totalSteps - 1);
        const topVal = topPositions[pos] ?? 66;
        const scaleVal = scalePositions[pos] ?? 1;
        applyCardPosition(card, index, topVal, scaleVal);
        card.style.zIndex = String(isActive ? totalSteps + 1 : step);
        card.classList.toggle("is-active-card", isActive);
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.pointerEvents = isActive ? "auto" : "none";
      });

      // Fast setter for border height
      const setBorderHeight = borderFillRef.current
        ? gsap.quickSetter(borderFillRef.current, "height")
        : null;

      let activeStep = 1;
      let prevActiveStep = 1;

      const setActiveStep = (nextStep) => {
        if (nextStep === activeStep) return;
        activeStep = nextStep;

        gsap.set(dotEls, { backgroundColor: "#fff" });
        const currentDot = stepsContainer.querySelector(
          `#step-${nextStep} span`,
        );
        if (currentDot) gsap.set(currentDot, { backgroundColor: "#EBFF3A" });
      };

      // Full assignment: used for init and onRefresh (e.g. when resizing or mid-scroll)
      const assignAllCardsFromStep = (step) => {
        let backPosIdx = 0;
        cardEls.forEach((card, idx) => {
          const s = Number(card.getAttribute("data-step") ?? 0);
          if (!s) return;
          const isActive = s === step;
          const posIdx = isActive ? totalSteps - 1 : backPosIdx++;
          const pos = Math.min(posIdx, totalSteps - 1);
          const topVal = topPositions[pos] ?? 66;
          const scaleVal = scalePositions[pos] ?? 1;
          applyCardPosition(card, idx, topVal, scaleVal);
          card.style.zIndex = isActive ? String(totalSteps + 1) : String(s);
          card.classList.toggle("is-active-card", isActive);
          card.style.pointerEvents = isActive ? "auto" : "none";
        });
      };

      // Swap-only: when step changes, swap prev front card with new active card
      const swapCardsOnStepChange = (nextStep) => {
        if (nextStep === prevActiveStep) return;

        const prevCardIdx = prevActiveStep - 1;
        const nextCardIdx = nextStep - 1;
        const prevCard = cardEls[prevCardIdx];
        const nextCard = cardEls[nextCardIdx];
        if (!prevCard || !nextCard) return;

        // Back list when prevActiveStep was front: [1..prev-1, prev+1..n]
        // nextStep's index = nextStep > prevActiveStep ? nextStep - 2 : nextStep - 1
        const newActiveBackPosIdx =
          nextStep > prevActiveStep ? nextStep - 2 : nextStep - 1;
        const backPos = Math.min(newActiveBackPosIdx, totalSteps - 2);
        const frontPos = totalSteps - 1;

        // Swap: prev front -> back position, new active -> front
        const backTop = topPositions[backPos] ?? 11;
        const backScale = scalePositions[backPos] ?? 0.86;
        const frontTop = topPositions[frontPos] ?? 66;
        const frontScale = scalePositions[frontPos] ?? 1;

        applyCardPosition(prevCard, prevCardIdx, backTop, backScale);
        applyCardPosition(nextCard, nextCardIdx, frontTop, frontScale);

        prevCard.style.zIndex = String(prevActiveStep);
        nextCard.style.zIndex = String(totalSteps + 1);
        prevCard.classList.remove("is-active-card");
        nextCard.classList.add("is-active-card");
        prevCard.style.pointerEvents = "none";
        nextCard.style.pointerEvents = "auto";

        prevActiveStep = nextStep;
      };

      ScrollTrigger.create({
        trigger: stepsContainer,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          if (setBorderHeight) setBorderHeight(`${p * 100}%`);
          if (borderRef.current && p > 0) {
            borderRef.current.style.borderLeftColor = "#08090D";
            borderRef.current.style.borderLeftStyle =
              p > 0.5 ? "solid" : "dashed";
          }

          const nextStep = Math.min(
            totalSteps,
            Math.max(1, Math.round(p * (totalSteps - 1) + 1)),
          );
          setActiveStep(nextStep);
          swapCardsOnStepChange(nextStep);
        },
        onRefresh: (self) => {
          const p = self.progress;
          const nextStep = Math.min(
            totalSteps,
            Math.max(1, Math.round(p * (totalSteps - 1) + 1)),
          );
          setActiveStep(nextStep);
          prevActiveStep = nextStep;
          assignAllCardsFromStep(nextStep);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div className="pt-20 lg:pt-55 pb-20 lg:pb-55">
      <div className="container lg:px-0 px-5 xl:px-5 2xl:px-0">
        <div className="w-full lg:w-[40.7%] sm:mb-0 mb-20">
          <div className="top-title mb-5">{topTitle}</div>
          <h2 className="heading-h2 mb-5">{title}</h2>
          <p className="paragraph-text mb-5">{shortDescription}</p>
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
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative ${i < steps.length - 1 ? "mb-22 md:mb-42.5" : ""}`}
                  id={`step-${s.step}`}
                >
                  <span
                    className={`w-5.25 h-5.25 border ${s.step === 1 ? "bg-[#EBFF3A]" : "bg-white"} border-[#08090D] block absolute top-0 left-[-51px] rounded-full z-20`}
                  ></span>
                  <h4 className="uppercase mb-6 font-bold mt-2.5 leading-5.5">
                    {s.title}
                  </h4>
                  <p className="font-manrope font-medium leading-5.5 text-[#08090D]/80">
                    {s.description}
                  </p>
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={600}
                    height={600}
                    className="w-full h-auto md:hidden mt-7"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images (centered when sticky) */}
          <div className="md:flex hidden w-[49.2%] sticky top-[50%] -translate-y-1/2 self-start items-center min-h-0">
            <div className="relative h-[478px] isolate w-full">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="absolute stacked-image left-0 w-full transition-all duration-500 ease-out origin-top"
                  data-card
                  data-step={s.step}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={600}
                    height={600}
                    className="w-full h-[365px] object-cover rounded-[8px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-10 md:mt-42.5">
          <button className="flex items-center bg-[#EBFF3A] px-4 py-3 gap-2.5 font-jetbrains uppercase font-medium text-sm leading-4.5 text-[#08090D] rounded cursor-pointer hover:bg-white">
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
