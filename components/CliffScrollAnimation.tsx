"use client";

/**
 * CliffScrollAnimation.tsx
 *
 * Cinematic Apple-style scroll-driven frame animation for "Man on Cliff":
 * - DESKTOP / TABLET (≥ 768px): uses /frames/cliff-webp/        (1280x720 landscape)
 * - MOBILE           (< 768px): uses /frames/cliff-mobile-webp/ (405x720 focused portrait)
 *
 * Both variants scrub through 208 high-resolution WebP frames via GSAP ScrollTrigger + Canvas,
 * perfectly synchronized with our Void Black, Obsidian Charcoal, Stellar Gold, and Solar Copper palette.
 */

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MOBILE_BREAKPOINT = 768; // px

const VARIANTS = {
    desktop: {
        totalFrames: 208,
        framePath: (i: number) =>
            `/frames/cliff-webp/frame-${String(i).padStart(4, "0")}.webp`,
        pxPerFrame: 8,
    },
    mobile: {
        totalFrames: 208,
        framePath: (i: number) =>
            `/frames/cliff-mobile-webp/frame-${String(i).padStart(4, "0")}.webp`,
        pxPerFrame: 7,
    },
} as const;

type Variant = keyof typeof VARIANTS;

const CHUNK_SIZE = 48;
const EAGER_FRAMES = 35; // preload immediately for zero-delay start

export default function CliffScrollAnimation() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const prayaanRef = useRef<HTMLHeadingElement>(null);
    const techFestRef = useRef<HTMLDivElement>(null);
    const bufferBarRef = useRef<HTMLDivElement>(null);
    const bufferOverlayRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const loadedCountRef = useRef(0);
    const bufferReadyRef = useRef(false);
    const variantRef = useRef<Variant>("desktop");
    const ctxRef = useRef<gsap.Context | null>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    const getVariant = (): Variant =>
        window.innerWidth < MOBILE_BREAKPOINT ? "mobile" : "desktop";

    // ─── Draw a frame to canvas with crisp cover-fit ─────────────────────────
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[index];
        if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        // cover: scale image to completely fill canvas, cropping excess
        const scale = Math.max(cw / iw, ch / ih);
        const drawW = iw * scale;
        const drawH = ih * scale;
        const sx = (drawW - cw) / 2;
        const sy = (drawH - ch) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(
            img,
            sx / scale,
            sy / scale,
            cw / scale,
            ch / scale,
            0,
            0,
            cw,
            ch
        );
    }, []);

    // ─── Resize canvas to match screen dimensions with DPR support ──────────
    const sizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const displayW = section.offsetWidth || window.innerWidth;
        const displayH = section.offsetHeight || window.innerHeight;

        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
        canvas.style.width = `${displayW}px`;
        canvas.style.height = `${displayH}px`;

        drawFrame(currentFrameRef.current);
    }, [drawFrame]);

    // ─── Update buffer overlay progress ─────────────────────────────────────
    const updateBufferUI = useCallback((loaded: number) => {
        if (bufferReadyRef.current) return;
        const pct = Math.min(loaded / EAGER_FRAMES, 1);
        if (bufferBarRef.current) {
            bufferBarRef.current.style.width = `${pct * 100}%`;
        }
        if (pct >= 1 && bufferOverlayRef.current) {
            bufferReadyRef.current = true;
            bufferOverlayRef.current.style.transition = "opacity 0.5s ease";
            bufferOverlayRef.current.style.opacity = "0";
            setTimeout(() => {
                if (bufferOverlayRef.current) bufferOverlayRef.current.style.display = "none";
            }, 550);
        }
    }, []);

    // ─── Preload idle chunks in background ──────────────────────────────────
    const preloadChunk = useCallback((
        startIndex: number,
        framePath: (i: number) => string,
        totalFrames: number
    ) => {
        const end = Math.min(startIndex + CHUNK_SIZE, totalFrames);
        for (let i = startIndex; i < end; i++) {
            if (imagesRef.current[i]) continue;
            const img = new window.Image();
            img.src = framePath(i + 1);
            img.onload = () => {
                loadedCountRef.current += 1;
                if (i === 0) drawFrame(0);
                updateBufferUI(loadedCountRef.current);
            };
            imagesRef.current[i] = img;
        }
        if (end < totalFrames) {
            setTimeout(() => preloadChunk(end, framePath, totalFrames), 0);
        }
    }, [drawFrame, updateBufferUI]);

    // ─── Eagerly preload the initial burst of frames + last frame ───────────
    const eagerPreload = useCallback((
        framePath: (i: number) => string,
        totalFrames: number
    ) => {
        for (let i = 0; i < EAGER_FRAMES; i++) {
            if (imagesRef.current[i]) continue;
            const img = new window.Image();
            img.src = framePath(i + 1);
            img.onload = () => {
                loadedCountRef.current += 1;
                if (i === 0) drawFrame(0);
                updateBufferUI(loadedCountRef.current);
            };
            imagesRef.current[i] = img;
        }

        // Preload last frame immediately so navigating back while scrolled never renders blank
        const lastIdx = totalFrames - 1;
        if (!imagesRef.current[lastIdx]) {
            const lastImg = new window.Image();
            lastImg.src = framePath(totalFrames);
            lastImg.onload = () => {
                if (currentFrameRef.current === lastIdx) drawFrame(lastIdx);
            };
            imagesRef.current[lastIdx] = lastImg;
        }
    }, [drawFrame, updateBufferUI]);

    // ─── Initialize GSAP ScrollTrigger with full context revert ─────────────
    const initAnimation = useCallback(() => {
        if (cleanupRef.current) {
            cleanupRef.current();
            cleanupRef.current = null;
        }

        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        const variant = getVariant();
        variantRef.current = variant;

        const { totalFrames, framePath, pxPerFrame } = VARIANTS[variant];

        imagesRef.current = [];
        loadedCountRef.current = 0;
        currentFrameRef.current = 0;
        bufferReadyRef.current = false;

        if (bufferOverlayRef.current) {
            bufferOverlayRef.current.style.display = "flex";
            bufferOverlayRef.current.style.opacity = "1";
        }
        if (bufferBarRef.current) bufferBarRef.current.style.width = "0%";

        sizeCanvas();
        eagerPreload(framePath, totalFrames);
        setTimeout(() => preloadChunk(EAGER_FRAMES, framePath, totalFrames), 0);

        const totalScrollPx = pxPerFrame * (totalFrames - 1);

        // Use gsap.context so that on revert, all pin-spacers are cleanly removed
        const ctx = gsap.context(() => {
            gsap.to(
                { frame: 0 },
                {
                    frame: totalFrames - 1,
                    snap: "frame",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `+=${totalScrollPx}`,
                        scrub: 0.2,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const frame = Math.round(self.progress * (totalFrames - 1));
                            currentFrameRef.current = frame;
                            drawFrame(frame);

                            const bar = document.getElementById("cliff-progress-bar");
                            if (bar) bar.style.width = `${self.progress * 100}%`;

                            const p = self.progress;

                            // 1. Planetary golden light sweep position across PRAYAAN
                            if (prayaanRef.current) {
                                const sweepPos = Math.min(100, Math.max(0, p * 220));
                                prayaanRef.current.style.setProperty("--sweep-pos", `${sweepPos}%`);
                            }

                            // 2. TECH FEST delicate tracking settling
                            if (techFestRef.current) {
                                const trackingVal = 0.55 + Math.min(p * 0.45, 0.4);
                                techFestRef.current.style.letterSpacing = `${trackingVal}em`;
                            }

                            // 3. Keep title and all event details fully visible and stable throughout the entire scroll
                            if (overlayRef.current) {
                                overlayRef.current.style.opacity = "1";
                            }
                        },
                    },
                }
            );
        }, sectionRef);

        ctxRef.current = ctx;

        const ro = new ResizeObserver(() => {
            const newVariant = getVariant();
            if (newVariant !== variantRef.current) {
                initAnimation();
            } else {
                sizeCanvas();
                ScrollTrigger.refresh();
            }
        });
        ro.observe(section);

        const onResize = () => {
            sizeCanvas();
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize, { passive: true });

        cleanupRef.current = () => {
            if (ctxRef.current) {
                ctxRef.current.revert();
                ctxRef.current = null;
            }
            ro.disconnect();
            window.removeEventListener("resize", onResize);
        };
    }, [drawFrame, sizeCanvas, preloadChunk, eagerPreload]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        ScrollTrigger.clearScrollMemory();

        initAnimation();

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 60);

        return () => {
            clearTimeout(timer);
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
        };
    }, [initAnimation]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative w-full bg-[#0B0B0D] overflow-hidden select-none"
            style={{ height: "100dvh" }}
        >
            {/* ── Buffer overlay: shown until first eager frames are loaded ─── */}
            <div
                ref={bufferOverlayRef}
                aria-hidden="true"
                className="flex"
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 50,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(11, 11, 13, 0.88)",
                    backdropFilter: "blur(8px)",
                    gap: "14px",
                    pointerEvents: "none",
                }}
            >
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#E7B878] drop-shadow-[0_0_8px_rgba(231,184,120,0.5)]">
                    Initializing Sequence…
                </span>
                <div style={{ width: "200px", height: "3px", background: "rgba(27, 26, 25, 0.8)", borderRadius: "3px", overflow: "hidden", border: "1px solid rgba(185, 120, 67, 0.2)" }}>
                    <div
                        ref={bufferBarRef}
                        style={{
                            height: "100%",
                            width: "0%",
                            background: "linear-gradient(to right, #B97843, #E7B878)",
                            transition: "width 0.2s ease",
                            boxShadow: "0 0 10px rgba(231,184,120,0.8)",
                        }}
                    />
                </div>
            </div>

            {/* ── Canvas: frame renderer ───────────────────────────────────── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: "block" }}
                aria-hidden="true"
            />

            {/* ── Dark Atmospheric Vignette (Void Black & Cosmic Navy) ──────── */}
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 35%, rgba(11, 11, 13, 0.6) 75%, rgba(11, 11, 13, 0.95) 100%)",
                }}
            />

            {/* ── Subtle bottom gradient to melt into Events Showcase ─────── */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/70 to-transparent z-10 pointer-events-none" />

            {/* ── Cinematic Dune / Interstellar Design System Styles ─────── */}
            <style>{`
              .prayaan-wordmark {
                font-family: var(--font-orbitron), sans-serif;
                font-weight: 400;
                text-transform: uppercase;
                background: linear-gradient(
                  112deg,
                  #F0E5D5 0%,
                  #E7B878 28%,
                  #FFF8EE 48%,
                  #B97843 70%,
                  #F0E5D5 100%
                );
                background-size: 250% 100%;
                background-position: var(--sweep-pos, 25%) center;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 24px rgba(231, 184, 120, 0.32)) drop-shadow(0 4px 14px rgba(11, 11, 13, 0.95));
                transition: filter 0.3s ease;
              }

              .tech-fest-subtitle {
                font-family: var(--font-space-grotesk), sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                color: #E7B878;
                text-shadow: 0 0 16px rgba(231, 184, 120, 0.4), 0 2px 6px rgba(11, 11, 13, 0.95);
                transition: letter-spacing 0.15s ease-out;
              }

              @keyframes scroll-pulse {
                0% {
                  transform: translateY(-100%);
                  opacity: 0;
                }
                30% {
                  opacity: 1;
                }
                70% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(100%);
                  opacity: 0;
                }
              }

              .animate-scroll-pulse {
                animation: scroll-pulse 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }

              @media (prefers-reduced-motion: reduce) {
                .prayaan-wordmark {
                  background-position: 50% 50% !important;
                  filter: drop-shadow(0 2px 8px rgba(11, 11, 13, 0.9)) !important;
                }
                .animate-scroll-pulse {
                  animation: none !important;
                }
                .hero-overlay-container {
                  opacity: 1 !important;
                  transition: none !important;
                }
              }
            `}</style>

            {/* ── Editorial Tagline Rail — Desktop Left Negative Space ──────── */}
            <div
                className="hidden lg:flex flex-col items-start gap-4 absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none"
                aria-hidden="true"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#E7B878]/60 to-[#B97843]/40" />
                <div className="flex flex-col gap-3 font-space text-[10px] xl:text-[11px] tracking-[0.4em] uppercase text-[#F0E5D5]/70 pl-2.5 border-l border-[#B97843]/35">
                    <span className="hover:text-[#E7B878] transition-colors">EXPLORE</span>
                    <span className="hover:text-[#E7B878] transition-colors">INNOVATE</span>
                    <span className="hover:text-[#E7B878] transition-colors">CREATE</span>
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#B97843]/40 via-[#E7B878]/60 to-transparent" />
            </div>

            {/* ── Main Hero Overlay: Top Dept, Center PRAYAAN, Bottom Actions ── */}
            <div
                ref={overlayRef}
                className="hero-overlay-container absolute inset-0 z-20 flex flex-col justify-between items-center pointer-events-none px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-14 select-none"
                style={{ opacity: 1, willChange: "opacity" }}
            >
                {/* ── 1. Top Section: Department & College Information ────── */}
                <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto">
                    <div className="font-space text-[10px] sm:text-xs md:text-sm tracking-[0.35em] sm:tracking-[0.45em] uppercase text-[#F0E5D5]/80 text-center select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                        DEPARTMENT OF COMPUTER APPLICATIONS
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 select-none">
                        <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E7B878]/50 to-transparent" />
                        <span className="font-space text-[9px] sm:text-[11px] tracking-[0.6em] uppercase text-[#E7B878]/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            PRESENTS
                        </span>
                        <div className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent via-[#E7B878]/50 to-transparent" />
                    </div>
                </div>

                {/* ── 2. Center Section: Monumental PRAYAAN & TECH FEST ───── */}
                <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center my-auto px-2">
                    {/* Monumental PRAYAAN wordmark occupying 60–80% width */}
                    <h1
                        ref={prayaanRef}
                        className="prayaan-wordmark text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.45em] lg:tracking-[0.52em] select-none leading-none pl-[0.25em] sm:pl-[0.35em] md:pl-[0.45em] lg:pl-[0.52em]"
                    >
                        PRAYAAN
                    </h1>

                    {/* TECH FEST beneath PRAYAAN */}
                    <div
                        ref={techFestRef}
                        className="tech-fest-subtitle text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.55em] sm:tracking-[0.75em] md:tracking-[0.95em] mt-3 sm:mt-5 select-none pl-[0.55em] sm:pl-[0.75em] md:pl-[0.95em]"
                    >
                        TECH FEST
                    </div>

                    {/* Mobile editorial tagline */}
                    <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 font-space text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#F0E5D5]/65 mt-4">
                        <span>EXPLORE</span>
                        <span className="w-1 h-1 rounded-full bg-[#E7B878]/60" />
                        <span>INNOVATE</span>
                        <span className="w-1 h-1 rounded-full bg-[#E7B878]/60" />
                        <span>CREATE</span>
                    </div>
                </div>

                {/* ── 3. Bottom Section: Info Strip, CTAs & Scroll Indicator ─ */}
                <div className="w-full flex flex-col items-center gap-4 sm:gap-5 pointer-events-auto">
                    {/* Compact Supplementary Event Details */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2 px-5 py-2 rounded-full bg-[#1B1A19]/65 backdrop-blur-md border border-[#B97843]/30 shadow-[0_4px_24px_rgba(11,11,13,0.7)]">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7B878] shadow-[0_0_8px_#E7B878]" />
                            <span className="font-space text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#E7B878] font-semibold">
                                OCTOBER 30, 2026
                            </span>
                        </div>
                        <div className="h-3 w-[1px] bg-[#B97843]/30 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="font-space text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#F0E5D5]/80">
                                SNGCE CAMPUS
                            </span>
                        </div>
                    </div>

                    {/* Primary & Secondary Action CTAs */}
                    <div className="flex flex-row items-center gap-3 sm:gap-5">
                        {/* Primary CTA: EXPLORE EVENTS */}
                        <button
                            onClick={() =>
                                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1B1A19] border border-[#E7B878]/70 text-[#F0E5D5] font-space text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase font-medium shadow-[0_0_24px_rgba(231,184,120,0.18)] hover:shadow-[0_0_36px_rgba(231,184,120,0.4)] hover:border-[#E7B878] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden"
                            aria-label="Explore Events"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>EXPLORE EVENTS</span>
                                <span className="text-[#E7B878] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#B97843]/20 via-[#E7B878]/25 to-[#B97843]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        {/* Secondary CTA: REGISTER NOW */}
                        <button
                            onClick={() =>
                                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1B1A19] border border-[#E7B878]/70 text-[#F0E5D5] font-space text-[11px] sm:text-xs md:text-sm tracking-[0.25em] uppercase font-medium shadow-[0_0_24px_rgba(231,184,120,0.18)] hover:shadow-[0_0_36px_rgba(231,184,120,0.4)] hover:border-[#E7B878] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden no-underline"
                            aria-label="Register Now"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>REGISTER NOW</span>
                                <span className="text-[#E7B878] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#B97843]/20 via-[#E7B878]/25 to-[#B97843]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </div>

                    {/* Minimal Scroll Indicator */}
                    <div className="flex flex-col items-center gap-1.5 mt-1 select-none pointer-events-none opacity-80">
                        <span className="font-space text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-[#E7B878]/70">
                            SCROLL TO EXPLORE
                        </span>
                        <div className="w-[1px] h-6 sm:h-7 bg-[#1B1A19] relative overflow-hidden rounded-full border-x border-[#1B1A19]">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#B97843] via-[#E7B878] to-transparent animate-scroll-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Scroll progress bar ───────────────────────────────────────── */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1B1A19] z-30 pointer-events-none">
                <div
                    id="cliff-progress-bar"
                    className="h-full bg-gradient-to-r from-[#B97843] via-[#E7B878] to-[#F0E5D5] transition-none"
                    style={{ width: "0%" }}
                />
            </div>
        </section>
    );
}
