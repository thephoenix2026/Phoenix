"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TypewriterText from "@/components/shared/TypewriterText";

/* ─── Floating Particles (deterministic) ─── */
function HeroParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        w: 1.5 + (((i * 7 + 3) % 11) / 11) * 4,
        left: (i * 37 + 17) % 100,
        top: (i * 53 + 29) % 100,
        yOff: 20 + ((i * 19 + 11) % 40),
        xOff: ((i * 23 + 7) % 30) - 15,
        dur: 5 + ((i * 11 + 3) % 6),
        delay: (i * 0.3) % 3,
        color:
          i % 5 === 0
            ? "#00d4ff"
            : i % 5 === 1
              ? "#7c3aed"
              : i % 5 === 2
                ? "#f97316"
                : i % 5 === 3
                  ? "#10b981"
                  : "#ec4899",
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.w,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
          }}
          animate={{
            y: [-p.yOff, p.yOff, -p.yOff],
            x: [-p.xOff, p.xOff, -p.xOff],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Background Orbs ─── */
function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { color: "#00d4ff", size: 400, left: "10%", top: "20%", dur: 12 },
        { color: "#7c3aed", size: 350, left: "70%", top: "30%", dur: 15 },
        { color: "#f97316", size: 300, left: "40%", top: "70%", dur: 18 },
        { color: "#10b981", size: 250, left: "80%", top: "80%", dur: 14 },
      ].map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px] opacity-15"
          style={{
            width: o.size,
            height: o.size,
            left: o.left,
            top: o.top,
            backgroundColor: o.color,
          }}
          animate={{
            x: [0, 40 + i * 10, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.2, 0.85, 1],
            opacity: [0.1, 0.25, 0.08, 0.1],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Scan Line ─── */
function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <motion.div
        className="absolute w-full h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.12), transparent)",
        }}
        animate={{ top: ["-5%", "105%", "-5%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Holographic Sweep ─── */
function HoloSweep() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <motion.div
        className="absolute top-0 h-full"
        style={{
          width: "25%",
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.03), rgba(124,58,237,0.05), rgba(249,115,22,0.03), transparent)",
          filter: "blur(30px)",
        }}
        animate={{ left: ["-25%", "125%"] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4,
        }}
      />
    </div>
  );
}

/* ─── Grid Pulse Lines ─── */
function GridPulse() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Horizontal scan */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.06), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Vertical scan */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, rgba(124,58,237,0.06), transparent)",
        }}
        animate={{ left: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Animated Title with Glitch ─── */
function AnimatedTitle() {
  return (
    <div className="relative mb-6">
      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-bold select-none pointer-events-none"
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0, 0.03, 0, 0.02, 0],
          color: ["#ef4444", "#00d4ff", "#ef4444"],
        }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
        aria-hidden
      >
        <span className="text-white">Phoenix</span>
        <span className="text-[#00d4ff]">360</span>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.span
          className="text-white"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0)",
              "0 0 40px rgba(0,212,255,0.3)",
              "0 0 20px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Phoenix
        </motion.span>
        <motion.span
          className="ml-2"
          style={{
            backgroundImage: "linear-gradient(135deg, #00d4ff, #7c3aed, #f97316, #00d4ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundSize: "300% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "300% 50%", "0% 50%"],
            textShadow: [
              "0 0 30px #00d4ff40",
              "0 0 60px #7c3aed50",
              "0 0 30px #00d4ff40",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          360
        </motion.span>
      </motion.h1>
    </div>
  );
}

/* ─── Animated CTA Button ─── */
function CTAButton({
  href,
  children,
  variant = "primary",
  color = "#00d4ff",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  color?: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        className="relative group px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={
          variant === "primary"
            ? {
                backgroundColor: color,
                color: "#0a0a0f",
              }
            : {
                border: `1px solid ${color}40`,
                color: color,
              }
        }
      >
        {/* Energy border glow */}
        <motion.div
          className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="absolute inset-[1px] rounded-xl"
          style={
            variant === "primary"
              ? { backgroundColor: color }
              : { backgroundColor: "#0a0a0f" }
          }
        />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <span className="relative z-10">{children}</span>
      </motion.div>
    </Link>
  );
}

/* ─── Hero Stats ─── */
function HeroStats() {
  const stats = [
    { value: "5", label: "AI Models", color: "#00d4ff" },
    { value: "12+", label: "Sensors", color: "#7c3aed" },
    { value: "96.8%", label: "Accuracy", color: "#10b981" },
    { value: "0.5s", label: "Response", color: "#f97316" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center relative group"
          whileHover={{ scale: 1.1, y: -4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Glow behind */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(circle, ${stat.color}15, transparent 70%)`,
            }}
          />

          <motion.div
            className="text-2xl md:text-3xl font-bold font-mono relative z-10"
            style={{ color: stat.color }}
            animate={{
              textShadow: [
                `0 0 8px ${stat.color}30`,
                `0 0 16px ${stat.color}50`,
                `0 0 8px ${stat.color}30`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-sm text-[#94a3b8] mt-1 relative z-10">
            {stat.label}
          </div>

          {/* Bottom dot */}
          <motion.div
            className="w-1 h-1 rounded-full mx-auto mt-2"
            style={{ backgroundColor: stat.color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Scroll Indicator ─── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[#94a3b8] text-[10px] uppercase tracking-[0.2em] font-mono">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-[#2a2a3e] rounded-full flex justify-center relative">
          {/* Mouse wheel glow */}
          <motion.div
            className="absolute -inset-1 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0px #00d4ff00",
                "0 0 8px #00d4ff30",
                "0 0 0px #00d4ff00",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{
              y: [2, 14, 2],
              opacity: [1, 0.3, 1],
              scaleY: [1, 0.6, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-[#00d4ff] rounded-full mt-1.5"
          />
        </div>
        <motion.div
          className="w-px h-4 bg-gradient-to-b from-[#00d4ff] to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Corner Brackets ─── */
function CornerBrackets() {
  return (
    <>
      {[
        "top-20 left-8",
        "top-20 right-8 rotate-90",
        "bottom-8 right-8 rotate-180",
        "bottom-8 left-8 -rotate-90",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-8 h-8 z-10 pointer-events-none hidden md:block`}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 }}
        >
          <div
            className="absolute top-0 left-0 w-full h-[1px]"
            style={{
              backgroundImage: "linear-gradient(90deg, #00d4ff, transparent)",
            }}
          />
          <div
            className="absolute top-0 left-0 h-full w-[1px]"
            style={{
              backgroundImage: "linear-gradient(180deg, #00d4ff, transparent)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] pt-20">
      {/* Background layers */}
      <HeroOrbs />
      <HeroParticles />
      <GridPulse />
      <ScanLine />
      <HoloSweep />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_70%)] z-[2]" />

      <CornerBrackets />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 relative z-20"
          style={{
            backgroundColor: "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.3)",
            boxShadow: "0 0 20px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)",
          }}
        >
          {/* Pulsing dot */}
          <motion.span
            className="w-2 h-2 rounded-full bg-[#00d4ff]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                "0 0 0px #00d4ff",
                "0 0 8px #00d4ff",
                "0 0 0px #00d4ff",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[#00d4ff] text-sm font-semibold tracking-wider uppercase">
            Graduation Project 2025/2026
          </span>

          {/* Orbiting dot */}
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[#7c3aed]"
            style={{ filter: "drop-shadow(0 0 3px #7c3aed)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-1 h-1 rounded-full bg-[#7c3aed]"
              style={{ transform: "translateX(60px)" }}
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <AnimatedTitle />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl font-light"
            animate={{
              color: ["#94a3b8", "#e2e8f0", "#94a3b8"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Intelligent Disaster Rescue System
          </motion.p>
        </motion.div>

        {/* Typewriter description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <p className="text-lg text-[#94a3b8]/80">
            <TypewriterText
              text="AI-powered multi-modal platform integrating thermal imaging, acoustic analysis, environmental monitoring, and structural assessment for real-time disaster response."
              speed={30}
              delay={1500}
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <CTAButton href="/dashboard" variant="primary">
            Live Dashboard
          </CTAButton>
          <CTAButton href="/ai-models" variant="secondary" color="#7c3aed">
            Explore AI Models
          </CTAButton>
          <CTAButton href="/architecture" variant="secondary" color="#f97316">
            System Architecture
          </CTAButton>
        </motion.div>

        <HeroStats />
      </div>

      <ScrollIndicator />
    </section>
  );
}
