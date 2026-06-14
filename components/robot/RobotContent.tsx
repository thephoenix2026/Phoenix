"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  FloatingParticles,
  BackgroundOrbs,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const RobotViewer = dynamic(() => import("@/components/robot/RobotViewer"), {
  ssr: false,
});

const components = [
  { component: "Thermal Camera", model: "FLIR Lepton 3.5", specs: "640×480, 9Hz, LWIR", purpose: "Survivor heat detection", icon: "🌡", color: "#ef4444", category: "vision" },
  { component: "RGB Camera", model: "OV5640", specs: "5MP, 30fps, Auto-focus", purpose: "Visual inspection", icon: "📷", color: "#00d4ff", category: "vision" },
  { component: "Sound Sensor", model: "MAX9814", specs: "20Hz–20kHz, AGC", purpose: "Survivor sound detection", icon: "🎤", color: "#a855f7", category: "audio" },
  { component: "CO Sensor", model: "MQ-135", specs: "10–1000ppm", purpose: "Carbon monoxide detection", icon: "💨", color: "#f97316", category: "gas" },
  { component: "H₂S Sensor", model: "MQ-135", specs: "0–50ppm", purpose: "Hydrogen sulfide detection", icon: "⚗️", color: "#eab308", category: "gas" },
  { component: "Methane Sensor", model: "MQ-4", specs: "200–10000ppm", purpose: "Flammable gas detection", icon: "🔥", color: "#ef4444", category: "gas" },
  { component: "IMU", model: "MPU6050", specs: "6-axis, ±16g, 100Hz", purpose: "Structural vibration monitoring", icon: "📐", color: "#06b6d4", category: "motion" },
  { component: "Temperature", model: "DHT22", specs: "-40°C to 80°C, ±0.5°", purpose: "Environment temperature", icon: "🌡", color: "#f97316", category: "environment" },
  { component: "Humidity", model: "DHT22", specs: "0–100% RH, ±2%", purpose: "Environment humidity", icon: "💧", color: "#3b82f6", category: "environment" },
  { component: "Microcontroller", model: "ESP32", specs: "Dual-core 240MHz, WiFi/BLE", purpose: "Main controller", icon: "⚡", color: "#00d4ff", category: "compute" },
  { component: "SBC", model: "Raspberry Pi 4", specs: "4GB RAM, 64-bit ARM", purpose: "Edge AI processing", icon: "🧠", color: "#a855f7", category: "compute" },
  { component: "Communication", model: "LoRa SX1276", specs: "433MHz, 15km range", purpose: "Long-range communication", icon: "📡", color: "#10b981", category: "comms" },
];

const mechanicalSpecs = [
  { label: "Dimensions", value: "450mm × 350mm × 300mm", icon: "📏", progress: 75 },
  { label: "Weight", value: "8.5 kg", icon: "⚖️", progress: 42 },
  { label: "Material", value: "Aluminum alloy + ABS shell", icon: "🛡️", progress: 90 },
  { label: "IP Rating", value: "IP65 (dust-tight, water-resistant)", icon: "💧", progress: 65 },
  { label: "Operating Temp", value: "-20°C to 60°C", icon: "🌡", progress: 80 },
  { label: "Battery", value: "12V 10Ah LiPo, ~4 hours", icon: "🔋", progress: 85 },
  { label: "Mobility", value: "4-wheel differential, 2 m/s max", icon: "🛞", progress: 70 },
];

const categories = [
  { id: "all", label: "All", color: "#00d4ff" },
  { id: "vision", label: "Vision", color: "#ef4444" },
  { id: "audio", label: "Audio", color: "#a855f7" },
  { id: "gas", label: "Gas", color: "#f97316" },
  { id: "compute", label: "Compute", color: "#00d4ff" },
  { id: "environment", label: "Env", color: "#06b6d4" },
  { id: "motion", label: "Motion", color: "#eab308" },
  { id: "comms", label: "Comms", color: "#10b981" },
];

const stats = [
  { label: "Sensors", value: 12, color: "#00d4ff" },
  { label: "AI Models", value: 6, color: "#7c3aed" },
  { label: "Range", value: 15, suffix: "km", color: "#f97316" },
  { label: "Runtime", value: 4, suffix: "hrs", color: "#10b981" },
];

/* ─── Animated Stat Counter ─── */
function StatCounter({
  label,
  value,
  suffix = "",
  color,
  index,
}: {
  label: string;
  value: number;
  suffix?: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <motion.div
        className="relative rounded-xl p-4 text-center border border-[#2a2a3e]/60 overflow-hidden"
        whileHover={{ scale: 1.05, borderColor: color }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${color}10, transparent 70%)`,
          }}
        />

        {/* Pulsing dot */}
        <motion.div
          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        <div className="relative z-10">
          <motion.span
            className="text-3xl md:text-4xl font-bold block font-mono"
            style={{ color }}
            animate={{
              textShadow: [
                `0 0 8px ${color}40`,
                `0 0 16px ${color}60`,
                `0 0 8px ${color}40`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {value}{suffix}
          </motion.span>
          <span className="text-[#94a3b8] text-xs mt-1 block uppercase tracking-wider">
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Animated Section Number ─── */
function SectionNumber({ number, color = "#00d4ff" }: { number: string; color?: string }) {
  return (
    <motion.span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold font-mono mr-3"
      style={{
        backgroundColor: `${color}15`,
        color,
        border: `1px solid ${color}30`,
      }}
      animate={{
        boxShadow: [
          `0 0 0px ${color}00`,
          `0 0 12px ${color}30`,
          `0 0 0px ${color}00`,
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {number}
    </motion.span>
  );
}

/* ─── Sensor Card ─── */
function SensorCard({
  item,
  index,
}: {
  item: (typeof components)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group"
    >
      {/* Rotating border on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `conic-gradient(from 0deg, ${item.color}, transparent 40%, ${item.color})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[1px] rounded-xl bg-[#111118]/90" />

      {/* Glow pulse on hover */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: `${item.color}08` }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 p-5 h-full">
        {/* Top row: icon + category badge */}
        <div className="flex items-center justify-between mb-3">
          <motion.span
            className="text-2xl"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
          >
            {item.icon}
          </motion.span>
          <PulsingBadge color={item.color}>{item.category}</PulsingBadge>
        </div>

        {/* Component name */}
        <h3 className="text-white font-semibold text-sm mb-1">{item.component}</h3>

        {/* Model badge */}
        <span
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-2"
          style={{
            color: item.color,
            backgroundColor: `${item.color}15`,
            border: `1px solid ${item.color}30`,
          }}
        >
          {item.model}
        </span>

        {/* Specs */}
        <p className="text-slate-400 text-xs mb-2 font-mono">{item.specs}</p>

        {/* Purpose */}
        <p className="text-slate-500 text-xs">{item.purpose}</p>

        {/* Bottom scan line */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent, ${item.color}60, transparent)`,
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mechanical Spec Card ─── */
function MechSpecCard({
  spec,
  index,
}: {
  spec: (typeof mechanicalSpecs)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group"
    >
      <motion.div
        className="relative rounded-xl bg-[#111118]/80 backdrop-blur-xl border border-[#2a2a3e] p-5 overflow-hidden"
        whileHover={{
          borderColor: "#00d4ff40",
          boxShadow: "0 0 20px #00d4ff15, 0 0 40px #00d4ff08",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #00d4ff08, transparent 60%)",
          }}
        />

        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="text-xl"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
            >
              {spec.icon}
            </motion.span>
            <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
              {spec.label}
            </span>
          </div>

          {/* Value */}
          <p className="text-white font-medium text-sm mb-3">{spec.value}</p>

          {/* Progress bar */}
          <div className="relative h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #00d4ff, #7c3aed)",
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${spec.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
            />
            {/* Shimmer on bar */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── 3D Viewer Section with animated frame ─── */
function ViewerSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="mb-10 md:mb-20 relative"
    >
      {/* Animated border frame */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Corner accents */}
        {[
          "top-0 left-0",
          "top-0 right-0 rotate-90",
          "bottom-0 right-0 rotate-180",
          "bottom-0 left-0 -rotate-90",
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-8 h-8 z-20 pointer-events-none`}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          >
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{
                backgroundImage: "linear-gradient(90deg, #00d4ff, transparent)",
              }}
            />
            <div
              className="absolute top-0 left-0 h-full w-[2px]"
              style={{
                backgroundImage: "linear-gradient(180deg, #00d4ff, transparent)",
              }}
            />
          </motion.div>
        ))}

        {/* Pulsing glow around viewer */}
        <motion.div
          className="absolute -inset-1 rounded-2xl z-0"
          animate={{
            boxShadow: [
              "0 0 0px #00d4ff00, 0 0 0px #7c3aed00",
              "0 0 20px #00d4ff15, 0 0 40px #7c3aed10",
              "0 0 0px #00d4ff00, 0 0 0px #7c3aed00",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <RobotViewer />
      </div>

      {/* Viewer status bar */}
      <motion.div
        className="flex items-center justify-between mt-3 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#10b981]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[#94a3b8] text-xs font-mono">3D MODEL ACTIVE</span>
          </div>
          <span className="text-[#4a4a5e] text-xs">|</span>
          <span className="text-[#94a3b8] text-xs font-mono">DRAG TO ROTATE • SCROLL TO ZOOM</span>
        </div>
        <PulsingBadge color="#10b981">LIVE</PulsingBadge>
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Stats Bar ─── */
function StatsBar() {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {stats.map((s, i) => (
        <StatCounter
          key={s.label}
          label={s.label}
          value={s.value}
          suffix={s.suffix}
          color={s.color}
          index={i}
        />
      ))}
    </motion.div>
  );
}

export function RobotContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredComponents = useMemo(
    () =>
      activeCategory === "all"
        ? components
        : components.filter((c) => c.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#f97316"]} />
      <FloatingParticles count={30} color="#00d4ff" />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-full h-px"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent)",
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── Hero Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <PulsingBadge color="#00d4ff" className="mb-6">
            Phoenix Rescue Robot
          </PulsingBadge>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            animate={{
              color: ["#ffffff", "#e2e8f0", "#ffffff"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="text-[#00d4ff]">Robot</span>{" "}
            <span className="text-white">Design</span>
          </motion.h1>

          <motion.p
            className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore the Phoenix rescue robot — engineered for disaster response
            with advanced sensors, rugged mobility, and real-time AI processing.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            className="w-32 h-1 mx-auto rounded-full"
            style={{
              backgroundImage: "linear-gradient(90deg, #00d4ff, #7c3aed, #f97316)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        <StatsBar />

        {/* ─── 3D Viewer ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <SectionNumber number="01" color="#00d4ff" />
            <h2 className="text-2xl font-bold text-white">
              Interactive 3D Model
            </h2>
          </div>
          <ViewerSection />
        </motion.div>

        <GlowingDivider color="#00d4ff" />

        {/* ─── Sensor & Component Specifications ─── */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber number="02" color="#7c3aed" />
            <h2 className="text-2xl font-bold text-white">
              Sensor &amp; Component Specifications
            </h2>
          </div>
          <p className="text-[#94a3b8] text-sm mb-8 ml-11">
            12 integrated sensors and computing modules powering the Phoenix rescue robot.
          </p>

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8 ml-11">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  color: activeCategory === cat.id ? cat.color : "#94a3b8",
                  backgroundColor:
                    activeCategory === cat.id ? `${cat.color}15` : "transparent",
                  border: `1px solid ${activeCategory === cat.id ? `${cat.color}40` : "#2a2a3e"}`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${cat.color}10, transparent)`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Sensor cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              initial="hidden"
              animate="visible"
            >
              {filteredComponents.map((item, i) => (
                <SensorCard key={item.component} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <GlowingDivider color="#7c3aed" />

        {/* ─── Mechanical Specifications ─── */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <SectionNumber number="03" color="#f97316" />
            <h2 className="text-2xl font-bold text-white">
              Mechanical Specifications
            </h2>
          </div>
          <p className="text-[#94a3b8] text-sm mb-8 ml-11">
            Rugged construction built to withstand extreme disaster environments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mechanicalSpecs.map((spec, i) => (
              <MechSpecCard key={spec.label} spec={spec} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlowingDivider color="#10b981" />
          <div className="mt-12">
            <PulsingBadge color="#10b981" className="mb-4">
              All Systems Operational
            </PulsingBadge>
            <motion.p
              className="text-[#94a3b8] text-sm max-w-md mx-auto"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Designed for the toughest rescue missions. Every component tested
              for reliability in extreme conditions.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
