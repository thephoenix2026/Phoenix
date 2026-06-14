"use client";

import { useState } from "react";
import { FloatingParticles, ShimmerText, BackgroundOrbs, GlowingDivider, TabUnderline } from "./AIAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { aiModels } from "@/lib/data/models";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import ThermalAIDetail from "./ThermalAIDetail";
import AcousticAIDetail from "./AcousticAIDetail";
import HazardAIDetail from "./HazardAIDetail";
import StructuralAIDetail from "./StructuralAIDetail";
import AssistantAIDetail from "./AssistantAIDetail";

const pipelineSteps = [
  "Data Collection",
  "Preprocessing",
  "Augmentation",
  "Model Training",
  "Validation",
  "Optimization",
  "Deployment",
];

const metricColors = {
  accuracy: "#00d4ff",
  precision: "#7c3aed",
  recall: "#22c55e",
  f1: "#f97316",
};

function ArchitectureDiagram({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-xs text-gray-400">
        Input
      </div>
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={color} strokeWidth="1.5" />
      </svg>
      <div
        className="rounded-lg border px-3 py-2 text-xs font-semibold"
        style={{ borderColor: color, color, backgroundColor: `${color}15` }}
      >
        Model Core
      </div>
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={color} strokeWidth="1.5" />
      </svg>
      <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-xs text-gray-400">
        Output
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-[#1a1a2e] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function AIModelsContent() {
  const [activeTab, setActiveTab] = useState(0);
  const model = aiModels[activeTab];

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative flex items-center justify-center py-32 overflow-hidden">
        <GridBackground />
        <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#f97316"]} />
        <FloatingParticles count={30} color="#00d4ff" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <ShimmerText text="AI Models" className="text-5xl md:text-7xl font-bold" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            6 intelligent models powering real-time disaster response
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="relative px-4">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max border-b border-[#2a2a3e] pb-px">
              {aiModels.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(i)}
                  className="relative px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                  style={{ color: activeTab === i ? m.color : "#64748b" }}
                >
                  {m.name}
                  {activeTab === i && (
                    <TabUnderline color={m.color} layoutId="activeTab" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlowingDivider color={model.color} />

      {/* Model Detail Panel */}
      <section className="relative py-16 px-4">
        <FloatingParticles count={15} color={model.color} />
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
              <motion.div key={model.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <h2
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: model.color }}
                  >
                    {model.name}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {model.purpose}
                  </p>

                  {/* Architecture */}
                  <GlowCard glowColor={model.color} className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Architecture
                    </h3>
                    <div className="rounded-lg bg-[#0a0a0f] border border-[#2a2a3e] p-4 font-mono text-sm text-gray-300 leading-relaxed">
                      {model.architecture}
                    </div>
                    <ArchitectureDiagram color={model.color} />
                  </GlowCard>

                  {/* Dataset */}
                  <GlowCard glowColor={model.color} className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Dataset
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {model.dataset}
                    </p>
                  </GlowCard>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Inputs */}
                  <GlowCard glowColor={model.color} className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Inputs
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {model.inputs.map((inp) => (
                        <span
                          key={inp}
                          className="rounded-full border px-3 py-1 text-xs font-mono"
                          style={{
                            borderColor: `${model.color}40`,
                            color: model.color,
                            backgroundColor: `${model.color}10`,
                          }}
                        >
                          {inp}
                        </span>
                      ))}
                    </div>
                  </GlowCard>

                  {/* Outputs */}
                  <GlowCard glowColor={model.color} className="space-y-3">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Outputs
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {model.outputs.map((out) => (
                        <span
                          key={out}
                          className="rounded-full border px-3 py-1 text-xs font-mono"
                          style={{
                            borderColor: "#2a2a3e",
                            color: "#94a3b8",
                            backgroundColor: "#1a1a2e",
                          }}
                        >
                          {out}
                        </span>
                      ))}
                    </div>
                  </GlowCard>

                  {/* Key Metrics */}
                  <GlowCard glowColor={model.color} className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Key Metrics
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { label: "Accuracy", value: model.accuracy },
                        { label: "Precision", value: model.precision },
                        { label: "Recall", value: model.recall },
                        { label: "F1 Score", value: model.f1Score },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center"
                        >
                          <div
                            className="text-2xl font-bold font-mono"
                            style={{ color: model.color }}
                          >
                            {m.value}%
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
                        <div
                          className="text-2xl font-bold font-mono"
                          style={{ color: model.color }}
                        >
                          {model.latency}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Latency
                        </div>
                      </div>
                    </div>
                  </GlowCard>

                  {/* Bar Chart */}
                  <GlowCard glowColor={model.color} className="space-y-4">
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                      Performance Breakdown
                    </h3>
                    <div className="space-y-3">
                      <MetricBar
                        label="Accuracy"
                        value={model.accuracy}
                        color={metricColors.accuracy}
                        delay={0}
                      />
                      <MetricBar
                        label="Precision"
                        value={model.precision}
                        color={metricColors.precision}
                        delay={0.1}
                      />
                      <MetricBar
                        label="Recall"
                        value={model.recall}
                        color={metricColors.recall}
                        delay={0.2}
                      />
                      <MetricBar
                        label="F1 Score"
                        value={model.f1Score}
                        color={metricColors.f1}
                        delay={0.3}
                      />
                    </div>
                  </GlowCard>
                </div>
              </div>

              {/* Training Pipeline */}
              <div className="mt-12">
                <GlowCard glowColor={model.color} className="space-y-6">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                    Training Pipeline
                  </h3>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 min-w-max">
                      {pipelineSteps.map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="rounded-lg border px-4 py-2.5 text-xs font-medium whitespace-nowrap"
                            style={{
                              borderColor: `${model.color}40`,
                              color: model.color,
                              backgroundColor: `${model.color}08`,
                            }}
                          >
                            <span className="text-gray-600 mr-1.5">
                              {i + 1}.
                            </span>
                            {step}
                          </motion.div>
                          {i < pipelineSteps.length - 1 && (
                            <motion.svg
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.08 + 0.15 }}
                              width="20"
                              height="12"
                              viewBox="0 0 20 12"
                              fill="none"
                              className="flex-shrink-0"
                            >
                              <path
                                d="M0 6H16M16 6L12 2M16 6L12 10"
                                stroke={model.color}
                                strokeWidth="1.5"
                                strokeOpacity="0.5"
                              />
                            </motion.svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </div>

              {/* Thermal AI Detailed Architecture (only for thermal model) */}
              {model.thermalSpecs && (
                <ThermalAIDetail specs={model.thermalSpecs} color={model.color} />
              )}

              {/* Acoustic AI Detailed Architecture (only for acoustic model) */}
              {model.acousticSpecs && (
                <AcousticAIDetail specs={model.acousticSpecs} color={model.color} />
              )}

              {/* Hazard AI Detailed Architecture (only for hazard model) */}
              {model.hazardSpecs && (
                <HazardAIDetail specs={model.hazardSpecs} color={model.color} />
              )}

              {/* Structural AI Detailed Architecture (only for structural model) */}
              {model.structuralSpecs && (
                <StructuralAIDetail specs={model.structuralSpecs} color={model.color} />
              )}

              {/* Assistant AI Detailed Architecture (only for assistant model) */}
              {model.assistantSpecs && (
                <AssistantAIDetail specs={model.assistantSpecs} color={model.color} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <GlowingDivider color="#00d4ff" />

      {/* Model Cards Grid */}
      <section className="relative py-16 px-4 bg-[#111118]">
        <BackgroundOrbs colors={["#00d4ff", "#22c55e", "#f97316"]} />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="All Models"
            subtitle="Click a card to explore its details"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {aiModels.map((m, i) => (
              <motion.button
                key={m.id}
                onClick={() => setActiveTab(i)}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className={`relative rounded-xl border p-5 text-left transition-all duration-300 ${
                  activeTab === i
                    ? "bg-[#1a1a2e]"
                    : "bg-[#111118] hover:bg-[#1a1a2e]"
                }`}
                style={{
                  borderColor: activeTab === i ? m.color : "#2a2a3e",
                  boxShadow:
                    activeTab === i
                      ? `0 0 20px ${m.color}20, 0 0 40px ${m.color}10`
                      : "none",
                }}
              >
                {/* Icon placeholder */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-sm font-bold"
                  style={{
                    backgroundColor: `${m.color}15`,
                    color: m.color,
                  }}
                >
                  {m.name.charAt(0)}
                </div>

                <h4 className="text-sm font-semibold text-white leading-tight mb-2 line-clamp-2">
                  {m.name}
                </h4>

                {/* Accuracy badge */}
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: `${m.color}15`,
                    color: m.color,
                  }}
                >
                  {m.accuracy}%
                </span>

                {/* Active indicator */}
                {activeTab === i && (
                  <motion.div
                    layoutId="activeCard"
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                    style={{ backgroundColor: m.color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
