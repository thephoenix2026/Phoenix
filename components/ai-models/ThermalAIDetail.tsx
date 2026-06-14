"use client";

import { useState, useMemo, Fragment } from "react";
import { FloatingParticles, BackgroundOrbs, GlowingDivider } from "./AIAnimations";
import { motion, AnimatePresence } from "framer-motion";
import type { ThermalAISpecs } from "@/lib/data/models";
import GlowCard from "@/components/shared/GlowCard";

/* ─── Animated Thermal Heat Map ─── */
function ThermalHeatMap() {
  const pixels = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const cx = 3.5, cy = 3.5;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const heat = Math.max(0, 1 - dist / 5);
        const noise = ((i * 17 + 7) % 10) / 100;
        return { heat: Math.min(1, heat + noise), delay: (i * 0.05) % 2 };
      }),
    [],
  );

  return (
    <div className="relative rounded-xl overflow-hidden border border-[#2a2a3e] bg-[#0a0a0f] p-4">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 text-center">Live Thermal Feed Simulation</div>
      <div className="grid grid-cols-8 gap-0.5 mx-auto max-w-[280px]">
        {pixels.map((p, i) => (
          <motion.div
            key={i}
            className="aspect-square rounded-sm"
            animate={{
              backgroundColor: [
                `rgba(${Math.floor(255 * p.heat)}, ${Math.floor(80 * p.heat)}, ${Math.floor(20 * p.heat)}, ${0.3 + p.heat * 0.7})`,
                `rgba(${Math.floor(200 * p.heat)}, ${Math.floor(40 * p.heat)}, ${Math.floor(10 * p.heat)}, ${0.2 + p.heat * 0.8})`,
                `rgba(${Math.floor(255 * p.heat)}, ${Math.floor(80 * p.heat)}, ${Math.floor(20 * p.heat)}, ${0.3 + p.heat * 0.7})`,
              ],
              scale: p.heat > 0.7 ? [1, 1.15, 1] : [1, 1.05, 1],
            }}
            transition={{
              duration: 2 + p.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>
      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="flex justify-between mt-3 text-[9px] font-mono">
        <span className="text-blue-400">20°C</span>
        <span className="text-yellow-400">33°C</span>
        <span className="text-orange-400">38°C</span>
        <span className="text-red-400">45°C</span>
      </div>
    </div>
  );
}

/* ─── Animated Sparkle ─── */
function Sparkle({ color = "#f97316", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
      </svg>
    </motion.div>
  );
}

/* ─── Pulsing Live Indicator ─── */
function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full bg-red-500"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider">Live</span>
    </div>
  );
}

/* ─── Breathing Glow Container ─── */
function BreathingGlow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="relative"
      animate={{
        boxShadow: [
          `0 0 0px ${color}00, 0 0 0px ${color}00`,
          `0 0 30px ${color}20, 0 0 60px ${color}10`,
          `0 0 0px ${color}00, 0 0 0px ${color}00`,
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

const tabs = [
  "Architecture",
  "Pipeline",
  "Training",
  "Temperature",
  "Auto-Annotation",
  "Deployment",
];

function ArchNode({
  label,
  sub,
  color,
  glow,
  large,
}: {
  label: string;
  sub?: string;
  color: string;
  glow?: boolean;
  large?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -6 }}
      className={`relative flex flex-col items-center justify-center rounded-xl border text-center transition-all ${
        large ? "px-5 py-4 min-w-[140px]" : "px-3 py-2.5 min-w-[100px]"
      }`}
      style={{
        borderColor: `${color}50`,
        backgroundColor: `${color}10`,
        boxShadow: glow ? `0 0 25px ${color}30, 0 0 50px ${color}10` : "none",
      }}
    >
      <span
        className={`font-bold ${large ? "text-sm" : "text-xs"}`}
        style={{ color }}
      >
        {label}
      </span>
      {sub && (
        <span className="text-[10px] text-gray-500 mt-0.5 font-mono">
          {sub}
        </span>
      )}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.08, 0.3, 0.08], scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {glow && (
        <motion.div
          className="absolute -inset-1 rounded-xl"
          style={{ border: `1px solid ${color}20` }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

function Arrow({
  direction = "right",
  color,
  label,
}: {
  direction?: "right" | "down";
  color: string;
  label?: string;
}) {
  if (direction === "down") {
    return (
      <div className="flex flex-col items-center gap-0.5 py-1">
        {label && (
          <span className="text-[9px] text-gray-500 font-mono">{label}</span>
        )}
        <div className="relative">
          <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
            <path d="M6 0V20M6 20L2 16M6 20L10 16" stroke={color} strokeWidth="1.5" />
          </svg>
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color, left: 4.5, filter: `drop-shadow(0 0 4px ${color})` }}
            animate={{ top: [0, 18, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5 px-1">
      {label && (
        <span className="text-[9px] text-gray-500 font-mono">{label}</span>
      )}
      <div className="relative">
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={color} strokeWidth="1.5" />
        </svg>
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color, top: 4.5, filter: `drop-shadow(0 0 4px ${color})` }}
          animate={{ left: [0, 18, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function MetricBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      className="rounded-lg border px-3 py-2 text-center relative overflow-hidden"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="relative text-lg font-bold font-mono" style={{ color }}>
        {value}
      </div>
      <div className="relative text-[10px] text-gray-500 mt-0.5">{label}</div>
    </motion.div>
  );
}

function SectionTitle({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <h3
      className="text-xs uppercase tracking-widest font-semibold mb-4"
      style={{ color }}
    >
      {children}
    </h3>
  );
}

/* ─── Main Architecture SVG ─── */
function MainArchitecture({ color }: { color: string }) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[700px] relative">
        {/* Sparkles scattered around */}
        <div className="absolute -top-2 left-[10%]"><Sparkle color="#ef4444" delay={0} /></div>
        <div className="absolute top-[20%] right-[5%]"><Sparkle color={color} delay={0.7} /></div>
        <div className="absolute bottom-[10%] left-[20%]"><Sparkle color="#22c55e" delay={1.4} /></div>
        <div className="absolute -bottom-2 right-[30%]"><Sparkle color="#f97316" delay={0.3} /></div>

        {/* Top row: Input → Backbone → Detection Head → Outputs */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <BreathingGlow color="#94a3b8"><ArchNode label="Thermal Input" sub="640×640×3" color="#94a3b8" /></BreathingGlow>
          <Arrow color={color} />
          <BreathingGlow color={color}><ArchNode label="CSPDarknet" sub="Backbone" color={color} glow large /></BreathingGlow>
          <Arrow color={color} label="P3,P4,P5" />
          <ArchNode label="PAN-FPN" sub="Neck" color={color} />
          <Arrow color={color} />
          <BreathingGlow color="#22c55e"><ArchNode label="Detection Head" sub="YOLO Decoupled" color="#22c55e" large /></BreathingGlow>
          <Arrow color="#22c55e" />
          <ArchNode label="Boxes" sub="+ Classes" color="#22c55e" />
        </div>

        {/* Middle: P4 branch → Thermal Head */}
        <div className="flex items-center justify-center gap-2 mt-1 mb-1">
          <div className="w-[160px]" />
          <div className="flex flex-col items-center">
            <svg width="12" height="30" viewBox="0 0 12 30" fill="none">
              <path d="M6 0V26M6 26L2 22M6 26L10 22" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
            </svg>
            <span className="text-[9px] text-gray-500 font-mono">P4 features</span>
          </div>
          <div className="flex items-center gap-2">
            <BreathingGlow color="#ef4444"><ArchNode label="Thermal Head" sub="Custom MLP" color="#ef4444" glow large /></BreathingGlow>
            <Arrow color="#ef4444" />
            <ArchNode label="Temperature" sub="°C (20–45)" color="#ef4444" />
          </div>
          <div className="w-[160px]" />
        </div>

        {/* Bottom: Priority NMS */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="w-[380px]" />
          <BreathingGlow color="#f97316"><ArchNode label="Priority NMS" sub="Post-Processor" color="#f97316" glow /></BreathingGlow>
          <Arrow color="#f97316" />
          <ArchNode label="Filtered" sub="Detections" color="#f97316" />
        </div>

        {/* Thermal Heat Map */}
        <div className="mt-8">
          <ThermalHeatMap />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <motion.div className="w-3 h-3 rounded bg-[#22c55e]/20 border border-[#22c55e]/50" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            Detection Path
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-3 h-3 rounded bg-[#ef4444]/20 border border-[#ef4444]/50" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            Thermal Path
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-3 h-3 rounded bg-[#f97316]/20 border border-[#f97316]/50" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
            Priority NMS
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div className="w-3 h-0.5 bg-[#00d4ff]" animate={{ scaleX: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Data Flow
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Auto-Annotation Pipeline ─── */
function AutoAnnotationPipeline({
  steps,
  config,
  color,
}: {
  steps: ThermalAISpecs["autoAnnotation"]["steps"];
  config: Record<string, string>;
  color: string;
}) {
  return (
    <div>
      <SectionTitle color={color}>Zero-Shot Auto-Annotation Pipeline</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <ArchNode label="Raw Thermal" sub="Images" color="#94a3b8" />
        {steps.map((step, i) => (
          <div key={step.name} className="flex items-center gap-2">
            <Arrow color={color} />
            <ArchNode
              label={step.name}
              sub={step.model !== "—" ? step.model.split("/").pop()?.slice(0, 20) : undefined}
              color={color}
              glow={i === 0 || i === 1}
            />
          </div>
        ))}
        <Arrow color={color} />
        <ArchNode label="YOLO Labels" sub="+ Temperature" color="#22c55e" glow />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(config).map(([key, val]) => (
          <div
            key={key}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center"
          >
            <div className="text-xs font-mono text-[#00d4ff]">{val}</div>
            <div className="text-[10px] text-gray-500 mt-1">
              {key.replace(/_/g, " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Training Pipeline ─── */
function TrainingPipeline({
  stages,
  hyperparams,
  color,
}: {
  stages: ThermalAISpecs["trainingPipeline"]["stages"];
  hyperparams: Record<string, string>;
  color: string;
}) {
  return (
    <div>
      <SectionTitle color={color}>Multi-Stage Training Pipeline</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {stages.map((stage, i) => (
            <Fragment key={stage.name}>
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="rounded-lg border px-4 py-3 text-center"
              style={{ borderColor: `${color}40`, backgroundColor: `${color}10` }}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                Stage {i + 1}
              </div>
              <div className="text-sm font-bold" style={{ color }}>
                {stage.name}
              </div>
              <div className="text-[10px] text-gray-400 mt-1 font-mono">
                {stage.epochs} epochs · LR {stage.lr}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">
                Thermal: {stage.thermalHead}
              </div>
            </motion.div>
            {i < stages.length - 1 && <Arrow color={color} />}
            </Fragment>
        ))}
      </div>

      <SectionTitle color={color}>Hyperparameters</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(hyperparams).map(([key, val]) => (
          <div
            key={key}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center"
          >
            <div className="text-xs font-mono text-[#00d4ff]">{val}</div>
            <div className="text-[10px] text-gray-500 mt-1">
              {key.replace(/_/g, " ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Temperature Estimation ─── */
function TemperatureEstimation({
  specs,
  color,
}: {
  specs: ThermalAISpecs["temperatureEstimation"];
  color: string;
}) {
  return (
    <div>
      <SectionTitle color={color}>ROI Extraction & Temperature Mapping</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">
            ROI Regions
          </h4>
          <div className="space-y-2">
            {specs.roiRegions.map((roi) => (
              <div
                key={roi.name}
                className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <span className="text-xs font-semibold text-white">
                    {roi.name}
                  </span>
                  <span className="text-[10px] text-gray-500 ml-2">
                    {roi.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">
            Corrections
          </h4>
          <div className="space-y-2">
            {specs.corrections.map((c) => (
              <div
                key={c.name}
                className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
              >
                <div className="text-xs font-semibold text-white mb-0.5">
                  {c.name}
                </div>
                <div className="text-[10px] text-gray-400 font-mono">
                  {c.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle color={color}>Confidence Score</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 text-center">
        <div className="text-sm font-mono text-[#00d4ff]">
          {specs.confidenceFormula}
        </div>
        <div className="text-[10px] text-gray-500 mt-2">
          0.4×in_target (35–38°C) + 0.3×stability (range &lt;3°C) + 0.3×buffer (rolling avg)
        </div>
      </div>
    </div>
  );
}

/* ─── Deployment ─── */
function DeploymentSection({
  formats,
  endpoints,
  color,
}: {
  formats: ThermalAISpecs["deployment"]["formats"];
  endpoints: ThermalAISpecs["deployment"]["apiEndpoints"];
  color: string;
}) {
  return (
    <div>
      <SectionTitle color={color}>Export Formats</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {formats.map((f, i) => (
          <motion.div
            key={`${f.name}-${f.platform}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ background: `linear-gradient(135deg, ${color}20, transparent, ${color}10)` }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
            <div className="relative">
              <div className="text-sm font-bold text-white mb-2">{f.name}</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <motion.div
                    className="text-xs font-mono font-bold"
                    style={{ color }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {f.speed}
                  </motion.div>
                  <div className="text-[9px] text-gray-500">Speed</div>
                </div>
                <div>
                  <div className="text-xs text-gray-300">{f.platform}</div>
                  <div className="text-[9px] text-gray-500">Platform</div>
                </div>
                <div>
                  <div className="text-xs text-gray-300">{f.memory}</div>
                  <div className="text-[9px] text-gray-500">Memory</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>API Endpoints</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden">
        {endpoints.map((ep, i) => (
          <motion.div
            key={ep.endpoint}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, type: "spring" }}
            whileHover={{ x: 4, backgroundColor: `${color}08` }}
            className={`flex items-center gap-4 px-4 py-3 ${
              i > 0 ? "border-t border-[#2a2a3e]" : ""
            } bg-[#0a0a0f] transition-colors`}
          >
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor:
                  ep.method === "GET"
                    ? "#22c55e20"
                    : ep.method === "POST"
                    ? "#3b82f620"
                    : "#f9731620",
                color:
                  ep.method === "GET"
                    ? "#22c55e"
                    : ep.method === "POST"
                    ? "#3b82f6"
                    : "#f97316",
              }}
            >
              {ep.method}
            </span>
            <span className="text-xs font-mono text-white">{ep.endpoint}</span>
            <span className="text-[10px] text-gray-500 ml-auto">
              {ep.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Augmentations ─── */
function AugmentationsSection({
  standard,
  thermal,
  color,
}: {
  standard: ThermalAISpecs["augmentations"]["standard"];
  thermal: ThermalAISpecs["augmentations"]["thermal"];
  color: string;
}) {
  return (
    <div>
      <SectionTitle color={color}>Standard Augmentations</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {standard.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: "spring" }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${color}10, transparent)` }}
            />
            <div className="relative text-xs font-semibold text-white">{a.name}</div>
            <div className="relative text-[10px] text-gray-500">
              p={a.probability} · {a.params}
            </div>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>Thermal-Specific Augmentations</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {thermal.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring" }}
            whileHover={{ x: 6, scale: 1.02 }}
            className="flex items-center gap-3 rounded-lg border px-3 py-2"
            style={{
              borderColor: `${color}30`,
              backgroundColor: `${color}08`,
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <div>
              <span className="text-xs font-semibold text-white">
                {a.name}
              </span>
              <span className="text-[10px] text-gray-500 ml-2">
                p={a.probability}
              </span>
              <div className="text-[10px] text-gray-400">{a.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ThermalAIDetail({
  specs,
  color,
}: {
  specs: ThermalAISpecs;
  color: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-8 relative">
      <BackgroundOrbs colors={[color, "#ef4444", "#fbbf24"]} />
      <FloatingParticles count={30} color={color} />

      {/* Sparkles around the card */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%]"><Sparkle color="#ef4444" delay={0} /></div>
        <div className="absolute top-[15%] right-[8%]"><Sparkle color={color} delay={0.5} /></div>
        <div className="absolute top-[45%] left-[3%]"><Sparkle color="#fbbf24" delay={1} /></div>
        <div className="absolute bottom-[20%] right-[5%]"><Sparkle color="#ef4444" delay={1.5} /></div>
        <div className="absolute bottom-[5%] left-[15%]"><Sparkle color={color} delay={0.8} /></div>
      </div>

      <GlowCard glowColor={color} className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center relative"
              style={{ backgroundColor: `${color}20` }}
              animate={{ boxShadow: [`0 0 0px ${color}00`, `0 0 20px ${color}40`, `0 0 0px ${color}00`] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.svg
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </motion.svg>
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                initial={{ rotate: 0 }}
              >
                <div className="absolute w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, transform: "translateX(22px)" }} />
              </motion.div>
            </motion.div>
            <div>
              <h2 className="text-xl font-bold" style={{ color }}>
                YOLO26-Thermal Architecture
              </h2>
              <p className="text-xs text-gray-500">
                Complete system architecture & technical specifications
              </p>
            </div>
          </div>
          <LiveIndicator />
        </div>

        {/* Sub-tabs */}
        <div className="overflow-x-auto scrollbar-hide mb-6">
          <div className="flex gap-1 min-w-max border-b border-[#2a2a3e] pb-px">
            {tabs.map((tab, i) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(i)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap"
                style={{ color: activeTab === i ? color : "#64748b" }}
              >
                {tab}
                {activeTab === i && (
                  <motion.div
                    layoutId="thermalTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <GlowingDivider color={color} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 0 && <MainArchitecture color={color} />}
            {activeTab === 1 && (
              <AutoAnnotationPipeline
                steps={specs.autoAnnotation.steps}
                config={specs.autoAnnotation.config}
                color={color}
              />
            )}
            {activeTab === 2 && (
              <TrainingPipeline
                stages={specs.trainingPipeline.stages}
                hyperparams={specs.trainingPipeline.hyperparams}
                color={color}
              />
            )}
            {activeTab === 3 && (
              <TemperatureEstimation
                specs={specs.temperatureEstimation}
                color={color}
              />
            )}
            {activeTab === 4 && (
              <AutoAnnotationPipeline
                steps={specs.autoAnnotation.steps}
                config={specs.autoAnnotation.config}
                color={color}
              />
            )}
            {activeTab === 5 && (
              <DeploymentSection
                formats={specs.deployment.formats}
                endpoints={specs.deployment.apiEndpoints}
                color={color}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <GlowingDivider color="#ef4444" />

        {/* Loss Function */}
        <div className="mt-8">
          <SectionTitle color={color}>Loss Function</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {specs.lossFunction.components.map((comp, i) => (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-3 relative overflow-hidden"
              >
                {/* Animated weight bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 opacity-20"
                  style={{ backgroundColor: color }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${Number(comp.weight) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
                <div className="relative">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                    {comp.name}
                  </div>
                  <div className="text-xs font-mono text-gray-300 mb-1">
                    {comp.formula}
                  </div>
                  <div className="text-sm font-bold font-mono" style={{ color }}>
                    Weight: {comp.weight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 text-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative text-[10px] text-gray-500 uppercase tracking-wider mb-2">
              Total Loss
            </div>
            <div className="relative text-sm font-mono font-bold" style={{ color }}>
              {specs.lossFunction.totalFormula}
            </div>
          </motion.div>
        </div>

        {/* Dataset */}
        <div className="mt-8">
          <SectionTitle color={color}>Dataset</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
              <div className="text-xs text-gray-500 mb-2">Source</div>
              <div className="text-sm text-white mb-3">
                {specs.dataset.source}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MetricBadge
                  label="Total Images"
                  value={specs.dataset.totalImages.toLocaleString()}
                  color={color}
                />
                <MetricBadge label="Split" value={specs.dataset.split.split("/")[0]} color={color} />
              </div>
            </div>
            <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
              <div className="text-xs text-gray-500 mb-3">Class Distribution</div>
              <div className="space-y-3">
                {specs.dataset.classes.map((cls, i) => {
                  const max = Math.max(...specs.dataset.classes.map((c) => c.train));
                  return (
                    <motion.div
                      key={cls.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-white font-medium">
                          {cls.name}
                        </span>
                        <span className="text-gray-500 font-mono">
                          {cls.train + cls.val + cls.test}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#1a1a2e] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(cls.train / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Augmentations */}
        <div className="mt-8">
          <AugmentationsSection
            standard={specs.augmentations.standard}
            thermal={specs.augmentations.thermal}
            color={color}
          />
        </div>

        {/* Backbone Variants */}
        <div className="mt-8">
          <SectionTitle color={color}>Backbone Variants</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2a2a3e]">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">
                    Variant
                  </th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">
                    Params
                  </th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">
                    GFLOPs
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.backbone.variants.map((v, i) => (
                  <motion.tr
                    key={v.name}
                    className="border-b border-[#2a2a3e]/50"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: `${color}08`, x: 4 }}
                  >
                    <td className="py-2 px-3 font-mono font-bold" style={{ color }}>
                      {v.name}
                      {v.name === "m" && (
                        <span className="ml-2 text-[9px] bg-[#00d4ff]/20 text-[#00d4ff] px-1.5 py-0.5 rounded-full">
                          default
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">
                      {v.params}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">
                      {v.gflops}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
