"use client";

import { useState } from "react";
import { FloatingParticles, BackgroundOrbs, GlowingDivider } from "./AIAnimations";
import { motion, AnimatePresence } from "framer-motion";
import type { AcousticAISpecs } from "@/lib/data/models";
import GlowCard from "@/components/shared/GlowCard";

const tabs = [
  "Architecture",
  "DSP & Features",
  "Training",
  "Inference",
  "Safety & MLOps",
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
      whileHover={{ scale: 1.08, y: -4 }}
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
        <span className="text-[10px] text-gray-500 mt-0.5 font-mono max-w-[120px]">
          {sub}
        </span>
      )}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.05, 1] }}
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
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
          <path
            d="M6 0V20M6 20L2 16M6 20L10 16"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5 px-1">
      {label && (
        <span className="text-[9px] text-gray-500 font-mono">{label}</span>
      )}
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path
          d="M0 6H20M20 6L16 2M20 6L16 10"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
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

/* ─── Main Architecture ─── */
function MainArchitecture({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Top: Input → Feature Extraction → Backbone */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <ArchNode label="48kHz Audio" sub="4-mic array" color="#94a3b8" />
          <Arrow color={color} label="DSP" />
          <ArchNode label="LogMel" sub="128 mel bins" color="#a855f7" />
          <Arrow color={color} />
          <ArchNode label="PCEN" sub="Adaptive gain" color="#a855f7" />
          <Arrow color={color} />
          <ArchNode
            label="ConformerS"
            sub="12 blocks, d=256"
            color={color}
            glow
            large
          />
        </div>

        {/* Middle: 4 parallel heads */}
        <div className="flex items-start justify-center gap-3 mt-2 mb-3">
          <div className="w-[340px]" />
          <div className="flex flex-col items-center">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path
                d="M6 0V16M6 16L2 12M6 16L10 12"
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-start justify-center gap-3 mb-3">
          {specs.heads.map((head, i) => (
            <motion.div
              key={head.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ArchNode
                label={head.name}
                sub={head.params}
                color={["#ef4444", "#22c55e", "#f97316", "#3b82f6"][i]}
                glow={i < 2}
              />
            </motion.div>
          ))}
        </div>

        {/* Fusion */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-[100px]" />
          {specs.heads.map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path
                  d="M10 0V12M10 12L6 8M10 12L14 8"
                  stroke={["#ef4444", "#22c55e", "#f97316", "#3b82f6"][i]}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>
          ))}
          <div className="w-[100px]" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-[260px]" />
          <ArchNode
            label="GatedHierarchicalFusion"
            sub="CrossAttention + gates"
            color="#eab308"
            glow
            large
          />
        </div>

        {/* Reasoner */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Arrow direction="down" color="#eab308" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-[260px]" />
          <ArchNode
            label="Mamba2Reasoner"
            sub="4 blocks + BiLSTM"
            color="#06b6d4"
            glow
            large
          />
        </div>

        {/* Output Heads */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Arrow direction="down" color="#06b6d4" />
        </div>
        <div className="flex items-center justify-center gap-3">
          {specs.outputHeads.map((head, i) => (
            <motion.div
              key={head.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <ArchNode
                label={head.name.replace("_head", "")}
                sub={head.activation}
                color="#ec4899"
              />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#a855f7]/20 border border-[#a855f7]/50" />
            Feature Extraction
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#ef4444]/20 border border-[#ef4444]/50" />
            Detection Heads
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#eab308]/20 border border-[#eab308]/50" />
            Fusion
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#06b6d4]/20 border border-[#06b6d4]/50" />
            Reasoning
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DSP & Features ─── */
function DSPFeatures({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Audio Front-End DSP</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {Object.entries(specs.dspConfig).map(([key, val]) => (
          <div
            key={key}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3"
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
              {key}
            </div>
            <div className="text-xs text-gray-300 font-mono">{val}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Feature Extraction Pipeline</SectionTitle>
      <div className="space-y-2">
        {specs.features.map((feat, i) => (
          <motion.div
            key={feat.name}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
            whileHover={{ x: 6, color: "#00d4ff" }}
            className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-2.5"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-semibold text-white min-w-[140px]">
              {feat.name}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {feat.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Training Pipeline ─── */
function TrainingPipeline({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Multi-Phase Training</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {specs.trainingPipeline.stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              className="rounded-xl border p-4 text-center min-w-[140px]"
              style={{
                borderColor: `${color}40`,
                backgroundColor: `${color}08`,
              }}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                Phase {i + 1}
              </div>
              <div className="text-sm font-bold" style={{ color }}>
                {stage.name}
              </div>
              {stage.epochs !== "—" && (
                <div className="text-[10px] text-gray-400 mt-1 font-mono">
                  {stage.epochs} epochs · LR {stage.lr} · BS {stage.batchSize}
                </div>
              )}
              <div className="text-[10px] text-gray-500 mt-1 max-w-[180px]">
                {stage.description}
              </div>
            </motion.div>
            {i < specs.trainingPipeline.stages.length - 1 && (
              <Arrow color={color} />
            )}
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Multi-Task Loss</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 mb-6">
        <div className="text-sm font-mono text-center mb-4" style={{ color }}>
          {specs.trainingPipeline.lossFormula}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {specs.trainingPipeline.lossComponents.map((comp) => (
            <div
              key={comp.name}
              className="rounded-lg border border-[#2a2a3e] bg-[#111118] p-3 text-center"
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                {comp.name}
              </div>
              <div className="text-[10px] text-gray-400 font-mono mb-1">
                {comp.formula}
              </div>
              <div className="text-sm font-bold font-mono" style={{ color }}>
                {comp.weight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle color={color}>Data Augmentations</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {specs.trainingPipeline.augmentations.map((aug) => (
          <div
            key={aug.name}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
          >
            <div className="text-xs font-semibold text-white">{aug.name}</div>
            <div className="text-[10px] text-gray-500">
              p={aug.probability} · {aug.params}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Optimizer</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(specs.trainingPipeline.optimizer).map(([key, val]) => (
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

/* ─── Inference & Post-Processing ─── */
function InferenceSection({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Post-Processing Pipeline</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.inference.postProcessing.map((step, i) => (
          <motion.div
            key={step.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-3"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {i + 1}
            </div>
            <div>
              <div className="text-xs font-semibold text-white">{step.name}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {step.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>Streaming Architecture</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {specs.inference.streaming.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center"
          >
            <div className="text-xs text-gray-300">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Safety & MLOps ─── */
function SafetySection({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Watchdog System</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safety.watchdog.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-300">{item}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Graceful Degradation</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safety.degradation.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-2.5"
          >
            <span className="text-xs font-mono text-[#ef4444] min-w-[140px]">
              {d.trigger}
            </span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
              <path d="M0 4H12M12 4L8 1M12 4L8 7" stroke={color} strokeWidth="1" />
            </svg>
            <span className="text-xs text-gray-400">{d.fallback}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Fallback Model</SectionTitle>
      <GlowCard glowColor="#ef4444" className="p-4">
        <div className="text-sm font-bold text-[#ef4444] mb-2">
          {specs.safety.fallbackModel.name}
        </div>
        <div className="text-xs text-gray-400 font-mono mb-2">
          {specs.safety.fallbackModel.architecture}
        </div>
        <div className="flex gap-4 text-xs">
          <span className="text-gray-500">
            Params:{" "}
            <span className="text-white font-mono">
              {specs.safety.fallbackModel.params}
            </span>
          </span>
          <span className="text-gray-500">
            Output:{" "}
            <span className="text-white font-mono">
              {specs.safety.fallbackModel.output}
            </span>
          </span>
        </div>
      </GlowCard>
    </div>
  );
}

/* ─── Deployment ─── */
function DeploymentSection({ specs, color }: { specs: AcousticAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Target Platform</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {Object.entries(specs.deployment.target).map(([key, val]) => (
          <div
            key={key}
            className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center"
          >
            <div className="text-xs font-mono" style={{ color }}>
              {val}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              {key.replace(/_/g, " ")}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Compression Techniques</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.deployment.compression.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-300">{c}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Communications</SectionTitle>
      <div className="space-y-2">
        {specs.deployment.communications.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#22c55e" }}
            />
            <span className="text-xs text-gray-300">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function AcousticAIDetail({
  specs,
  color,
}: {
  specs: AcousticAISpecs;
  color: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-8 relative">
      <BackgroundOrbs colors={["#00d4ff", "#0891b2", "#06b6d4"]} />
      <FloatingParticles count={20} color="#00d4ff" />
      <GlowCard glowColor={color} className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color }}>
              OmniRescue Architecture
            </h2>
            <p className="text-xs text-gray-500">
              Multi-task acoustic survivor detection — 19.7M parameters
            </p>
          </div>
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
                    layoutId="acousticTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <GlowingDivider color="#00d4ff" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 0 && <MainArchitecture specs={specs} color={color} />}
            {activeTab === 1 && <DSPFeatures specs={specs} color={color} />}
            {activeTab === 2 && <TrainingPipeline specs={specs} color={color} />}
            {activeTab === 3 && <InferenceSection specs={specs} color={color} />}
            {activeTab === 4 && <SafetySection specs={specs} color={color} />}
            {activeTab === 5 && <DeploymentSection specs={specs} color={color} />}
          </motion.div>
        </AnimatePresence>

        <GlowingDivider color="#0891b2" />

      {/* Parameter Breakdown */}
        <div className="mt-8">
          <SectionTitle color={color}>Parameter Breakdown</SectionTitle>
          <div className="rounded-xl border border-[#2a2a3e] overflow-hidden">
            {specs.parameterBreakdown.map((item, i) => {
              const isTotal = item.component.includes("Total");
              return (
                <div
                  key={item.component}
                  className={`flex items-center justify-between px-4 py-2.5 ${
                    i > 0 ? "border-t border-[#2a2a3e]" : ""
                  } ${isTotal ? "bg-[#1a1a2e]" : "bg-[#0a0a0f]"}`}
                >
                  <span
                    className={`text-xs ${
                      isTotal ? "font-bold text-white" : "text-gray-400"
                    }`}
                  >
                    {item.component}
                  </span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: isTotal ? color : "#94a3b8" }}
                  >
                    {item.params}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
