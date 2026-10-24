"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Keyboard, Globe, Sparkles, MessageSquare, Map, Dices, Music, Clapperboard } from "lucide-react";
import Link from "next/link";

const events = [
    {
        id: "blind-typing",
        title: "Blind Typing Competition",
        description: "Type a given passage without seeing the keyboard — no peeking! An individual competition that tests your accuracy, speed, and muscle memory over two thrilling rounds.",
        image: "/images/events/sourcecode.png",
        icon: <Keyboard className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "website-60",
        title: "Website in 60 Minutes",
        description: "Design and deploy a complete, functional website in just 60 minutes. Every second counts — show what you can build under pressure.",
        image: "/images/events/vision.png",
        icon: <Globe className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "ai-prompt-engineering",
        title: "AI Prompt Engineering",
        description: "Master the art of talking to AI. Craft precise, creative prompts to guide AI models — the sharpest minds craft the sharpest prompts.",
        image: "/images/events/coderift.png",
        icon: <Sparkles className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "tech-charades",
        title: "Tech Charades",
        description: "Guess the tech term, algorithm, or gadget from your teammate's acting alone — no words allowed! A hilarious fusion of technology and charades.",
        image: "/images/events/quirkquest.jpeg",
        icon: <MessageSquare className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "treasure-hunt",
        title: "Treasure Hunt (Tech Mystery Hunt)",
        description: "Navigate the campus following cryptic clues and technical riddles. The first team to crack every clue and reach the final destination wins.",
        image: "/images/events/strangerthings.jpeg",
        icon: <Map className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "fun-games",
        title: "Fun Games",
        description: "A vibrant collection of fun games, quirky challenges, and light-hearted competitions. On-spot participation only — walk in and join the fun!",
        image: "/images/events/fun.png",
        icon: <Dices className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "spot-choreo",
        title: "Spot Choreo",
        description: "No prep, no rehearsals — just raw talent and rhythm. Get a random song on the spot and deliver an impromptu performance that wows the crowd.",
        image: "/images/events/football.png",
        icon: <Music className="w-6 h-6 text-[#E7B878]" />
    },
    {
        id: "reel-making",
        title: "Reel Making",
        description: "Turn fest moments into cinematic gold. Capture the energy, atmosphere, and buzz of PRAYAAN in a creative 30–60 second short-form reel.",
        image: "/images/events/reelmaking.jpg",
        icon: <Clapperboard className="w-6 h-6 text-[#E7B878]" />
    }
];

const TiltCard = ({ children, isEven }: { children: React.ReactNode, isEven: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative perspective-1000"
        >
            {children}
        </motion.div>
    );
};

export default function EventsShowcase() {
    return (
        <section id="events" className="relative min-h-[80vh] bg-[#0B0B0D] py-20 overflow-hidden">
            {/* Background elements: Void Black with warm atmospheric Nebula Umber & subtle distant Cosmic Navy */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,39,32,0.45)_0%,rgba(16,27,43,0.3)_45%,rgba(11,11,13,1)_85%)]" />

            {/* Subtle distant nebula violet whisper */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#68465D]/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#283C55]/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-cinzel text-5xl md:text-7xl font-bold text-[#E7B878] drop-shadow-[0_0_25px_rgba(231,184,120,0.5)] mb-4 tracking-wider">
                        FEATURED EVENTS
                    </h2>
                    <p className="font-mono text-[#F0E5D5]/70 max-w-2xl mx-auto text-sm md:text-base tracking-[0.2em] uppercase">
                        CHALLENGE THE REALM. COMPETE. TRIUMPH.
                    </p>
                </motion.div>

                {/* Card Hover Animation Styles — CSS Only, 60fps transforms + filter transitions */}
                <style>{`
                  .featured-event-card {
                    position: relative;
                    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                                border-color 0.4s ease,
                                box-shadow 0.5s ease;
                    will-change: transform;
                  }

                  .featured-event-card:hover,
                  .featured-event-card:focus-within {
                    transform: translateY(-4px);
                    border-color: rgba(231, 184, 120, 0.7) !important;
                    box-shadow: 0 12px 40px rgba(231, 184, 120, 0.22) !important;
                  }

                  .card-image-box {
                    overflow: hidden;
                  }

                  .card-image-inner {
                    filter: grayscale(1) brightness(0.8);
                    transform: scale(1.12);
                    transition: filter 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: filter, transform;
                  }

                  .featured-event-card:hover .card-image-inner,
                  .featured-event-card:focus-within .card-image-inner {
                    filter: grayscale(0) brightness(1);
                    transform: scale(1.0) translate3d(0, 0, 0);
                  }

                  .card-title-track {
                    color: rgba(170, 180, 200, 0.8);
                    transition: color 0.4s ease, text-shadow 0.4s ease;
                  }

                  .featured-event-card:hover .card-title-track,
                  .featured-event-card:focus-within .card-title-track {
                    color: #F0E5D5;
                    text-shadow: 0 0 12px rgba(240, 229, 213, 0.35);
                  }

                  .roll-primary,
                  .roll-clone {
                    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: transform;
                  }

                  .featured-event-card:hover .roll-primary,
                  .featured-event-card:focus-within .roll-primary,
                  .featured-event-card:hover .roll-clone,
                  .featured-event-card:focus-within .roll-clone {
                    transform: translateY(-100%);
                  }

                  .card-arrow-icon {
                    transform: rotate(0deg);
                    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: transform;
                  }

                  .featured-event-card:hover .card-arrow-icon,
                  .featured-event-card:focus-within .card-arrow-icon {
                    transform: rotate(-45deg);
                  }

                  .card-action-btn {
                    transition: box-shadow 0.4s ease, background-color 0.3s ease;
                  }

                  .featured-event-card:hover .card-action-btn,
                  .featured-event-card:focus-within .card-action-btn {
                    background-color: #F0E5D5;
                    box-shadow: 0 0 35px rgba(231, 184, 120, 0.65);
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .featured-event-card,
                    .card-image-inner,
                    .roll-primary,
                    .roll-clone,
                    .card-arrow-icon,
                    .card-action-btn {
                      transition: none !important;
                      transform: none !important;
                    }
                  }

                  @media (hover: none) {
                    .card-image-inner {
                      filter: grayscale(0) brightness(1) !important;
                      transform: scale(1.0) !important;
                    }
                    .card-title-track {
                      color: #F0E5D5 !important;
                    }
                    .card-arrow-icon {
                      transform: rotate(-45deg) !important;
                    }
                  }
                `}</style>

                {/* Events List */}
                <div className="flex flex-col gap-12 sm:gap-16">
                    {events.map((event, index) => {
                        const isEven = index % 2 === 0;
                        const words = event.title.split(" ");
                        return (
                            <Link href={`/events/${event.id}`} key={event.id} className="block cursor-none">
                                <TiltCard isEven={isEven}>
                                    <div
                                        tabIndex={0}
                                        className={`card featured-event-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 md:gap-8 items-center bg-[#1B1A19] border border-[#B97843]/30 rounded-xl overflow-hidden`}
                                        style={{ transform: "translateZ(50px)" }}
                                    >

                                        {/* Image Side */}
                                        <div className="card-image-box w-full md:w-1/2 h-[300px] md:h-[450px] relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                                            <div className="absolute inset-0 bg-[#342720]/25 mix-blend-overlay z-10 pointer-events-none" />
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="card-image-inner object-cover"
                                            />
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center" style={{ transform: "translateZ(60px)" }}>

                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-[#342720]/80 border border-[#B97843]/50 rounded-lg drop-shadow-[0_0_10px_rgba(185,120,67,0.3)]">
                                                    {event.icon}
                                                </div>
                                                <div className="flex flex-col">
                                                    {event.id === "fun-games" && (
                                                        <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#E7B878]/15 border border-[#E7B878]/50 text-[#E7B878] font-bold mb-1">
                                                            On-Spot Participation
                                                        </span>
                                                    )}
                                                    <h3 className="font-cinzel text-3xl md:text-4xl font-bold">
                                                    <span className="card-title-track inline-flex flex-wrap gap-x-2.5">
                                                        {words.map((word, wIdx) => (
                                                            <span
                                                                key={wIdx}
                                                                className="roll-unit relative inline-block overflow-hidden h-[1.25em] leading-[1.25em] align-top"
                                                            >
                                                                <span
                                                                    className="roll-primary block"
                                                                    style={{ transitionDelay: `${wIdx * 20}ms` }}
                                                                >
                                                                    {word}
                                                                </span>
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="roll-clone block absolute top-full left-0 select-none pointer-events-none"
                                                                    style={{ transitionDelay: `${wIdx * 20}ms` }}
                                                                >
                                                                    {word}
                                                                </span>
                                                            </span>
                                                        ))}
                                                    </span>
                                                </h3>
                                                </div>
                                            </div>

                                            <p className="text-[#F0E5D5]/75 font-sans text-sm md:text-base leading-relaxed mb-8">
                                                {event.description}
                                            </p>

                                            <div className="self-start relative">
                                                <div className="card-action-btn flex items-center gap-4 px-8 py-4 bg-[#E7B878] text-[#0B0B0D] font-cinzel font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(231,184,120,0.35)]">
                                                    <span className="text-lg md:text-xl">Uncover Secrets</span>
                                                    <ArrowRight className="card-arrow-icon w-6 h-6 stroke-[3]" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </TiltCard>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
