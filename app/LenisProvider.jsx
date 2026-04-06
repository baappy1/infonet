"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getAnchorTarget(hash) {
  if (!hash || hash === "#") return null;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return null;
  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return document.getElementById(id);
  }
}

export default function LenisProvider({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const rafIdRef = useRef(0);
  const isFirstPathnameEffect = useRef(true);

  useEffect(() => {
    if (isFirstPathnameEffect.current) {
      isFirstPathnameEffect.current = false;
      return;
    }

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.08,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = window.requestAnimationFrame(raf);
    };

    rafIdRef.current = window.requestAnimationFrame(raf);

    const scrollToHash = (hash) => {
      const target = getAnchorTarget(hash);
      if (!target) return;
      lenis.scrollTo(target, { offset: 0 });
    };

    // Initial hash scroll after first paint (and after Lenis is ready)
    if (window.location.hash) {
      window.requestAnimationFrame(() => scrollToHash(window.location.hash));
    }

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    const onDocumentClick = (e) => {
      // Only left clicks, no modifiers
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target?.closest?.("a[href^='#']");
      if (!a) return;

      const href = a.getAttribute("href");
      const target = getAnchorTarget(href);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", href);
      lenis.scrollTo(target, { offset: 0 });
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick);
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return children;
}

