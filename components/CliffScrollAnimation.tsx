"use client";

/**
 * CliffScrollAnimation.tsx
 *
 * Cinematic Sand-Dispersal Hero for "PRAYAAN":
 * - Auto-plays high-definition background video (desktop/mobile)
 * - Canvas-based Sand Particle Title Animation ("PRAYAAN", "TECH FEST", "DEPARTMENT OF COMPUTER APPLICATIONS")
 * - 100vh hero height with fixed canvas (z-index: 50)
 * - Triggered wind physics on scroll with subtle particle idle shimmering
 */

import { useEffect, useRef, useState } from "react";

export default function CliffScrollAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const uiOverlayRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Ensure video begins playing immediately across all browsers
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [isMobile]);

    // Sand Canvas Animation Loop with Trigger-based Wind
    useEffect(() => {
        const cv = canvasRef.current || (document.getElementById('sandCanvas') as HTMLCanvasElement);
        if (!cv) return;

        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const W = 700, H = 270, IN = 2.6, FLY = 3.8, TRIGGER = 5;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let pts: Array<{
            hx: number;
            hy: number;
            sx: number;
            sy: number;
            din: number;
            dout: number;
            s: number;
            s2: number;
            sz: number;
            col: string;
        }> = [];
        let dpr = 1, cw = 0, ch = 0, sc = 1, ox = 0, oy = 0;
        let start = performance.now(), last = start, wind = 0;
        let animId: number;

        function resize() {
            if (!cv) return;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            cw = cv.clientWidth;
            ch = cv.clientHeight;
            cv.width = Math.round(cw * dpr);
            cv.height = Math.round(ch * dpr);
            sc = Math.min(cw * 0.94, 900) / W;
            ox = (cw - W * sc) / 2;
            oy = (ch - H * sc) / 2 - 75;
        }

        function spaced(c: CanvasRenderingContext2D, text: string, cx: number, y: number, gap: number) {
            let tot = 0;
            const ws: number[] = [];
            for (let i = 0; i < text.length; i++) {
                ws[i] = c.measureText(text[i]).width;
                tot += ws[i] + gap;
            }
            let x = cx - (tot - gap) / 2;
            for (let i = 0; i < text.length; i++) {
                c.fillText(text[i], x, y);
                x += ws[i] + gap;
            }
        }

        function build() {
            const off = document.createElement('canvas');
            off.width = W;
            off.height = H;
            const c = off.getContext('2d');
            if (!c) return;

            const g = c.createLinearGradient(0, 90, 0, 160);
            g.addColorStop(0, '#f6ead8');
            g.addColorStop(1, '#c99b6a');
            c.translate(51, 80);
            c.scale(0.9, 0.9);
            c.strokeStyle = g;
            c.lineWidth = 9;
            c.lineCap = 'square';
            c.lineJoin = 'miter';

            const paths: [number, string][] = [
                [0, 'M0 85V15H44Q64 15 64 33Q64 51 44 51H0'],
                [100, 'M0 85V15H44Q64 15 64 33Q64 51 44 51H0M30 51L64 85'],
                [200, 'M0 85L32 15L64 85'],
                [300, 'M0 15L32 50L64 15M32 50V85'],
                [400, 'M0 85L32 15L64 85'],
                [500, 'M0 85L32 15L64 85'],
                [600, 'M0 85V15L64 85V15']
            ];

            paths.forEach((p) => {
                c.save();
                c.translate(p[0], 0);
                c.stroke(new Path2D(p[1]));
                c.restore();
            });

            const imgData = c.getImageData(0, 0, W, H);
            const d = imgData.data;
            pts = [];
            for (let y = 0; y < H; y += 2) {
                for (let x = 0; x < W; x += 2) {
                    const i = (y * W + x) * 4;
                    if (d[i + 3] > 120) {
                        pts.push({
                            hx: x,
                            hy: y,
                            sx: x + 350 + Math.random() * 700,
                            sy: y + (Math.random() - 0.5) * 220,
                            din: Math.random() * 0.9 + (1 - x / W) * 0.4,
                            dout: (x / W) * 1.5 + Math.random() * 0.35,
                            s: Math.random(),
                            s2: 0.5 + Math.random(),
                            sz: 1.3 + Math.random() * 1.1,
                            col: 'rgb(' + d[i] + ',' + d[i + 1] + ',' + d[i + 2] + ')'
                        });
                    }
                }
            }
        }

        function frame(now: number) {
            if (!ctx) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const t = reduce ? 99 : (now - start) / 1000;
            const target = window.scrollY > TRIGGER ? FLY : 0;
            if (wind < target) wind = Math.min(target, wind + dt * FLY / 1.6);
            else if (wind > target) wind = Math.max(target, wind - dt * FLY / 1.2);

            if (uiOverlayRef.current) {
                const uiFade = Math.max(0, 1 - wind / (FLY * 0.18));
                uiOverlayRef.current.style.opacity = String(uiFade);
                uiOverlayRef.current.style.pointerEvents = uiFade < 0.1 ? 'none' : 'auto';
            }

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, cw, ch);
            if (wind >= FLY - 0.001) {
                animId = requestAnimationFrame(frame);
                return;
            }

            const textFade = Math.max(0, 1 - wind / (FLY * 0.15));
            if (textFade > 0.01) {
                ctx.globalAlpha = textFade * Math.min(1, t / 1.5);
                ctx.textBaseline = 'alphabetic';
                ctx.fillStyle = '#f0e2cc';
                ctx.font = (20 * sc) + 'px Michroma, "Segoe UI", sans-serif';
                spaced(ctx, 'TECH FEST', cw / 2, oy + 218 * sc, 16 * sc);

                ctx.fillStyle = '#b99a78';
                ctx.font = (11 * sc) + 'px Michroma, "Segoe UI", sans-serif';
                spaced(ctx, 'DEPARTMENT OF COMPUTER APPLICATIONS', cw / 2, oy + 52 * sc, 4 * sc);
            }

            for (let n = 0; n < pts.length; n++) {
                const q = pts[n];
                let x = q.hx;
                let y = q.hy;
                let a = 1;

                if (t < IN) {
                    const u = Math.min(1, Math.max(0, (t - q.din) / (IN - 1.1)));
                    const e = 1 - Math.pow(1 - u, 3);
                    x = q.sx + (q.hx - q.sx) * e;
                    y = q.sy + (q.hy - q.sy) * e + Math.sin(q.s * 20 + t * 7) * (1 - e) * 10;
                    a = Math.min(1, e * 1.6);
                } else {
                    x += Math.sin(q.s * 30 + t * 2.5) * 0.35;
                }

                const v = wind - q.dout;
                if (v > 0) {
                    x += (v * 80 + v * v * 280) * q.s2;
                    y += Math.sin(v * 3.2 + q.s * 6.28) * v * 26 - v * v * 18 * q.s + (q.s - 0.5) * v * 40;
                    a *= Math.max(0, 1 - v / 1.35);
                }

                if (a <= 0.02) continue;
                ctx.globalAlpha = a;
                ctx.fillStyle = q.col;
                ctx.fillRect(ox + x * sc, oy + y * sc, q.sz * sc, q.sz * sc);
            }

            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(frame);
        }

        function go() {
            resize();
            build();
            start = last = performance.now();
            if (window.scrollY > TRIGGER) {
                start -= 10000;
                wind = FLY;
            }
            animId = requestAnimationFrame(frame);
        }

        window.addEventListener('resize', resize);
        const f = document.fonts && document.fonts.load ? document.fonts.load('20px Michroma') : Promise.resolve();
        Promise.race([f, new Promise((r) => setTimeout(r, 1500))]).then(go, go);

        return () => {
            window.removeEventListener('resize', resize);
            if (animId) cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <>
            <section
                id="hero"
                className="sand-hero relative w-full h-[100dvh] min-h-[650px] overflow-hidden bg-[#120d0a] select-none"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-[#120d0a]/30 to-[#120d0a]/75 z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,39,32,0.2)_0%,rgba(18,13,10,0.65)_100%)] z-10" />
                </div>

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

                {/* ── Bottom Section: Supplementary Details, CTAs & Scroll Indicator ─ */}
                <div
                    ref={uiOverlayRef}
                    className="absolute bottom-8 sm:bottom-10 left-0 right-0 z-30 flex flex-col items-center gap-4 sm:gap-5 px-4 pointer-events-auto transition-opacity duration-200"
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
                </div>
            </section>

            {/* Fixed Sand Particle Canvas as specified */}
            <canvas
                ref={canvasRef}
                id="sandCanvas"
            />

            {/* Injected Sand Hero Styles */}
            <style jsx global>{`
              .sand-hero { height: 100vh; background: #120d0a; }
              #sandCanvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 50; }

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
        </>
    );
}
