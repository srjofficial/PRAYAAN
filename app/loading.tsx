"use client";

import { SymmetricWave } from "@/components/loading-ui/symmetric-wave";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0B0B0D] z-50 gap-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Ring — Stellar Gold */}
                <div className="absolute w-full h-full rounded-full border-t-2 border-[#E7B878] shadow-[0_0_15px_rgba(231,184,120,0.3)] animate-spin-slow" />

                {/* Middle Ring — Solar Copper */}
                <div className="absolute w-40 h-40 rounded-full border-b-2 border-[#B97843] shadow-[0_0_12px_rgba(185,120,67,0.3)] animate-spin-reverse" />

                {/* Inner Ring — Stardust Ivory */}
                <div className="absolute w-32 h-32 rounded-full border-t-2 border-[#F0E5D5] animate-spin-slow" />

                {/* Center Loading Animation */}
                <div className="relative z-10 flex items-center justify-center">
                    <SymmetricWave height={44} count={7} />
                </div>
            </div>

            <span className="font-space text-xs tracking-[0.35em] uppercase text-[#E7B878] drop-shadow-[0_0_10px_rgba(231,184,120,0.5)]">
                PRAYAAN TECH FEST
            </span>
        </div>
    );
}
