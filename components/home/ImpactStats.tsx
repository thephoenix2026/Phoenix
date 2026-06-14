"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { impactStats } from "@/lib/data/stats";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const statColors = ["#00d4ff", "#7c3aed", "#10b981", "#f97316", "#ef4444", "#eab308", "#ec4899", "#06b6d4"];

/* ─── Animated Counter with glow ─── */
function GlowCounter({
  value,
  suffix,
  color,
  label,
  index,
}: {
  value: number;
  suffix: string;
  color: string;
  label: string;
  index: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 2000;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * value);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatted =
    value % 1 !== 0 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="text-center p-6 rounded-xl relative group overflow-hidden"
      style={{
        backgroundColor: "rgba(17,17,24,0.5)",
        border: `1px solid rgba(42,42,62,0.5)`,
      }}
    >
      {/* Rotating border on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[1px] rounded-xl bg-[#111118]/90" />

      {/* Background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${color}10, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Pulsing dot */}
        <motion.div
          className="w-2 h-2 rounded-full mx-auto mb-3"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              `0 0 0px ${color}`,
              `0 0 10px ${color}`,
              `0 0 0px ${color}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        <motion.span
          className="text-4xl md:text-5xl font-bold font-mono block"
          style={{ color }}
          animate={{
            textShadow: [
              `0 0 8px ${color}30`,
              `0 0 20px ${color}50`,
              `0 0 8px ${color}30`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        >
          {formatted}
          {suffix}
        </motion.span>
        <p className="text-[#94a3b8] mt-2 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}

export function ImpactStats() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed"]} />
      <FloatingParticles count={15} color="#7c3aed" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <PulsingBadge color="#7c3aed" className="mb-4">
            Impact
          </PulsingBadge>
        </div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white">By the </span>
          <motion.span
            className="text-[#00d4ff]"
            animate={{
              textShadow: [
                "0 0 8px #00d4ff30",
                "0 0 20px #00d4ff50",
                "0 0 8px #00d4ff30",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Numbers
          </motion.span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {impactStats.slice(0, 4).map((stat, i) => (
            <GlowCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              color={statColors[i % statColors.length]}
              label={stat.label}
              index={i}
            />
          ))}
        </div>

        <GlowingDivider color="#7c3aed" />
      </div>
    </section>
  );
}
