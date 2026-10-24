"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SymmetricWaveProps {
  className?: string;
  barClassName?: string;
  count?: number;
  height?: number | string;
}

export function SymmetricWave({
  className,
  barClassName,
  count = 9,
  height = 48,
}: SymmetricWaveProps) {
  const center = Math.floor(count / 2);

  return (
    <div
      className={cn("flex items-center justify-center gap-1.5", className)}
      style={{ height }}
      role="status"
      aria-label="Loading..."
    >
      {Array.from({ length: count }).map((_, index) => {
        const distanceFromCenter = Math.abs(index - center);
        const delay = distanceFromCenter * 0.12;

        return (
          <motion.span
            key={index}
            className={cn(
              "w-1.5 md:w-2 rounded-full bg-gradient-to-t from-[#B97843] via-[#E7B878] to-[#F0E5D5] shadow-[0_0_12px_rgba(231,184,120,0.6)]",
              barClassName
            )}
            animate={{
              scaleY: [0.25, 1, 0.25],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
            style={{
              height: "100%",
              transformOrigin: "center",
            }}
          />
        );
      })}
    </div>
  );
}

export function SymmetricWaveDemo() {
  return <SymmetricWave />;
}

export default SymmetricWave;
