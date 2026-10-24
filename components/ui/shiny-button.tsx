"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 1 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.97 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1.2,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 300,
      damping: 12,
      mass: 0.4,
    },
  },
} as const;

export interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, disabled, type = "button", ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      {...animationProps}
      {...(props as any)}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl px-8 py-4 font-cinzel font-bold text-base md:text-lg uppercase tracking-[0.2em] backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-[0_0_35px_rgba(231,184,120,0.45)] bg-[#1B1A19]/90 border border-[#B97843]/60 hover:border-[#E7B878] text-[#F0E5D5] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden group select-none",
        className
      )}
    >
      <span
        className="relative z-10 flex items-center justify-center gap-3 w-full tracking-widest text-[#F0E5D5] group-hover:text-white transition-colors"
        style={{
          maskImage:
            "linear-gradient(-75deg, #F0E5D5 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #F0E5D5 calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg, #F0E5D5 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #F0E5D5 calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="absolute inset-0 z-20 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(185,120,67,0.3)_calc(var(--x)+20%),rgba(231,184,120,0.95)_calc(var(--x)+25%),rgba(185,120,67,0.3)_calc(var(--x)+100%))] p-[1.5px] pointer-events-none"
      />
    </motion.button>
  );
});

ShinyButton.displayName = "ShinyButton";
export default ShinyButton;
