"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { projectTimeline } from "@/lib/data/stats"
import {
  Lightbulb,
  BookOpen,
  Layers,
  Cpu,
  Database,
  Brain,
  Smartphone,
  Puzzle,
  Trophy,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  BookOpen,
  Layers,
  Cpu,
  Database,
  Brain,
  Smartphone,
  Puzzle,
  Trophy,
}

function TimelineDot({ item, index }: { item: (typeof projectTimeline)[0]; index: number }) {
  const Icon = iconMap[item.icon] || Lightbulb

  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-10">
      {/* Outer pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: item.color }}
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
      />
      {/* Glow ring */}
      <motion.div
        className="absolute -inset-1 rounded-full"
        style={{ backgroundColor: item.color }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.2, 0, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.3 + 0.5,
          ease: "easeInOut",
        }}
      />
      {/* Main dot */}
      <motion.div
        className="relative w-10 h-10 rounded-full flex items-center justify-center border-2"
        style={{
          backgroundColor: `${item.color}20`,
          borderColor: item.color,
          boxShadow: `0 0 20px ${item.color}60, 0 0 40px ${item.color}30`,
        }}
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </motion.div>
    </div>
  )
}

function TimelineCard({ item, index }: { item: (typeof projectTimeline)[0]; index: number }) {
  const isTop = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -50 : 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: isTop ? undefined : undefined }}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-56 ${isTop ? "bottom-14" : "top-14"}`}
      >
        <motion.div
          className="relative rounded-xl border p-4 backdrop-blur-sm overflow-hidden group cursor-default"
          style={{
            borderColor: `${item.color}30`,
            backgroundColor: `${item.color}08`,
          }}
          whileHover={{
            borderColor: `${item.color}60`,
            backgroundColor: `${item.color}15`,
            y: isTop ? -4 : 4,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Shimmer effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${item.color}10 50%, transparent 70%)`,
            }}
          />

          {/* Date badge */}
          <motion.div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider mb-2"
            style={{
              backgroundColor: `${item.color}20`,
              color: item.color,
              border: `1px solid ${item.color}30`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
            {item.date}
          </motion.div>

          {/* Title */}
          <div className="text-sm font-bold text-white mb-1 leading-tight">
            {item.title}
          </div>

          {/* Description */}
          <div className="text-[11px] text-gray-400 leading-relaxed">
            {item.description}
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: item.color }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ResearchTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div className="w-full overflow-x-auto py-8 scrollbar-hide" ref={containerRef}>
      <div className="relative min-w-[1200px] h-[420px] px-8">
        {/* Animated gradient line */}
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2">
          {/* Base line */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#ef4444] rounded-full" />

          {/* Animated shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-red-500/20 blur-lg rounded-full" />
        </div>

        {/* Timeline items */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2">
          {projectTimeline.map((item, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${(index / (projectTimeline.length - 1)) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {/* Connecting line */}
              <motion.div
                className={`absolute left-1/2 w-px -translate-x-1/2 ${
                  index % 2 === 0 ? "bottom-0" : "top-0"
                }`}
                style={{
                  height: "52px",
                  background: `linear-gradient(${index % 2 === 0 ? "to top" : "to bottom"}, ${item.color}, transparent)`,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />

              {/* Dot */}
              <TimelineDot item={item} index={index} />

              {/* Card */}
              <TimelineCard item={item} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: projectTimeline[i % projectTimeline.length].color,
              left: `${10 + (i / 11) * 80}%`,
              top: `${20 + Math.sin(i * 1.2) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Start label */}
        <motion.div
          className="absolute left-8 top-1/2 -translate-y-1/2 -translate-x-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase">
            Start
          </div>
        </motion.div>

        {/* End label */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 translate-x-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-[10px] font-mono text-red-400/60 tracking-widest uppercase">
            Launch
          </div>
        </motion.div>
      </div>
    </div>
  )
}
