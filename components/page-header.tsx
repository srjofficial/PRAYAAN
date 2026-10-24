import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
    title: string
    subtitle: string
    description: string
    backLink?: string
    backLabel?: string
}

export default function PageHeader({ title, subtitle, description, backLink, backLabel }: PageHeaderProps) {
    return (
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0B0B0D] grid-bg noise-overlay pt-20 lg:pt-0">
            {/* Radial gradient overlay with warm amber and subtle cosmic navy */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,120,67,0.12)_0%,rgba(16,27,43,0.25)_50%,transparent_75%)]" />

            <div className="relative z-10 text-center px-4">
                {/* Back link */}
                {backLink && (
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-[10px] font-space text-[#F0E5D5]/60 tracking-widest hover:text-[#E7B878] transition-colors mb-8 uppercase font-bold"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#B97843]" />
                        {backLabel || "BACK"}
                    </Link>
                )}

                {/* Top label */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="h-px w-8 bg-[#B97843]/60" />
                    <span className="text-[10px] md:text-xs font-space tracking-[0.3em] text-[#E7B878] uppercase font-bold">
                        {subtitle}
                    </span>
                    <span className="h-px w-8 bg-[#B97843]/60" />
                </div>

                {/* Main title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-title font-semibold tracking-wider leading-none text-[#F0E5D5] drop-shadow-[0_0_35px_rgba(231,184,120,0.3)]">
                    {title}
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base font-space text-[#F0E5D5]/80 mt-6 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    )
}
