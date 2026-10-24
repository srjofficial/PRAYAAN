"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaArrowRight } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
    return (
        <footer id="contact" className="relative w-full bg-[#0B0B0D] text-[#F0E5D5] border-t border-[#B97843]/20 overflow-hidden">
            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                <h2 className="font-cinzel font-bold text-6xl md:text-8xl lg:text-[12rem] tracking-widest text-[#B97843] whitespace-nowrap drop-shadow-[0_0_25px_rgba(185,120,67,0.4)]">
                    PRAYAAN
                </h2>
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* College & Department Associations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center">
                    {/* SNGCE Section */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 md:h-14 rounded-lg overflow-hidden flex items-center justify-center border border-[#B97843]/30 hover:scale-105 transition-transform duration-300">
                                <img src="/home/sngce-logo.jpg" alt="SNGCE Logo" className="h-full w-auto object-cover" onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/SNGCE_logo.png/220px-SNGCE_logo.png' }} />
                            </div>
                        </div>
                        <Link href="https://sngce.ac.in" target="_blank" rel="noopener noreferrer" className="text-[#B97843] font-sans text-xs md:text-sm tracking-wide mb-3 hover:text-[#E7B878] transition-colors duration-300 font-semibold">
                            Sree Narayana Gurukulam College of Engineering
                        </Link>
                        <Link href="https://maps.app.goo.gl/m4xtMMW9pvMbB9QUA" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[#F0E5D5]/70 hover:text-[#E7B878] transition-colors duration-300 group">
                            <IoLocationSharp className="w-3 h-3 text-[#B97843]" />
                            <span className="font-mono text-[10px] md:text-xs tracking-wider uppercase">college location</span>
                            <FaArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform text-[#E7B878]" />
                        </Link>
                    </div>

                    {/* AMICA Section */}
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 md:h-14 rounded-lg overflow-hidden flex items-center justify-center bg-white p-1 border border-[#B97843]/30 hover:scale-105 transition-transform duration-300">
                                <img
                                    src="/home/amica-logo.jpg"
                                    alt="AMICA Logo"
                                    className="h-full w-auto object-contain rounded"
                                />
                            </div>
                        </div>
                        <p className="text-[#B97843] font-sans text-xs md:text-sm tracking-wide mb-3 font-semibold">
                            AMICA
                        </p>
                        <span className="font-mono text-[10px] md:text-xs text-[#F0E5D5]/70 tracking-wider uppercase">
                            Association of MCA
                        </span>
                    </div>

                    {/* NBA Section */}
                    <Link
                        href="https://sngce.ac.in/department.php?id=Y2E=&p=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center text-center group cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 md:h-14 rounded-lg overflow-hidden flex items-center justify-center border border-[#B97843]/30 group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src="/home/nba-logo.jpg"
                                    alt="NBA Logo"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                        <p className="text-[#B97843] font-sans text-xs md:text-sm tracking-wide mb-1 font-semibold group-hover:text-[#E7B878] transition-colors duration-300">
                            NBA Accredited
                        </p>
                        <span className="font-mono text-[10px] md:text-xs text-[#F0E5D5]/70 tracking-wider uppercase group-hover:text-[#F0E5D5] transition-colors duration-300">
                            National Board of Accreditation
                        </span>
                    </Link>
                </div>

                {/* Brand Banner Row */}
                <div className="flex items-center justify-center my-8">
                    <div className="flex items-center gap-4">
                        <span className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-[#B97843]/60" />
                        <div className="text-[#E7B878] font-cinzel font-bold text-3xl md:text-4xl tracking-widest drop-shadow-[0_0_15px_rgba(231,184,120,0.5)]">
                            PRAYAAN
                        </div>
                        <span className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-[#B97843]/60" />
                    </div>
                </div>

                {/* Main Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-t border-[#342720] pt-10 mt-6">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h4 className="font-cinzel text-[#E7B878] tracking-widest text-lg font-bold hover:text-[#F0E5D5] transition-colors">Sreehari M</h4>
                        <p className="font-sans text-[10px] md:text-xs text-[#B97843] uppercase tracking-[0.2em] mb-2 font-semibold">CHAPTER ADVISOR</p>
                        <a href="tel:8078426026" className="font-mono text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.9)] animate-pulse" />
                            8078426026
                        </a>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <h4 className="font-cinzel text-[#E7B878] tracking-widest text-lg font-bold hover:text-[#F0E5D5] transition-colors">Nimitha Mohan</h4>
                        <p className="font-sans text-[10px] md:text-xs text-[#B97843] uppercase tracking-[0.2em] mb-2 font-semibold">CHAPTER ADVISOR</p>
                        <a href="tel:8129212673" className="font-mono text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.9)] animate-pulse" />
                            8129212673
                        </a>
                    </div>
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <h4 className="font-cinzel text-[#E7B878] tracking-widest text-lg font-bold hover:text-[#F0E5D5] transition-colors">Aveen</h4>
                        <p className="font-sans text-[10px] md:text-xs text-[#B97843] uppercase tracking-[0.2em] mb-2 font-semibold">STUDENT COORDINATOR</p>
                        <a href="tel:8129244658" className="font-mono text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E7B878] shadow-[0_0_8px_rgba(231,184,120,0.9)] animate-pulse" />
                            8129244658
                        </a>
                    </div>
                </div>

                {/* Website Developers */}
                <div className="flex flex-col items-center border-t border-[#342720] pt-10 mb-10">
                    <h4 className="font-cinzel text-sm tracking-widest text-[#F0E5D5]/60 uppercase mb-6">
                        Website Built By
                    </h4>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                        {/* Abinson Babu */}
                        <Link
                            href="https://www.instagram.com/ab._xn__son__"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors duration-300 group"
                        >
                            <FaInstagram className="w-5 h-5 text-[#B97843] group-hover:text-[#E7B878] transition-colors" />
                            <span className="font-cinzel tracking-wider text-sm md:text-base font-bold">Abinson Babu</span>
                        </Link>

                        {/* Parthip Sasidharan */}
                        <Link
                            href="https://www.instagram.com/parthip_sasidharan/?next="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors duration-300 group"
                        >
                            <FaInstagram className="w-5 h-5 text-[#B97843] group-hover:text-[#E7B878] transition-colors" />
                            <span className="font-cinzel tracking-wider text-sm md:text-base font-bold">Parthip Sasidharan</span>
                        </Link>

                        {/* Saroj S */}
                        <Link
                            href="https://www.instagram.com/thesarojs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-[#F0E5D5]/80 hover:text-[#E7B878] transition-colors duration-300 group"
                        >
                            <FaInstagram className="w-5 h-5 text-[#B97843] group-hover:text-[#E7B878] transition-colors" />
                            <span className="font-cinzel tracking-wider text-sm md:text-base font-bold">Saroj S</span>
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="font-mono text-xs text-[#F0E5D5]/50">
                        © 2026 Prayaan. All rights reserved. SNGCE MCA Department.
                    </p>
                </div>
            </div>
        </footer>
    );
}
