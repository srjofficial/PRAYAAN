"use client"

import EventCard from "@/components/event-card"
import CustomCursor from "@/components/custom-cursor"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface DeptEventsContentProps {
    department: { name: string; abbr: string; slug: string }
    events: {
        name: string
        description: string
        registrationUrl?: string
        image?: string
        coordinators?: { name: string; phone: string }[]
        category?: string
    }[]
}

export default function DeptEventsContent({ department, events }: DeptEventsContentProps) {
    return (
        <>
            <CustomCursor />

            {/* Hero-style header */}
            <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col items-center justify-center overflow-hidden pt-24 lg:pt-0">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,120,67,0.1)_0%,rgba(16,27,43,0.25)_50%,transparent_70%)]" />

                <div className="relative z-10 text-center px-5">
                    {/* Back link */}
                    <Link
                        href="/bodhi"
                        className="inline-flex items-center gap-2 text-[10px] font-mono text-[#F0E5D5]/50 tracking-widest hover:text-[#E7B878] transition-colors mb-6 md:mb-10"
                        data-cursor="hover"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 text-[#B97843]" />
                        ALL DEPARTMENTS
                    </Link>

                    {/* Label */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="h-px w-12 bg-[#B97843]/40" />
                        <span className="text-[10px] font-mono text-[#E7B878] tracking-[0.4em] uppercase">
                            {department.name}
                        </span>
                        <span className="h-px w-12 bg-[#B97843]/40" />
                    </div>

                    {/* Big abbreviation */}
                    <h1 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-cinzel font-black tracking-tighter leading-[0.85] text-[#F0E5D5] drop-shadow-[0_0_35px_rgba(231,184,120,0.3)]">
                        {department.abbr}
                    </h1>

                    <p className="text-xs md:text-sm font-mono text-[#F0E5D5]/60 mt-4 md:mt-6 max-w-md mx-auto">
                        {events.length} technical event{events.length !== 1 ? "s" : ""} to explore
                    </p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-10 md:py-16 px-4 md:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="mb-8 md:mb-14">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="h-px w-12 bg-[#B97843]/40" />
                            <span className="text-[10px] font-mono text-[#E7B878] tracking-[0.3em] uppercase">
                                {events.length} Events
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-cinzel font-black tracking-tight text-[#F0E5D5]">
                            EVENTS
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {events.map((event, index) => (
                            <EventCard
                                key={event.name}
                                name={event.name}
                                description={event.description}
                                registrationUrl={event.registrationUrl}
                                image={event.image}
                                index={index}
                                category={department.name}
                            />
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#F0E5D5]/40 font-mono text-sm">No events found for this department.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
