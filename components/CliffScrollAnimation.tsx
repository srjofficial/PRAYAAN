"use client";

/**
 * CliffScrollAnimation.tsx
 *
 * Cinematic Auto-playing Hero Video for "Man on Cliff":
 * - Auto-plays high-definition video smoothly in the background
 * - Automatically selects /home/man-on-cliff.mp4 for desktop or /man-new-mobil.mp4 for mobile
 * - No scroll-lock or heavy frame scrubbing; scrolls naturally into the Events section
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CliffScrollAnimation() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Ensure video begins playing immediately across all desktop & mobile browsers
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay policy fallback: video remains muted and retries
            });
        }
    }, [isMobile]);

    return (
        <section
            id="hero"
            className="relative w-full h-[100dvh] min-h-[650px] overflow-hidden bg-[#0B0B0D] select-none"
        >
            {/* Background Autoplaying Video */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    ref={videoRef}
                    key={isMobile ? "mobile" : "desktop"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source
                        src={isMobile ? "/man-new-mobil.mp4" : "/man-on-cliff.mp4"}
                        type="video/mp4"
                    />
                </video>

                {/* Atmospheric Dark & Golden Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/30 to-[#0B0B0D]/75 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,39,32,0.2)_0%,rgba(11,11,13,0.65)_100%)] z-10" />
            </div>

            {/* Custom Styles for Typography & Animations */}
            <style jsx global>{`
              .prayaan-wordmark {
                font-family: var(--font-orbitron), sans-serif;
                font-weight: 600;
                background: linear-gradient(
                  180deg,
                  #FFFFFF 0%,
                  #F0E5D5 28%,
                  #E7B878 65%,
                  #B97843 88%,
                  #5A3718 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                filter: drop-shadow(0 2px 10px rgba(11, 11, 13, 0.95))
                        drop-shadow(0 0 25px rgba(231, 184, 120, 0.35));
              }

              .tech-fest-subtitle {
                font-family: var(--font-space-grotesk), sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                color: #E7B878;
                text-shadow: 0 0 16px rgba(231, 184, 120, 0.4), 0 2px 6px rgba(11, 11, 13, 0.95);
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
            <div className="relative z-20 w-full h-full flex flex-col justify-between items-center px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-14 select-none">
                {/* ── 1. Top Section: Department & College Information ────── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto"
                >
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
                </motion.div>

                {/* ── 2. Center Section: Monumental PRAYAAN & TECH FEST ───── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center my-auto px-2"
                >
                    {/* Monumental PRAYAAN wordmark in Orbitron SemiBold */}
                    <h1 className="prayaan-wordmark text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] tracking-[0.14em] sm:tracking-[0.18em] md:tracking-[0.22em] select-none leading-none pl-[0.14em] sm:pl-[0.18em] md:pl-[0.22em]">
                        PRAYAAN
                    </h1>

                    {/* TECH FEST beneath PRAYAAN */}
                    <div className="tech-fest-subtitle text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.45em] sm:tracking-[0.65em] md:tracking-[0.8em] mt-3 sm:mt-5 select-none pl-[0.45em] sm:pl-[0.65em] md:pl-[0.8em]">
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
                </motion.div>

                {/* ── 3. Bottom Section: Info Strip, CTAs & Scroll Indicator ─ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="w-full flex flex-col items-center gap-4 sm:gap-5 pointer-events-auto"
                >
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
                    <div
                        onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
                        className="flex flex-col items-center gap-1.5 mt-1 select-none cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <span className="font-space text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-[#E7B878]/70">
                            SCROLL TO EXPLORE
                        </span>
                        <div className="w-[1px] h-6 sm:h-7 bg-[#1B1A19] relative overflow-hidden rounded-full border-x border-[#1B1A19]">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#B97843] via-[#E7B878] to-transparent animate-scroll-pulse" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
