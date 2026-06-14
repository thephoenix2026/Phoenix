"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ─── Floating Particles (deterministic) ─── */
export function FloatingParticles({
  count = 25,
  color = "#00d4ff",
}: {
  count?: number;
  color?: string;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        w: 2 + (((i * 7 + 3) % 11) / 11) * 5,
        h: 2 + (((i * 13 + 5) % 11) / 11) * 5,
        left: (i * 37 + 17) % 100,
        top: (i * 53 + 29) % 100,
        yOff: 30 + ((i * 19 + 11) % 50),
        xOff: ((i * 23 + 7) % 40) - 20,
        dur: 5 + ((i * 11 + 3) % 6),
        delay: (i * 0.3) % 3,
      })),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.h,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: color,
          }}
          animate={{
            y: [-p.yOff, p.yOff, -p.yOff],
            x: [-p.xOff, p.xOff, -p.xOff],
            opacity: [0.15, 0.6, 0.15],
            scale: [1, 1.3, 1],
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

/* ─── Animated Card with rotating gradient border ─── */
export function AliveCard({
  children,
  color = "#00d4ff",
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative group ${className}`}
    >
      {/* Rotating border */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[1px] rounded-xl bg-[#111118]/90" />

      {/* Glow pulse */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: `${color}08` }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── Shimmer Gradient Text ─── */
export function ShimmerText({
  text,
  className = "",
  colors,
}: {
  text: string;
  className?: string;
  colors?: string[];
}) {
  const c = colors || ["#00d4ff", "#7c3aed", "#f97316", "#00d4ff"];
  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${c.join(", ")})`,
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}

/* ─── Animated Counter ─── */
export function AnimatedCounter({
  value,
  suffix = "",
  color = "#00d4ff",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  color?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - start) / (duration * 1000);
            if (elapsed < 1) {
              setCount(Math.floor(elapsed * value));
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="font-mono font-bold" style={{ color }}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Pulsing Glow Dot ─── */
export function PulseDot({ color = "#00d4ff", size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative inline-flex">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </span>
  );
}

/* ─── Animated Background Orbs ─── */
export function BackgroundOrbs({
  colors,
  className = "",
}: {
  colors: string[];
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {colors.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px] opacity-20"
          style={{
            width: 200 + i * 60,
            height: 200 + i * 60,
            left: `${15 + i * 25}%`,
            top: `${20 + (i * 30) % 60}%`,
            backgroundColor: c,
          }}
          animate={{
            x: [0, 30 + i * 10, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.15, 0.3, 0.12, 0.15],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Section Divider ─── */
export function GlowingDivider({ color = "#00d4ff" }: { color?: string }) {
  return (
    <div className="relative h-px w-full my-8">
      <div className="absolute inset-0 bg-[#2a2a3e]" />
      <motion.div
        className="absolute inset-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Pulsing Badge ─── */
export function PulsingBadge({
  children,
  color = "#00d4ff",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={{
        backgroundColor: `${color}15`,
        color,
        border: `1px solid ${color}40`,
      }}
      animate={{
        boxShadow: [
          `0 0 0px ${color}00`,
          `0 0 15px ${color}30`,
          `0 0 0px ${color}00`,
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}

/* ─── Animated Progress Ring ─── */
export function ProgressRing({
  value,
  size = 60,
  strokeWidth = 4,
  color = "#00d4ff",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1a1a2e"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
      />
    </svg>
  );
}

/* ─── Animated Tab Underline ─── */
export function TabUnderline({
  color,
  layoutId,
}: {
  color: string;
  layoutId: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}80, 0 0 24px ${color}40`,
      }}
    />
  );
}

/* ─── Stagger Container Variants ─── */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};
