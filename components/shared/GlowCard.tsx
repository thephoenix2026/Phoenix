"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

export default function GlowCard({
  children,
  className,
  glowColor = "#00d4ff",
  delay = 0,
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-xl bg-[#111118]/80 backdrop-blur-xl border border-[#2a2a3e] p-6 transition-all duration-300",
        className
      )}
      style={{
        borderColor: isHovered ? glowColor : undefined,
        boxShadow: isHovered
          ? `0 0 20px ${glowColor}33, 0 0 40px ${glowColor}1a`
          : "none",
      }}
    >
      {children}
    </motion.div>
  );
}
