"use client";

import { useState } from "react";
import { FloatingParticles, BackgroundOrbs, GlowingDivider, PulsingBadge } from "./AIAnimations";
import { motion, AnimatePresence } from "framer-motion";
import type { StructuralAISpecs } from "@/lib/data/models";
import GlowCard from "@/components/shared/GlowCard";

const tabs = [
  "Architecture",
  "Features",
  "Training",
  "Risk & Alerts",
  "Deployment",
  "Safety",
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
      <span className={`font-bold ${large ? "text-sm" : "text-xs"}`} style={{ color }}>
        {label}
      </span>
      {sub && (
        <span className="text-[10px] text-gray-500 mt-0.5 font-mono max-w-[140px]">{sub}</span>
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

/* ─── Main Architecture ─── */
function MainArchitecture({ color }: { color: string }) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Input → Preprocessing → Feature Extraction */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <ArchNode label="MPU6050" sub="6-axis IMU" color="#94a3b8" />
          <Arrow color={color} label="100Hz" />
          <ArchNode label="Preprocessing" sub="Butterworth+Madgwick" color="#a855f7" />
          <Arrow color={color} label="9ch" />
          <ArchNode label="500×9 Window" sub="5s @ 90% overlap" color="#a855f7" />
        </div>

        {/* Split: CNN branch + Feature branch */}
        <div className="flex items-start justify-center gap-6 mt-4">
          {/* CNN Branch */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-wider text-[#22c55e] font-semibold mb-2">
              CNN-BiGRU Branch (~1.2M params)
            </div>
            <div className="flex items-center gap-1 mb-2">
              <ArchNode label="Multi-Scale" sub="Conv1D k=[3,7,15]" color="#22c55e" />
              <Arrow color="#22c55e" />
              <ArchNode label="Residual" sub="Dilated Conv" color="#22c55e" />
              <Arrow color="#22c55e" />
              <ArchNode label="SE Block" sub="Attention" color="#22c55e" glow />
            </div>
            <Arrow direction="down" color="#22c55e" />
            <div className="flex items-center gap-1 mb-2">
              <ArchNode label="BiGRU" sub="32+16" color="#22c55e" glow />
              <Arrow color="#22c55e" />
              <ArchNode label="Attention" sub="Pooling" color="#22c55e" />
            </div>
            <Arrow direction="down" color="#22c55e" />
            <ArchNode label="P_cnn" sub="5 classes" color="#22c55e" />
          </div>

          {/* Divider */}
          <div className="w-px bg-[#2a2a3e] self-stretch" />

          {/* XGBoost Branch */}
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-wider text-[#f97316] font-semibold mb-2">
              XGBoost Branch (53 features)
            </div>
            <div className="flex items-center gap-1 mb-2">
              <ArchNode label="53 Features" sub="Time+Freq+Orient" color="#f97316" />
              <Arrow color="#f97316" />
              <ArchNode label="XGBoost" sub="200 trees, d=8" color="#f97316" glow />
            </div>
            <Arrow direction="down" color="#f97316" />
            <ArchNode label="P_xgb" sub="5 classes" color="#f97316" />
          </div>
        </div>

        {/* Ensemble */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-[120px]" />
          <ArchNode label="Stacked Meta-Learner" sub="LogisticRegression" color="#eab308" glow large />
          <Arrow color="#eab308" />
          <ArchNode label="Risk Level" sub="+ Confidence" color="#eab308" glow large />
          <Arrow color="#eab308" />
          <ArchNode label="Alert System" sub="MQTT/Siren/Push" color="#ef4444" glow />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#a855f7]/20 border border-[#a855f7]/50" />
            Input & Preprocessing
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#22c55e]/20 border border-[#22c55e]/50" />
            CNN-BiGRU
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#f97316]/20 border border-[#f97316]/50" />
            XGBoost
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#eab308]/20 border border-[#eab308]/50" />
            Ensemble
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Features ─── */
function FeaturesSection({ specs, color }: { specs: StructuralAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Preprocessing Pipeline</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.pipeline.preprocessing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
            whileHover={{ x: 6 }}
            className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-2.5"
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold" style={{ backgroundColor: `${color}20`, color }}>
              {i + 1}
            </div>
            <span className="text-xs font-semibold text-white min-w-[140px]">{p.name}</span>
            <span className="text-[10px] text-gray-400 font-mono">{p.description}</span>
          </motion.div>
        ))}
      </div>

      <SectionTitle color={color}>Time-Domain Features (42)</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {specs.features.timeDomain.map((f) => (
          <div key={f.name} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="text-xs font-semibold text-white">{f.name}</div>
            <div className="text-[10px] text-gray-500">{f.description}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Frequency-Domain Features</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.features.frequencyDomain.map((f) => (
          <div key={f.name} className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-semibold text-white min-w-[160px]">{f.name}</span>
            <span className="text-[10px] text-gray-400">{f.description}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Orientation & Motion Features</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.features.orientation.map((f) => (
          <div key={f.name} className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#a855f7" }} />
            <span className="text-xs font-semibold text-white min-w-[180px]">{f.name}</span>
            <span className="text-[10px] text-gray-400">{f.description}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 text-center">
        <PulsingBadge color="#a855f7">{specs.features.total}</PulsingBadge>
      </div>
    </div>
  );
}

/* ─── Training ─── */
function TrainingSection({ specs, color }: { specs: StructuralAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>CNN-BiGRU Training</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {Object.entries(specs.training.cnn).map(([key, val]) => (
          <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
            <div className="text-xs font-mono" style={{ color }}>{val}</div>
            <div className="text-[10px] text-gray-500 mt-1">{key.replace(/_/g, " ")}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>CNN-BiGRU Architecture Stages</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {specs.models.cnnBigru.stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="rounded-xl border p-3 text-center min-w-[130px]"
              style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Stage {i + 1}</div>
              <div className="text-xs font-bold" style={{ color }}>{stage.name}</div>
              <div className="text-[10px] text-gray-500 mt-1 font-mono max-w-[150px]">{stage.architecture}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">→ {stage.output}</div>
            </motion.div>
            {i < specs.models.cnnBigru.stages.length - 1 && <Arrow color={color} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <SectionTitle color={color}>XGBoost Hyperparameters</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(specs.models.xgboost.hyperparams).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2 text-center">
                <div className="text-xs font-mono text-[#f97316]">{val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{key.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle color={color}>Ensemble Strategy</SectionTitle>
          <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4 space-y-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Weighted (Fallback)</div>
              <div className="text-xs font-mono" style={{ color }}>{specs.models.ensemble.weightedFormula}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Stacked (Primary)</div>
              <div className="text-[10px] text-gray-400 font-mono">{specs.models.ensemble.metaLearner}</div>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle color={color}>Data Augmentation (5× factor)</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {specs.pipeline.augmentation.map((a) => (
          <div key={a.name} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="text-xs font-semibold text-white">{a.name}</div>
            <div className="text-[10px] text-gray-500 font-mono">{a.params}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Risk & Alerts ─── */
function RiskAlertSection({ specs, color }: { specs: StructuralAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Risk Engine</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.inference.riskEngine.map((r) => (
          <div key={r.risk} className="flex items-center gap-4 rounded-lg border px-4 py-3" style={{ borderColor: `${r.color}30`, backgroundColor: `${r.color}08` }}>
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: r.color }}>{r.risk}</span>
                <span className="text-[10px] text-gray-500 font-mono">{r.probability}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{r.action}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Alert Manager</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-4 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Severity</div>
          <div>Risk</div>
          <div>Channels</div>
          <div>Ack Required</div>
        </div>
        {specs.inference.alertManager.map((a, i) => (
          <div key={a.severity} className={`grid grid-cols-4 gap-0 px-4 py-2.5 text-xs ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}>
            <div className="font-semibold" style={{ color }}>{a.severity}</div>
            <div className="text-gray-300">{a.risk}</div>
            <div className="text-gray-400 text-[10px]">{a.channels}</div>
            <div className="text-gray-400">{a.requiresAck}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Sensor Health Monitoring</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {specs.inference.sensorMonitor.map((s) => (
          <div key={s.check} className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <div>
              <span className="text-xs font-semibold text-white">{s.check}</span>
              <div className="text-[10px] text-gray-500 font-mono">{s.threshold}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Deployment ─── */
function DeploymentSection({ specs, color }: { specs: StructuralAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Export Formats</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {specs.deployment.exportFormats.map((f) => (
          <div key={f.format} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-4 py-3">
            <div className="text-xs font-bold text-white mb-0.5">{f.format}</div>
            <div className="text-[10px] text-gray-400 font-mono">{f.description}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Edge Deployment Targets</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-5 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Device</div>
          <div>Model</div>
          <div>Latency</div>
          <div>Size</div>
          <div>Ensemble</div>
        </div>
        {specs.deployment.edgeTargets.map((t, i) => (
          <div key={t.device} className={`grid grid-cols-5 gap-0 px-4 py-2.5 text-xs ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}>
            <div className="font-semibold text-white">{t.device}</div>
            <div className="text-gray-400 text-[10px]">{t.model}</div>
            <div className="font-mono" style={{ color }}>{t.latency}</div>
            <div className="text-gray-300 font-mono">{t.size}</div>
            <div className="text-gray-400">{t.ensemble}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>API Endpoints</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden">
        {specs.deployment.api.map((ep, i) => (
          <div key={ep.path} className={`flex items-center gap-4 px-4 py-3 ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded" style={{ backgroundColor: ep.method === "GET" ? "#22c55e20" : "#3b82f620", color: ep.method === "GET" ? "#22c55e" : "#3b82f6" }}>
              {ep.method}
            </span>
            <span className="text-xs font-mono text-white min-w-[120px]">{ep.path}</span>
            <span className="text-[10px] text-gray-400 ml-auto">{ep.output}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Safety ─── */
function SafetySection({ specs, color }: { specs: StructuralAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>MC Dropout Uncertainty</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safety.uncertainty.map((u, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-300">{u}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Graceful Degradation</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safety.gracefulDegradation.map((g, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-300">{g}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Human Override</SectionTitle>
      <div className="rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/5 px-4 py-3 mb-6">
        <div className="text-xs text-[#ef4444]">{specs.safety.humanOverride}</div>
      </div>

      <SectionTitle color={color}>Sensor Health Checks</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.safety.sensorHealth.map((s, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-300">{s}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Evaluation Targets</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {specs.evaluation.targets.map((t) => (
          <div key={t.metric} className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
            <div className="text-sm font-bold font-mono" style={{ color }}>{t.target}</div>
            <div className="text-[10px] text-gray-500 mt-1">{t.metric}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Explainability</SectionTitle>
      <div className="space-y-2">
        {specs.evaluation.explainability.map((e, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#7c3aed" }} />
            <span className="text-xs text-gray-300">{e}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function StructuralAIDetail({
  specs,
  color,
}: {
  specs: StructuralAISpecs;
  color: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-8 relative">
      <BackgroundOrbs colors={["#a855f7", "#6366f1", "#3b82f6"]} />
      <FloatingParticles count={20} color="#a855f7" />
      <GlowCard glowColor={color} className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color }}>
              OMEGA-100 Hybrid Ensemble
            </h2>
            <p className="text-xs text-gray-500">
              CNN-BiGRU + XGBoost stacked meta-learner · 1.2M params · 53 features
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
                  <motion.div layoutId="structuralTab" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: color }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>

      <GlowingDivider color="#a855f7" />

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {activeTab === 0 && <MainArchitecture color={color} />}
            {activeTab === 1 && <FeaturesSection specs={specs} color={color} />}
            {activeTab === 2 && <TrainingSection specs={specs} color={color} />}
            {activeTab === 3 && <RiskAlertSection specs={specs} color={color} />}
            {activeTab === 4 && <DeploymentSection specs={specs} color={color} />}
            {activeTab === 5 && <SafetySection specs={specs} color={color} />}
          </motion.div>
        </AnimatePresence>

      <GlowingDivider color="#6366f1" />

        {/* Input Specs */}
        <div className="mt-8">
          <SectionTitle color={color}>Input Specification</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.sensor}</div>
              <div className="text-[10px] text-gray-500 mt-1">Sensor</div>
            </div>
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.sampleRate}</div>
              <div className="text-[10px] text-gray-500 mt-1">Sample Rate</div>
            </div>
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.windowSize}</div>
              <div className="text-[10px] text-gray-500 mt-1">Window Size</div>
            </div>
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.stride}</div>
              <div className="text-[10px] text-gray-500 mt-1">Stride</div>
            </div>
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.channels.length} channels</div>
              <div className="text-[10px] text-gray-500 mt-1">{specs.pipeline.input.channels.join(", ")}</div>
            </div>
            <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
              <div className="text-xs font-mono" style={{ color }}>{specs.pipeline.input.classes.length} classes</div>
              <div className="text-[10px] text-gray-500 mt-1">{specs.pipeline.input.classes.join(", ")}</div>
            </div>
          </div>
        </div>

        {/* MLOps */}
        <div className="mt-6">
          <SectionTitle color={color}>MLOps</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(specs.mlops).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
                <div className="text-xs font-mono text-[#00d4ff]">{val}</div>
                <div className="text-[10px] text-gray-500 mt-1">{key.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
