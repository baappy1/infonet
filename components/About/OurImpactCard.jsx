"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

function parseTitle(cardTitle) {
  // Handles formats like "92%", "37%", "42%", "3x"
  const match = String(cardTitle).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    return { number: parseFloat(match[1]), suffix: match[2] };
  }
  return { number: null, suffix: cardTitle };
}

function AnimatedCounter({ cardTitle }) {
  const { number, suffix } = parseTitle(cardTitle);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || number === null) return;
    hasAnimated.current = true;

    const duration = 1800; // ms
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Ease out cubic
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      const current = Math.round(progress * number);
      setDisplayValue(current);

      if (frame >= totalFrames) {
        setDisplayValue(number);
        clearInterval(counter);
      }
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, [isInView, number]);

  if (number === null) {
    return <span ref={ref}>{cardTitle}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function OurImpactCard({
  className,
  cardTitle,
  cardDescription,
}) {
  return (
    <>
      <div className={`bg-white p-4 rounded-[8px] ${className}`}>
        {cardTitle && (
          <h2 className="text-[30px] sm:text-[50px] leading-10 sm:leading-15 mb-4 font-manrope">
            <AnimatedCounter cardTitle={cardTitle} />
          </h2>
        )}
        {cardDescription && (
          <p className="text-[16px] leading-5.5 mb-0 font-medium font-manrope">
            {cardDescription}
          </p>
        )}
      </div>
    </>
  );
}
