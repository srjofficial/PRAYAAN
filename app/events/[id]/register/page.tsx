"use client";

import { use, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle2, QrCode, CreditCard, Send, Download, Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { eventsData } from "@/lib/stranger-events-data";
import SiteFooter from "@/components/SiteFooter";
import FloatingSpores from "@/components/FloatingSpores";
import { ShinyButton } from "@/components/ui/shiny-button";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function RegistrationPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const eventId = resolvedParams.id;
    const event = eventsData[eventId];

    const isIndividual = eventId === "blind-typing" || eventId === "fun-games" || eventId === "spot-choreo" || event?.maxTeamSize === 1;
    const minSize = event?.minTeamSize ?? 1;
    const maxSize = event?.maxTeamSize ?? 1;

    // Team size dropdown options
    const teamSizeOptions = minSize < maxSize
        ? Array.from({ length: maxSize - minSize + 1 }, (_, i) => minSize + i)
        : [minSize];

    const initialTeamSize = isIndividual ? 1 : (teamSizeOptions[teamSizeOptions.length - 1] ?? 2);
    const [selectedTeamSize, setSelectedTeamSize] = useState<number>(initialTeamSize);
    const [submittingState, setSubmittingState] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [qrFullscreen, setQrFullscreen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const calculateFee = () => {
        if (eventId === "website-60") {
            return selectedTeamSize * 50; // ₹50 per head
        }
        if (event?.registrationFee) {
            return parseInt(event.registrationFee, 10);
        }
        return 100;
    };

    if (!event) {
        notFound();
    }

    if (event.isOnSpot) {
        return (
            <main className="min-h-screen bg-[#0B0B0D] text-[#F0E5D5] flex flex-col justify-between selection:bg-[#B97843]/30 selection:text-[#F0E5D5]">
                {/* Cinematic Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover opacity-15 mix-blend-screen grayscale-[40%] blur-sm"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/85 to-[#0B0B0D] z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,39,32,0.35)_0%,rgba(16,27,43,0.2)_50%,transparent_100%)] z-10" />
                </div>

                <FloatingSpores />

                {/* Nav */}
                <nav className="relative z-50 w-full p-6 flex items-center justify-between">
                    <Link href={`/events/${eventId}`} className="group flex items-center gap-2 text-[#F0E5D5]/60 hover:text-[#E7B878] transition-colors">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm uppercase tracking-widest">Back to Event</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="w-16 h-px bg-[#B97843]/50" />
                        <span className="font-cinzel text-[#E7B878] tracking-widest text-sm">PRAYAAN</span>
                    </div>
                </nav>

                {/* Card Container */}
                <div className="relative z-20 max-w-3xl mx-auto px-6 py-12 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="p-8 md:p-12 rounded-3xl bg-[#1B1A19]/90 border border-[#E7B878]/40 shadow-[0_0_50px_rgba(231,184,120,0.2)] flex flex-col items-center w-full"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#E7B878]/15 border border-[#E7B878]/60 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(231,184,120,0.3)]">
                            <Sparkles className="w-10 h-10 text-[#E7B878] animate-pulse" />
                        </div>

                        <span className="px-4 py-1.5 rounded-full bg-[#E7B878]/15 border border-[#E7B878]/50 text-[#E7B878] font-mono text-xs uppercase tracking-widest font-bold mb-4">
                            Spot Entry Only
                        </span>

                        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F0E5D5] via-[#E7B878] to-[#B97843] mb-4">
                            {event.title}
                        </h1>

                        <p className="font-sans text-base md:text-lg text-[#F0E5D5]/80 max-w-lg mb-8 leading-relaxed">
                            Online advance registration is not required. <strong>{event.title} is on-spot participation only!</strong> Walk in directly at the venue during event hours to participate.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
                            <div className="p-4 rounded-xl bg-[#0B0B0D]/70 border border-[#B97843]/30">
                                <span className="font-mono text-xs uppercase text-[#B97843] block mb-1">Venue</span>
                                <span className="font-medium text-[#F0E5D5]">{event.venue || "Smart Class"}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-[#0B0B0D]/70 border border-[#B97843]/30">
                                <span className="font-mono text-xs uppercase text-[#B97843] block mb-1">Timing</span>
                                <span className="font-medium text-[#F0E5D5]">{event.time || "10:00 AM onwards"}</span>
                            </div>
                            <div className="p-4 rounded-xl bg-[#0B0B0D]/70 border border-[#B97843]/30">
                                <span className="font-mono text-xs uppercase text-[#B97843] block mb-1">Spot Fee</span>
                                <span className="font-medium text-[#E7B878]">₹{event.registrationFee} per head</span>
                            </div>
                        </div>

                        <Link href={`/events/${eventId}`}>
                            <ShinyButton className="px-8 py-4 text-base md:text-lg rounded-full">
                                Return to Event Details
                            </ShinyButton>
                        </Link>
                    </motion.div>
                </div>

                <SiteFooter />
            </main>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("UPLOAD PROTOCOL ERROR: Payment receipt is mandatory for survival.");
            return;
        }

        const file = fileInput.files[0];

        // Ensure file is smaller than ~5MB for Apps Script safety
        if (file.size > 5 * 1024 * 1024) {
            alert("File too large. Maximum size is 5MB.");
            return;
        }

        setSubmittingState("COMPRESSING IMAGE...");

        try {
            // Compress or fallback to raw Base64
            const getOptimalBase64 = (file: File): Promise<{ base64: string, name: string, type: string }> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (event) => {
                        const rawResult = event.target?.result as string;
                        if (!rawResult) return reject("File reading failed");

                        // If not an easily compressible image, just return raw base64
                        if (!file.type.startsWith('image/') || file.type.includes('heic') || file.type.includes('gif')) {
                            return resolve({
                                base64: rawResult.split(',')[1],
                                name: file.name,
                                type: file.type
                            });
                        }

                        const img = new window.Image();
                        img.onload = () => {
                            try {
                                const canvas = document.createElement('canvas');
                                const MAX_WIDTH = 1200;
                                const MAX_HEIGHT = 1200;
                                let width = img.width;
                                let height = img.height;

                                if (width > height) {
                                    if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                                } else {
                                    if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                                }
                                canvas.width = width;
                                canvas.height = height;

                                const ctx = canvas.getContext('2d');
                                if (!ctx) throw new Error("Canvas not supported");
                                ctx.drawImage(img, 0, 0, width, height);

                                const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
                                resolve({
                                    base64: dataUrl.split(',')[1],
                                    name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                                    type: 'image/jpeg'
                                });
                            } catch (e) {
                                console.warn("Compression failed, using raw file:", e);
                                resolve({
                                    base64: rawResult.split(',')[1],
                                    name: file.name,
                                    type: file.type
                                });
                            }
                        };
                        img.onerror = () => {
                            console.warn("Image decode failed (might be HEIC), using raw file");
                            resolve({
                                base64: rawResult.split(',')[1],
                                name: file.name,
                                type: file.type
                            });
                        };
                        img.src = rawResult;
                    };
                    reader.onerror = (error) => reject(error);
                });
            };

            setSubmittingState("PREPARING PAYLOAD...");
            const formData = new FormData(e.currentTarget); // capture synchronous form values
            const fileData = await getOptimalBase64(file);  // wait for async compression
            setSubmittingState("UPLOADING...");

            const teamSizeVal = isIndividual ? "1" : (formData.get("teamSize")?.toString() || String(selectedTeamSize));
            const teamNameVal = formData.get("teamName")?.toString() || "";

            const memberNamesList: string[] = [];
            const sizeNum = parseInt(teamSizeVal, 10) || 1;
            for (let i = 2; i <= sizeNum; i++) {
                const mName = formData.get(`member_${i}`)?.toString()?.trim();
                if (mName) memberNamesList.push(`Member ${i}: ${mName}`);
            }
            const memberNamesVal = memberNamesList.join(", ");

            const member2Val = formData.get("member_2")?.toString()?.trim() || "";
            const member3Val = formData.get("member_3")?.toString()?.trim() || "";

            const data = {
                eventId: eventId,
                eventTitle: event.title,
                teamName: teamNameVal,
                fullname: formData.get("fullname")?.toString() || "",
                teamSize: teamSizeVal,
                member2: member2Val,
                member3: member3Val,
                memberNames: memberNamesVal,
                college: formData.get("college")?.toString() || "",
                phone: formData.get("phone")?.toString() || "",
                email: formData.get("email")?.toString() || "",
                amount: String(calculateFee()),
                timestamp: new Date().toISOString(),
                fileContent: fileData.base64,
                fileName: fileData.name,
                mimeType: fileData.type
            };

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                // If the server threw a 413 Payload too large, it returns HTML
                throw new Error("Server returned non-JSON. File might be too large! " + response.status);
            }

            if (result.success) {
                setIsSuccess(true);
            } else {
                alert(result.message || "Transmission error. Try again.");
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            alert(`Error: ${error.message || error}`);
        } finally {
            setSubmittingState(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const qrImageSrc = event?.qrCode || "/home/upi-qr.jpg";
    const QR_DOWNLOAD_URL = `/api/download-qr?event=${eventId}`;

    // 3D Text Style
    const text3DStyle = {
        textShadow: "2px 2px 0px rgba(52, 39, 32, 0.9), 4px 4px 0px rgba(11, 11, 13, 0.8)"
    };

    return (
        <main className="min-h-screen bg-[#0B0B0D] text-[#F0E5D5] overflow-hidden selection:bg-[#B97843]/30 selection:text-[#F0E5D5] font-sans">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover opacity-10 blur-xl grayscale"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/90 to-[#101B2B]/30 z-10" />
            </div>

            {/* Atmosphere */}
            <FloatingSpores />

            {/* Navigation */}
            <nav className="relative z-50 w-full p-6 flex items-center justify-between">
                <Link href={`/events/${eventId}`} className="group flex items-center gap-2 text-[#F0E5D5]/60 hover:text-[#E7B878] transition-colors">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm uppercase tracking-widest">Return to Event</span>
                </Link>
                <div className="hidden md:flex items-center gap-2">
                    <span className="w-16 h-px bg-[#B97843]/50" />
                    <span className="font-cinzel text-[#E7B878] tracking-widest text-sm">REGISTRATION PROTOCOL</span>
                </div>
            </nav>

            <div className="relative z-20 max-w-4xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="registration-form"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-[#1B1A19]/90 backdrop-blur-xl border border-[#B97843]/35 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(52,39,32,0.6)] relative overflow-hidden"
                        >
                            {/* Decorative scanline effect */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(240,229,213,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(231,184,120,0.06),rgba(0,0,0,0.02),rgba(185,120,67,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

                            <div className="text-center mb-12">
                                <motion.h1
                                    className="font-cinzel text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F0E5D5] via-[#E7B878] to-[#B97843] mb-4 tracking-wider"
                                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    style={{ backgroundSize: "200%", ...text3DStyle }}
                                >
                                    REGISTRATION ENTRY
                                </motion.h1>
                                <p className="font-mono text-sm text-[#E7B878] tracking-[0.3em] uppercase mb-4" style={text3DStyle}>Event: {event.title}</p>
                                
                                {/* Date, Time & Venue info */}
                                <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-2.5 rounded-full border border-[#B97843]/40 bg-[#0B0B0D]/80 font-mono text-xs uppercase tracking-wider">
                                    {event.date && (
                                        <span className="flex items-center gap-1.5 text-[#E7B878] font-bold">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {event.date}
                                        </span>
                                    )}
                                    {event.time && (
                                        <span className="flex items-center gap-1.5 text-[#F0E5D5]/80">
                                            <Clock className="w-3.5 h-3.5 text-[#B97843]" />
                                            {event.time}
                                        </span>
                                    )}
                                    {event.venue && (
                                        <span className="flex items-center gap-1.5 text-[#F0E5D5]/70 hidden sm:flex">
                                            <MapPin className="w-3.5 h-3.5 text-[#B97843]" />
                                            {event.venue}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {isIndividual ? (
                                    <>
                                        <input type="hidden" name="teamSize" value="1" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Participant Name */}
                                            <div className="space-y-4">
                                                <label htmlFor="fullname" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                    Participant Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                        <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                    </div>
                                                    <input
                                                        required
                                                        id="fullname"
                                                        name="fullname"
                                                        type="text"
                                                        autoComplete="name"
                                                        placeholder="Enter your full name"
                                                        className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* College Name */}
                                            <div className="space-y-4">
                                                <label htmlFor="college" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                    College Name
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                        <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                    </div>
                                                    <input
                                                        required
                                                        id="college"
                                                        name="college"
                                                        type="text"
                                                        autoComplete="organization"
                                                        placeholder="Enter your college name"
                                                        className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone Number */}
                                            <div className={`space-y-4 ${eventId !== "blind-typing" ? "md:col-span-2" : ""}`}>
                                                <label htmlFor="phone" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                    Phone Number
                                                </label>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                        <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                    </div>
                                                    <input
                                                        required
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        autoComplete="tel"
                                                        placeholder="10 DIGIT NUMBER"
                                                        pattern="[0-9]{10}"
                                                        maxLength={10}
                                                        minLength={10}
                                                        onInput={(e) => {
                                                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                                        }}
                                                        title="Please enter exactly 10 digits"
                                                        className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email ID (for Blind Typing) */}
                                            {eventId === "blind-typing" && (
                                                <div className="space-y-4">
                                                    <label htmlFor="email" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                        Email ID
                                                    </label>
                                                    <div className="relative group">
                                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                            <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                        </div>
                                                        <input
                                                            required
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            placeholder="Enter your email address"
                                                            className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Team Name */}
                                        <div className="space-y-4">
                                            <label htmlFor="teamName" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                Team Name
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <input
                                                    required
                                                    id="teamName"
                                                    name="teamName"
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Enter your team name"
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* No: of Team Members (Select option) */}
                                        <div className="space-y-4">
                                            <label htmlFor="teamSize" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                No: of Team Members
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <select
                                                    required
                                                    id="teamSize"
                                                    name="teamSize"
                                                    value={selectedTeamSize}
                                                    onChange={(e) => setSelectedTeamSize(parseInt(e.target.value, 10))}
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] font-cinzel text-lg tracking-widest rounded-t-lg appearance-none cursor-pointer"
                                                >
                                                    {teamSizeOptions.map((count) => (
                                                        <option key={count} value={count} className="bg-[#1B1A19] text-[#F0E5D5] font-sans text-base">
                                                            {count} {count === 1 ? "Member (Individual)" : "Members"}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                    <span className="text-[#E7B878] font-black text-sm">▼</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Team Leader Name */}
                                        <div className="space-y-4">
                                            <label htmlFor="fullname" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                Team Leader Name
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <input
                                                    required
                                                    id="fullname"
                                                    name="fullname"
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="Enter team leader full name"
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* College Name */}
                                        <div className="space-y-4">
                                            <label htmlFor="college" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                College Name
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <input
                                                    required
                                                    id="college"
                                                    name="college"
                                                    type="text"
                                                    autoComplete="organization"
                                                    placeholder="Enter college name"
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Team Leader Phone Number */}
                                        <div className="space-y-4">
                                            <label htmlFor="phone" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                Team Leader Phone Number
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <input
                                                    required
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    autoComplete="tel"
                                                    placeholder="10 DIGIT NUMBER"
                                                    pattern="[0-9]{10}"
                                                    maxLength={10}
                                                    minLength={10}
                                                    onInput={(e) => {
                                                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                                    }}
                                                    title="Please enter exactly 10 digits"
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Team Leader Email */}
                                        <div className="space-y-4">
                                            <label htmlFor="email" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                Team Leader Email
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                    <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                </div>
                                                <input
                                                    required
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="leader@example.com"
                                                    className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Team Members Names */}
                                        {selectedTeamSize > 1 && (
                                            <div className="md:col-span-2 pt-6 border-t border-[#342720]/50 space-y-6">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-2.5 h-2.5 bg-[#E7B878] rounded-full animate-ping" />
                                                    <h4 className="font-cinzel text-xl text-[#E7B878] font-bold tracking-widest uppercase">
                                                        Team Members Names
                                                    </h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {Array.from({ length: selectedTeamSize - 1 }, (_, idx) => {
                                                        const memberNum = idx + 2;
                                                        return (
                                                            <div key={memberNum} className="space-y-4">
                                                                <label htmlFor={`member_${memberNum}`} className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                                    <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                                    Member {memberNum} Name
                                                                </label>
                                                                <div className="relative group">
                                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:translate-x-1">
                                                                        <span className="text-[#B97843]/60 group-focus-within:text-[#E7B878] font-black">❯</span>
                                                                    </div>
                                                                    <input
                                                                        required
                                                                        id={`member_${memberNum}`}
                                                                        name={`member_${memberNum}`}
                                                                        type="text"
                                                                        autoComplete="off"
                                                                        placeholder={`Enter member ${memberNum} name`}
                                                                        className="w-full bg-[#0B0B0D]/90 border-b-2 border-[#B97843]/40 px-10 py-5 focus:outline-none focus:border-[#E7B878] focus:bg-[#342720]/25 transition-all text-[#F0E5D5] placeholder:text-[#F0E5D5]/30 font-cinzel text-lg tracking-widest rounded-t-lg"
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Payment Section */}
                                <div className="mt-16 pt-8 border-t border-[#342720]/50 relative">
                                    <h3 className="font-cinzel text-2xl md:text-3xl text-[#E7B878] mb-2 flex items-center gap-4 tracking-widest drop-shadow-[0_0_12px_rgba(231,184,120,0.3)]">
                                        <QrCode className="w-8 h-8 opacity-80 text-[#B97843]" />
                                        PAYMENT PROTOCOL
                                    </h3>
                                    <p className="text-[#F0E5D5]/70 font-mono text-xs md:text-sm uppercase tracking-widest mb-8">
                                        Total Amount Due: <span className="text-[#F0E5D5] font-black text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(231,184,120,0.4)]">₹{calculateFee()}</span>
                                        {eventId === "website-60" && (
                                            <span className="ml-3 text-[#B97843] font-mono text-xs tracking-wider">
                                                (Team of 2 — ₹50 per head)
                                            </span>
                                        )}
                                    </p>

                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="relative group/qr shrink-0">
                                            <div className="absolute -inset-4 bg-[#B97843]/10 rounded-2xl group-hover/qr:bg-[#E7B878]/15 transition-colors pointer-events-none" />
                                            <motion.div
                                                whileHover={{ y: -5 }}
                                                onClick={() => setQrFullscreen(true)}
                                                className="relative w-80 h-80 overflow-hidden rounded-xl border border-[#B97843]/40 bg-[#1B1A19] p-2 shadow-2xl cursor-zoom-in"
                                            >
                                                <Image
                                                    src={qrImageSrc}
                                                    alt={`${event.title} Payment QR`}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </motion.div>
                                            {/* Download Button */}
                                            <button
                                                type="button"
                                                onClick={() => { window.location.href = QR_DOWNLOAD_URL; }}
                                                className="relative z-10 mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#B97843]/40 bg-[#1B1A19] text-[#F0E5D5]/80 hover:text-[#F0E5D5] hover:border-[#E7B878] hover:bg-[#342720]/40 transition-all duration-300 font-mono text-xs uppercase tracking-widest group/dl"
                                            >
                                                <Download className="w-3.5 h-3.5 group-hover/dl:-translate-y-0.5 group-hover/dl:translate-x-0.5 transition-transform text-[#E7B878]" />
                                                Download QR
                                            </button>
                                        </div>

                                        <div className="flex-1 space-y-8 flex flex-col justify-center">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="receipt" className="text-[#E7B878] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-[#E7B878] rounded-full animate-pulse shadow-[0_0_8px_rgba(231,184,120,0.8)]" />
                                                        Upload Payment Receipt
                                                    </label>
                                                    <span className="bg-[#B97843] text-[#0B0B0D] text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">Mandatory</span>
                                                </div>
                                                <div className="relative group">
                                                    <input
                                                        required
                                                        type="file"
                                                        accept="image/*"
                                                        id="receipt"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                    />
                                                    <label
                                                        htmlFor="receipt"
                                                        className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-[#B97843]/40 rounded-xl px-6 py-8 hover:border-[#E7B878] hover:bg-[#342720]/30 transition-all cursor-pointer group-hover:shadow-[0_0_20px_rgba(231,184,120,0.15)] bg-[#1B1A19]/50"
                                                    >
                                                        {fileName ? (
                                                            <>
                                                                <CheckCircle2 className="w-6 h-6 text-[#E7B878]" />
                                                                <span className="text-[#E7B878] font-mono text-sm truncate max-w-[200px]">{fileName}</span>
                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="w-6 h-6 text-[#B97843] group-hover:text-[#E7B878] transition-colors group-hover:-translate-y-1" />
                                                                <span className="text-[#F0E5D5]/60 font-mono text-xs uppercase tracking-widest group-hover:text-[#F0E5D5] transition-colors">Choose File / Screenshot</span>
                                                            </>
                                                        )}
                                                    </label>
                                                </div>
                                                <p className="text-[#F0E5D5]/40 font-mono text-[10px] mt-2 uppercase tracking-wider">Max file size: 5MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                 {/* Shiny Submit Button */}
                                <div className="relative pt-6 pb-4">
                                    <ShinyButton
                                        type="submit"
                                        disabled={submittingState !== null}
                                        className="w-full py-6 text-xl md:text-2xl"
                                    >
                                        {submittingState !== null ? (
                                            <span className="flex items-center justify-center gap-4">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-6 h-6 border-2 border-[#E7B878]/30 border-t-[#E7B878] rounded-full"
                                                />
                                                <span>{submittingState}</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-4">
                                                <span>CONFIRM ENTRY</span>
                                                <Send className="w-6 h-6 text-[#E7B878] group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                                            </span>
                                        )}
                                    </ShinyButton>
                                </div>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success-message"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
                            className="text-center py-32 px-8 flex flex-col items-center justify-center relative z-50 min-h-[50vh]"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                                className="relative mb-12 flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-[#E7B878]/30 rounded-full blur-2xl"
                                />
                                <div className="w-28 h-28 bg-[#1B1A19] border-4 border-[#E7B878]/80 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(231,184,120,0.5),inset_0_0_20px_rgba(231,184,120,0.3)] relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.8, type: "spring", bounce: 0.6 }}
                                    >
                                        <CheckCircle2 className="w-16 h-16 text-[#E7B878] drop-shadow-[0_0_15px_rgba(231,184,120,1)]" strokeWidth={2.5} />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <div className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#F0E5D5] via-[#E7B878] to-[#B97843] font-bold mb-16 tracking-widest uppercase cursor-default select-none drop-shadow-[0_0_30px_rgba(231,184,120,0.4)]">
                                ENTRY CONFIRMED
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                            >
                                <Link href="/">
                                    <ShinyButton className="px-12 py-5 text-lg">
                                        Return to Surface
                                    </ShinyButton>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* QR Fullscreen Lightbox */}
            <AnimatePresence>
                {qrFullscreen && (
                    <motion.div
                        key="qr-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setQrFullscreen(false)}
                        className="fixed inset-0 z-[9999] bg-[#0B0B0D]/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setQrFullscreen(false)}
                            className="absolute top-6 right-6 text-[#F0E5D5]/60 hover:text-[#E7B878] text-4xl font-thin leading-none transition-colors"
                        >
                            ✕
                        </button>
                        {/* QR Image */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-[90vmin] h-[90vmin] max-w-lg max-h-lg bg-[#1B1A19] border border-[#B97843]/50 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(231,184,120,0.25)] cursor-default"
                        >
                            <Image
                                src={qrImageSrc}
                                alt={`${event.title} Payment QR Fullscreen`}
                                fill
                                className="object-contain p-4"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Verification Processing Popup */}
            <AnimatePresence>
                {submittingState !== null && (
                    <motion.div
                        key="verification-popup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998] bg-[#0B0B0D]/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            className="flex flex-col items-center gap-8 text-center max-w-sm"
                        >
                            {/* Animated Buffering Ring */}
                            <div className="relative w-28 h-28">
                                {/* Outer glow ring */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#E7B878] border-r-[#E7B878]/30"
                                />
                                {/* Middle ring */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-3 rounded-full border-4 border-transparent border-t-[#B97843] border-r-[#B97843]/20"
                                />
                                {/* Inner pulsing dot */}
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-4 h-4 rounded-full bg-[#E7B878] shadow-[0_0_15px_rgba(231,184,120,1)]" />
                                </motion.div>
                            </div>

                            {/* Status Text */}
                            <div className="space-y-2">
                                <motion.p
                                    key={submittingState}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-cinzel text-xl md:text-2xl text-[#F0E5D5] font-bold tracking-widest uppercase"
                                >
                                    {submittingState}
                                </motion.p>
                                <p className="font-mono text-xs text-[#F0E5D5]/60 tracking-wider uppercase">
                                    Processing your registration...
                                </p>
                            </div>

                            {/* Warning */}
                            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#B97843]/50 bg-[#342720]/50">
                                <motion.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-[#E7B878] shrink-0"
                                />
                                <p className="font-mono text-xs text-[#E7B878] tracking-wider uppercase">
                                    Do not close or refresh this window
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <SiteFooter />
        </main>
    );
}
