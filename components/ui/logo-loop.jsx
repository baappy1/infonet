import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) => (typeof value === "number" ? `${value}px` : value ?? undefined);

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach((img) => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  seqHeight,
  isHovered,
  hoverSpeed,
  isVertical,
  impulseRef
) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        if (impulseRef?.current) {
          offsetRef.current += impulseRef.current;
          impulseRef.current = 0;
        }

        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, impulseRef]);
};

export const LogoLoop = memo(function LogoLoop({
  logos,
  rowLogos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
  rows = 1,
  rowVelocities,
  numCopies,
  scrollOnWheel = false,
  wheelFactor = 0.5,
}) {
  const resolvedRows = Math.max(1, Number(rows) || 1);
  const effectiveRowLogos = Array.isArray(rowLogos) ? rowLogos : null;

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const cssVariables = useMemo(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
    }),
    [gap, logoHeight, fadeOutColor]
  );

  const renderLogoItem = useCallback(
    (item, key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = item && Object.prototype.hasOwnProperty.call(item, "node");
      const content = isNodeItem ? (
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );

      const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;
      const itemContent = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={itemAriaLabel || "logo link"}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {itemContent}
        </li>
      );
    },
    [renderItem]
  );

  const containerStyle = useMemo(
    () => ({
      width: toCssLength(width) ?? "100%",
      ...cssVariables,
      ...style,
    }),
    [width, cssVariables, style]
  );

  return (
    <div
      className={["logoloop", "logoloop--horizontal", fadeOut && "logoloop--fade", scaleOnHover && "logoloop--scale-hover", className]
        .filter(Boolean)
        .join(" ")}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col">
        {Array.from({ length: resolvedRows }, (_, rowIndex) => {
          const rowItems = effectiveRowLogos?.[rowIndex] ?? logos ?? [];
          const rowSpeed =
            Array.isArray(rowVelocities) && rowVelocities[rowIndex] !== undefined
              ? rowVelocities[rowIndex]
              : speed;

          return (
            <LogoLoopRow
              // eslint-disable-next-line react/no-array-index-key
              key={rowIndex}
              logos={rowItems}
              speed={rowSpeed}
              direction={direction}
              gap={gap}
              logoHeight={logoHeight}
              pauseOnHover={pauseOnHover}
              effectiveHoverSpeed={effectiveHoverSpeed}
              renderLogoItem={renderLogoItem}
              numCopies={numCopies}
              scrollOnWheel={scrollOnWheel}
              wheelFactor={wheelFactor}
            />
          );
        })}
      </div>
    </div>
  );
});

export default LogoLoop;

function LogoLoopRow({
  logos,
  speed,
  direction,
  gap,
  logoHeight,
  pauseOnHover,
  effectiveHoverSpeed,
  renderLogoItem,
  numCopies,
  scrollOnWheel,
  wheelFactor,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const wheelImpulseRef = useRef(0);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    if (typeof numCopies === "number" && Number.isFinite(numCopies) && numCopies >= 2) {
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.floor(numCopies)));
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      if (sequenceWidth > 0) setSeqWidth(Math.ceil(sequenceWidth));
      return;
    }

    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect?.();
    const sequenceWidth = sequenceRect?.width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [numCopies]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, numCopies]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, numCopies]);

  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    0,
    isHovered,
    effectiveHoverSpeed,
    false,
    wheelImpulseRef
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);
  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const handleWheel = useCallback(
    (e) => {
      if (!scrollOnWheel) return;
      // Make the loop feel like a draggable/scrollable marquee.
      e.preventDefault();
      const factor = typeof wheelFactor === "number" ? wheelFactor : 0.5;
      const delta = e.deltaY || e.deltaX || 0;
      // direction="left" means positive velocity moves content left (offset increases).
      wheelImpulseRef.current += delta * factor;
    },
    [scrollOnWheel, wheelFactor]
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem]
  );

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      style={scrollOnWheel ? { overscrollBehavior: "contain" } : undefined}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
}

