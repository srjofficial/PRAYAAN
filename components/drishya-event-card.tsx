import { Clock, MapPin } from "lucide-react"

interface DrishyaEventCardProps {
    name: string
    time: string
    location: string
    index: number
}

export default function DrishyaEventCard({ name, time, location, index }: DrishyaEventCardProps) {
    // Format index to always be 2 digits
    const formattedIndex = String(index + 1).padStart(2, "0");

    return (
        <div className="group relative border border-[#342720] bg-[#1B1A19] hover:border-[#B97843]/50 transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden rounded-sm">
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B97843]/10 via-[#342720]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex justify-between items-start relative z-10">
                <span className="font-space text-[10px] font-bold text-[#E7B878]/80 tracking-[0.3em] uppercase">
                    #{formattedIndex}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#B97843]/40 group-hover:bg-[#E7B878] transition-colors duration-300 shadow-[0_0_6px_rgba(231,184,120,0.6)]" />
            </div>

            <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-title font-semibold text-[#F0E5D5] tracking-wide leading-snug group-hover:text-[#E7B878] transition-colors duration-300">
                    {name}
                </h3>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#342720]/80 pt-5 relative z-10">
                <div className="flex items-center gap-3 text-xs md:text-sm font-space text-[#F0E5D5]/60 group-hover:text-[#F0E5D5]/90 transition-colors duration-300">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B97843] group-hover:text-[#E7B878] transition-colors" />
                    <span className="truncate tracking-wide">{location}</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-space text-[#F0E5D5]/60 group-hover:text-[#F0E5D5]/90 transition-colors duration-300">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B97843] group-hover:text-[#E7B878] transition-colors" />
                    <span className="truncate tracking-wide">{time}</span>
                </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-[#E7B878]" />
                <div className="absolute top-0 right-0 h-full w-[1px] bg-[#E7B878]" />
            </div>
        </div>
    )
}
