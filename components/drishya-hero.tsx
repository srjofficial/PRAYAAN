"use client"

import Image from "next/image"

export default function DrishyaHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0D] pt-20 lg:pt-0">
            {/* Simple Void Black Background */}
            <div className="absolute inset-0 bg-[#0B0B0D]" />

            {/* Background Image - Half Face */}
            <div className="absolute inset-y-0 left-0 h-full w-auto z-0 opacity-40 mix-blend-screen pointer-events-none select-none">
                <Image
                    src="/images/drishya/halfface.png"
                    alt="Drishya Artistic Face"
                    width={800}
                    height={1200}
                    className="h-full w-auto object-cover object-left"
                    priority
                />
            </div>



            {/* Content */}
            <div className="relative z-10 text-center px-4">
                {/* Top label */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="h-px w-8 bg-[#B97843]/60" />
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#E7B878] uppercase">
                        Arts & Cultural Events
                    </span>
                    <span className="h-px w-8 bg-[#B97843]/60" />
                </div>

                {/* Main title */}
                <h1 className="text-6xl md:text-[8rem] lg:text-[12rem] font-asoka font-bold tracking-widest leading-none text-[#F0E5D5] drop-shadow-[0_0_35px_rgba(231,184,120,0.35)]">
                    DRISHYA
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base font-mono text-[#F0E5D5]/60 mt-6 max-w-md mx-auto">
                    Celebrate art, music, dance, and creativity. Showcase your talent.
                </p>
            </div>
        </section>
    )
}
