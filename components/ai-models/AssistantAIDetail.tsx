"use client";

import { useState } from "react";
import { FloatingParticles, BackgroundOrbs, GlowingDivider, PulsingBadge } from "./AIAnimations";
import { motion, AnimatePresence } from "framer-motion";
import type { AssistantAISpecs } from "@/lib/data/models";
import GlowCard from "@/components/shared/GlowCard";

const tabs = [
  "Core Models",
  "Pipeline",
  "RAG System",
  "Safety Rules",
  "Validation",
  "Deployment",
];

function Arrow({ direction = "right", color, label }: { direction?: "right" | "down"; color: string; label?: string }) {
  if (direction === "down") {
    return (
      <div className="flex flex-col items-center gap-0.5 py-1">
        {label && <span className="text-[9px] text-gray-500 font-mono">{label}</span>}
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
          <path d="M6 0V20M6 20L2 16M6 20L10 16" stroke={color} strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0.5 px-1">
      {label && <span className="text-[9px] text-gray-500 font-mono">{label}</span>}
      <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
        <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color }}>
      {children}
    </h3>
  );
}

/* ─── Core Models ─── */
function CoreModelsSection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Primary LLM</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 mb-6">
        <div className="text-sm font-bold text-white mb-3">{specs.coreModels.primary.name}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(specs.coreModels.primary.params).map(([key, val]) => (
            <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#111118] px-3 py-2">
              <div className="text-[10px] text-gray-500">{key}</div>
              <div className="text-xs font-mono" style={{ color }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <SectionTitle color={color}>Embedding Model (RAG)</SectionTitle>
          <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
            <div className="text-xs font-bold text-white mb-2">{specs.coreModels.embedding.name}</div>
            <div className="space-y-1.5">
              {Object.entries(specs.coreModels.embedding.params).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-mono" style={{ color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <SectionTitle color={color}>Reranker Model</SectionTitle>
          <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
            <div className="text-xs font-bold text-white mb-2">{specs.coreModels.reranker.name}</div>
            <div className="space-y-1.5">
              {Object.entries(specs.coreModels.reranker.params).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-mono" style={{ color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionTitle color={color}>Inference Backends</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {specs.inferenceEngine.backends.map((b) => (
          <div key={b.name} className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
            <div className="text-xs font-bold text-white mb-1">{b.name}</div>
            <div className="text-[10px] text-gray-400 mb-2">{b.description}</div>
            <div className="space-y-1">
              {Object.entries(b.config).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 text-[10px]">
                  <span className="text-gray-500 min-w-[60px]">{k}:</span>
                  <span className="font-mono text-gray-300 break-all">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Hardware Configurations</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-4 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Hardware</div>
          <div>Model</div>
          <div>Quantization</div>
          <div>Max Length</div>
        </div>
        {specs.inferenceEngine.hardware.map((h, i) => (
          <div key={h.hardware} className={`grid grid-cols-4 gap-0 px-4 py-2.5 text-xs ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}>
            <div className="font-semibold text-white">{h.hardware}</div>
            <div className="text-gray-400">{h.model}</div>
            <div className="font-mono" style={{ color }}>{h.quantization}</div>
            <div className="text-gray-300 font-mono">{h.maxLen}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SectionTitle color={color}>Generation Defaults</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(specs.inferenceEngine.generation).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-center">
                <div className="text-xs font-mono" style={{ color }}>{val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{key.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle color={color}>LoRA Fine-Tuning</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(specs.inferenceEngine.lora).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-center">
                <div className="text-xs font-mono" style={{ color }}>{val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{key.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Pipeline ─── */
function PipelineSection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>8-Stage Inference Pipeline</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {specs.pipeline.stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2">
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 250 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="rounded-xl border p-3 text-center min-w-[130px]"
              style={{ borderColor: `${stage.color}40`, backgroundColor: `${stage.color}08` }}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Stage {i + 1}</div>
              <div className="text-xs font-bold" style={{ color: stage.color }}>{stage.name}</div>
              <div className="text-[10px] text-gray-400 mt-1 max-w-[150px]">{stage.description}</div>
            </motion.div>
            {i < specs.pipeline.stages.length - 1 && <Arrow color={color} />}
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Data Flow</SectionTitle>
      <div className="space-y-2">
        {specs.pipeline.flow.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-2.5"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold" style={{ backgroundColor: `${color}20`, color }}>
              {i + 1}
            </div>
            <span className="text-xs font-mono text-gray-300">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── RAG System ─── */
function RAGSection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Chunking Strategy</SectionTitle>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(specs.rag.chunking).map(([key, val]) => (
          <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="text-[10px] text-gray-500">{key}</div>
            <div className="text-xs font-mono" style={{ color }}>{val}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Vector Store Configuration</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.rag.vectorStore.map((v) => (
          <div key={v.component} className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-semibold text-white min-w-[120px]">{v.component}</span>
            <span className="text-[10px] text-gray-400 font-mono">{v.spec}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Knowledge Base Sources</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.rag.knowledge.map((k) => (
          <div key={k.source} className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold" style={{ backgroundColor: `${color}20`, color }}>
              {k.priority}
            </div>
            <span className="text-xs font-semibold text-white min-w-[140px]">{k.source}</span>
            <span className="text-[10px] text-gray-500 font-mono">{k.path}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Coverage ({specs.rag.docCount} documents)</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {specs.rag.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border px-3 py-1 text-xs font-mono"
            style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Safety Rules ─── */
function SafetySection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Deterministic Safety Rules (12)</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safetyRules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 rounded-lg border px-4 py-3"
            style={{ borderColor: `${rule.color}30`, backgroundColor: `${rule.color}08` }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: rule.color }} />
            <span className="text-[10px] font-mono font-bold min-w-[60px]" style={{ color: rule.color }}>{rule.id}</span>
            <span className="text-xs text-white flex-1">{rule.rule}</span>
            <span className="text-[10px] font-mono text-gray-500">{rule.threshold}</span>
            <PulsingBadge
              color={rule.color}
            >
              {rule.severity}
            </PulsingBadge>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>Override Actions</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {specs.overrideActions.map((action) => (
          <span
            key={action}
            className="rounded-full border px-3 py-1 text-xs font-mono"
            style={{ borderColor: "#ef444440", color: "#ef4444", backgroundColor: "#ef444410" }}
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Validation ─── */
function ValidationSection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Response Validation Stack</SectionTitle>
      <div className="space-y-3 mb-8">
        {specs.validation.map((v, i) => (
          <motion.div
            key={v.check}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm font-bold text-white">{v.check}</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">{v.method}</div>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>Confidence Scoring Formula</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: "Retrieval", weight: "25%", c: "#22c55e" },
            { label: "Safety", weight: "35%", c: "#ef4444" },
            { label: "Model", weight: "25%", c: "#3b82f6" },
            { label: "Validation", weight: "15%", c: "#eab308" },
          ].map((part, i) => (
            <div key={part.label} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-600 text-xs">+</span>}
              <div className="rounded-lg border px-3 py-2 text-center" style={{ borderColor: `${part.c}40`, backgroundColor: `${part.c}10` }}>
                <div className="text-xs font-bold" style={{ color: part.c }}>{part.weight}</div>
                <div className="text-[10px] text-gray-500">{part.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Deployment ─── */
function DeploymentSection({ specs, color }: { specs: AssistantAISpecs; color: string }) {
  return (
    <div>
      <GlowingDivider color="#059669" />
      <SectionTitle color={color}>Docker Compose Services</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-3 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Service</div>
          <div>Port</div>
          <div>Description</div>
        </div>
        {specs.deployment.services.map((s, i) => (
          <div key={s.name} className={`grid grid-cols-3 gap-0 px-4 py-2.5 text-xs ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}>
            <div className="font-semibold text-white">{s.name}</div>
            <div className="font-mono" style={{ color }}>{s.port}</div>
            <div className="text-gray-400">{s.description}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Infrastructure</SectionTitle>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Network</div>
          <div className="text-xs font-mono" style={{ color }}>{specs.deployment.network}</div>
        </div>
        <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-3">
          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Volumes</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {specs.deployment.volumes.map((v) => (
              <span key={v} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: `${color}10`, color }}>
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle color={color}>MLOps</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(specs.mlops).map(([key, val]) => (
          <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
            <div className="text-xs font-mono" style={{ color }}>{val}</div>
            <div className="text-[10px] text-gray-500 mt-1">{key.replace(/_/g, " ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function AssistantAIDetail({
  specs,
  color,
}: {
  specs: AssistantAISpecs;
  color: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6 relative">
      <BackgroundOrbs colors={["#22c55e", "#10b981", "#059669"]} />
      <FloatingParticles count={20} color="#22c55e" />
      <GlowCard glowColor={color} className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M12 8V4H8M12 8a4 4 0 110 8 4 4 0 010-8zM4 12H2M22 12h-2M12 2v2M12 20v2" />
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color }}>
              NABD360 AI Assistant
            </h2>
            <p className="text-xs text-gray-500">
              Qwen2.5/Qwen3 LLM + RAG + deterministic safety engine · 1.5B–8B params · 13 knowledge docs
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
                  <motion.div layoutId="assistantTab" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: color }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <GlowingDivider color="#22c55e" />

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {activeTab === 0 && <CoreModelsSection specs={specs} color={color} />}
            {activeTab === 1 && <PipelineSection specs={specs} color={color} />}
            {activeTab === 2 && <RAGSection specs={specs} color={color} />}
            {activeTab === 3 && <SafetySection specs={specs} color={color} />}
            {activeTab === 4 && <ValidationSection specs={specs} color={color} />}
            {activeTab === 5 && <DeploymentSection specs={specs} color={color} />}
          </motion.div>
        </AnimatePresence>
      </GlowCard>
    </div>
  );
}
