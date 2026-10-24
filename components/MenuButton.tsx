"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center focus:outline-none group active:scale-95 transition-transform"
                aria-label="Menu"
            >
                {/* Clockwise Outer Semi-Circle */}
                {/* <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-[#B97843] rounded-full border-t-transparent border-b-transparent opacity-80"
                /> */}

                {/* Anti-Clockwise Inner Semi-Circle */}
                {/* <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-[#E7B878] rounded-full border-l-transparent border-r-transparent opacity-90"
                /> */}

                {/* Hamburger Lines */}
                <div className="flex flex-col gap-1.5 z-10 scale-75 sm:scale-100">
                    <motion.div
                        animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.8)]"
                    />
                    <motion.div
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-6 h-0.5 bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.8)]"
                    />
                    <motion.div
                        animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-8 h-0.5 bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.8)]"
                    />
                </div>
            </button>

            {/* Pop-up Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute top-20 right-0 w-48 bg-[#1B1A19]/95 border border-[#B97843]/40 backdrop-blur-md rounded-xl p-6 shadow-[0_0_30px_rgba(185,120,67,0.2)] overflow-hidden"
                    >
                        {/* Subtle Distant Nebula Ambient Backing */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(40,60,85,0.25)_0%,transparent_70%)] pointer-events-none" />

                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B97843]/60 rounded-tr-lg pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B97843]/60 rounded-bl-lg pointer-events-none" />

                        <nav className="flex flex-col gap-6 text-center relative z-10">
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'Events', id: 'events' },
                                { name: 'Contact', id: 'contact' }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        const element = document.getElementById(item.id);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            window.location.href = `/#${item.id}`;
                                        }
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.08, x: 4 }}
                                        className="group cursor-pointer"
                                    >
                                        <span className="font-space text-lg text-[#F0E5D5] tracking-widest uppercase font-bold group-hover:text-[#E7B878] transition-colors duration-300 drop-shadow-[0_0_5px_rgba(231,184,120,0.5)]">
                                            {item.name}
                                        </span>
                                        <div className="h-[1.5px] w-0 group-hover:w-full bg-[#E7B878] transition-all duration-300 mt-1 mx-auto" />
                                    </motion.div>
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
