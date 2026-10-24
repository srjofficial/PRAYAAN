"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FloatingSpores from "./FloatingSpores";


export default function GlobalLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial load animation duration
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1600);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center bg-[#0B0B0D] z-[9999] overflow-hidden"
                >
                    {/* Void Black Base */}
                    <div className="absolute inset-0 bg-[#0B0B0D] z-0" />

                    {/* TV Static / Grain Overlay */}
                    <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none noise-overlay" />

                    {/* The Astral Atmosphere */}
                    <div className="z-10 opacity-70">
                        <FloatingSpores />
                    </div>

                    {/* Warm Nebula Umber & Cosmic Navy Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(52,39,32,0.45)_60%,rgba(16,27,43,0.85)_100%)] z-10 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* SymmetricWave Loading Animation */}
                        <div className="relative mb-8 flex flex-col items-center justify-center">
                            {/* Animated Warm Amber-Gold Aura Behind Animation */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.25, 1],
                                    opacity: [0.15, 0.45, 0.15],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-[#E7B878] blur-[40px] rounded-full z-0 pointer-events-none"
                            />

                            {/* Rotating Subtle Celestial Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-3 rounded-full border border-dashed border-[#E7B878]/30 pointer-events-none"
                            />

                            {/* Round Emblem / Logo Container */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#E7B878]/80 shadow-[0_0_35px_rgba(231,184,120,0.6),inset_0_0_15px_rgba(231,184,120,0.3)] bg-[#0B0B0D]"
                            >
                                <Image
                                    src="/images/prayaan-logo.jpg"
                                    alt="PRAYAAN Logo"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Elegant Progress Line */}
                        <div className="w-64 h-[2px] bg-[#342720] rounded-full overflow-hidden relative mb-4">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.4, ease: "easeInOut" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B97843] via-[#E7B878] to-[#F0E5D5] shadow-[0_0_12px_rgba(231,184,120,0.9)]"
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#F0E5D5]/80 drop-shadow-[0_0_8px_rgba(231,184,120,0.5)]"
                        >
                            Entering The Astral Realm
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
