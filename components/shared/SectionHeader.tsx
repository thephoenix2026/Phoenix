"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  color?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  align = "left",
  color = "#00d4ff",
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      {badge && (
        <span className="inline-block rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-xs uppercase tracking-wider px-4 py-1.5 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 rounded-full mt-3"
        style={{
          backgroundColor: color,
          marginLeft: align === "center" ? "auto" : undefined,
          marginRight: align === "center" ? "auto" : undefined,
        }}
      />
      {subtitle && (
        <p className="text-[#94a3b8] text-lg mt-3 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
