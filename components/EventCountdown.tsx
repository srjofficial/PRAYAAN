"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
    targetDate: string;
    targetTime: string;
}

export default function EventCountdown({ targetDate, targetTime }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Parse the target string
        // Assuming targetDate is like "March 11, 2026"
        // And targetTime is like "11:30 AM to 1:30 PM", we just take the first part "11:30 AM"

        try {
            const startTimeString = targetTime.split(" to ")[0];
            const dateString = `${targetDate} ${startTimeString}`;
            const target = new Date(dateString).getTime();

            const calculateRemaining = () => {
                const now = new Date().getTime();
                const difference = target - now;

                if (difference <= 0) {
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                } else {
                    setTimeLeft({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    });
                }
            };

            calculateRemaining();
            const interval = setInterval(calculateRemaining, 1000);

            return () => clearInterval(interval);
        } catch (e) {
            console.error("Error parsing date for countdown:", e);
        }
    }, [targetDate, targetTime]);

    if (!isClient) return null; // Avoid hydration mismatch

    const timeUnits = [
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds },
    ];

    return (
        <div className="mb-12 p-6 md:p-8 bg-[#1B1A19]/85 border border-[#B97843]/35 rounded-xl flex flex-col items-center justify-center backdrop-blur-sm shadow-[0_0_25px_rgba(185,120,67,0.15)]">
            <h3 className="font-mono text-xs sm:text-sm text-[#B97843] tracking-widest uppercase mb-6 text-center font-bold">
                TIME TO PROTOCOL INITIATION
            </h3>
            <div className="flex gap-4 md:gap-8 justify-center w-full">
                {timeUnits.map((unit, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div className="text-3xl md:text-5xl lg:text-6xl font-black font-mono text-[#F0E5D5] tracking-tighter drop-shadow-[0_0_15px_rgba(231,184,120,0.45)]">
                            {unit.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-[10px] md:text-xs text-[#B97843] font-mono mt-2 tracking-widest font-semibold">
                            {unit.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
