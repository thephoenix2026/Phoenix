"use client";

import { motion } from "framer-motion";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const steps = [
  {
    number: "01",
    title: "Sense",
    description:
      "Multi-sensor array captures thermal, acoustic, visual, and environmental data from the disaster zone",
    color: "#00d4ff",
    icon: "📡",
    details: ["Thermal imaging", "Audio capture", "Gas detection", "IMU data"],
  },
  {
    number: "02",
    title: "Process",
    description:
      "5 AI models analyze sensor data in parallel — detecting survivors, assessing hazards, and evaluating structural risk",
    color: "#7c3aed",
    icon: "🧠",
    details: ["Survivor detection", "Hazard mapping", "Structural analysis", "NLP processing"],
  },
  {
    number: "03",
    title: "Decide",
    description:
      "Intelligent fusion engine combines all AI outputs to generate actionable rescue recommendations with confidence scores",
    color: "#10b981",
    icon: "⚡",
    details: ["Multi-modal fusion", "Risk scoring", "Priority ranking", "Route planning"],
  },
  {
    number: "04",
    title: "Act",
    description:
      "Real-time alerts, guided rescue routes, and safety protocols delivered to field teams via dashboard and mobile app",
    color: "#f97316",
    icon: "🚨",
    details: ["Live dashboard", "Mobile alerts", "Safety protocols", "Team coordination"],
  },
];

/* ─── Step Card ─── */
function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
      whileHover={{ y: -8 }}
      className="relative"
    >
      {/* Connector line (desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 w-8 z-0">
          {/* Dashed line */}
          <div className="border-t-2 border-dashed border-white/10 w-full" />
          {/* Animated flowing dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: step.color,
              filter: `drop-shadow(0 0 4px ${step.color})`,
            }}
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      <div
        className="relative rounded-xl p-6 h-full overflow-hidden group"
        style={{
          backgroundColor: "rgba(26,26,36,0.8)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, ${step.color}10, transparent 60%)`,
          }}
        />

        {/* Step number — large watermark */}
        <motion.div
          className="absolute -top-2 -right-2 text-7xl font-black select-none pointer-events-none"
          style={{ color: step.color, opacity: 0.05 }}
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {step.number}
        </motion.div>

        <div className="relative z-10">
          {/* Animated step number */}
          <motion.div
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold font-mono mb-4"
            style={{
              backgroundColor: `${step.color}15`,
              color: step.color,
              border: `1px solid ${step.color}30`,
            }}
            animate={{
              boxShadow: [
                `0 0 0px ${step.color}00`,
                `0 0 12px ${step.color}30`,
                `0 0 0px ${step.color}00`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          >
            {step.number}
          </motion.div>

          {/* Icon */}
          <motion.div
            className="text-3xl mb-3"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            {step.icon}
          </motion.div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: step.color }}
          >
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Detail tags */}
          <div className="flex flex-wrap gap-1.5">
            {step.details.map((d, j) => (
              <motion.span
                key={d}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + j * 0.05 }}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${step.color}10`,
                  color: step.color,
                  border: `1px solid ${step.color}20`,
                }}
              >
                {d}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-[#111118] relative overflow-hidden">
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#10b981", "#f97316"]} />
      <FloatingParticles count={25} color="#10b981" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <PulsingBadge color="#10b981" className="mb-4">
            Pipeline
          </PulsingBadge>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white">How It </span>
            <motion.span
              className="text-[#10b981]"
              animate={{
                textShadow: [
                  "0 0 8px #10b98130",
                  "0 0 20px #10b98150",
                  "0 0 8px #10b98130",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Works
            </motion.span>
          </motion.h2>
          <p className="text-[#94a3b8] text-lg">
            From sensor data to saved lives in milliseconds
          </p>
        </div>

        {/* Desktop: Horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-4 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Mobile: Vertical */}
        <div className="md:hidden flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Vertical connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-16 bottom-0 w-px">
                  <motion.div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${step.color}40, transparent)`,
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </div>
              )}

              <div
                className="rounded-xl p-5 flex gap-4 items-start relative overflow-hidden group"
                style={{
                  backgroundColor: "rgba(26,26,36,0.8)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    backgroundImage: `radial-gradient(circle at 0% 50%, ${step.color}08, transparent 50%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    className="text-2xl font-black opacity-40"
                    style={{ color: step.color }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.div
                    className="text-2xl"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <div className="flex-1 relative z-10">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <GlowingDivider color="#10b981" />
      </div>
    </section>
  );
}
