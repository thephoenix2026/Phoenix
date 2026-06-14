"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HazardAISpecs } from "@/lib/data/models";
import GlowCard from "@/components/shared/GlowCard";
import { FloatingParticles, BackgroundOrbs, GlowingDivider } from "./AIAnimations";

const tabs = [
  "Architecture",
  "Features",
  "Training",
  "Rule Engine",
  "API & Deploy",
  "Monitoring",
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
        <span className="text-[10px] text-gray-500 mt-0.5 font-mono max-w-[140px]">
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
          <path d="M6 0V20M6 20L2 16M6 20L10 16" stroke={color} strokeWidth="1.5" />
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
        <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={color} strokeWidth="1.5" />
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
    <h3 className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color }}>
      {children}
    </h3>
  );
}

/* ─── Main Architecture ─── */
function MainArchitecture({ color }: { color: string }) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[750px]">
        {/* Pipeline */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <ArchNode label="MQ Sensors" sub="ADC Raw" color="#94a3b8" />
          <Arrow color={color} label="Calibration" />
          <ArchNode label="PPM Values" sub="CO, CO₂, CH₄, H₂S" color="#a855f7" />
          <Arrow color={color} label="Scaling" />
          <ArchNode label="15 Features" sub="6 raw + 9 derived" color={color} glow large />
          <Arrow color={color} />
          <ArchNode label="XGBoost" sub="200 trees" color="#22c55e" glow large />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-[500px]" />
          <Arrow direction="down" color="#22c55e" label="probs" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-[300px]" />
          <ArchNode label="Rule Engine" sub="Safety Escalation" color="#ef4444" glow large />
          <Arrow color="#ef4444" />
          <ArchNode label="Recommendation" sub="OSHA Compliance" color="#3b82f6" glow large />
        </div>

        {/* Output */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {["Risk Level", "Confidence", "PPE Actions", "Reasons"].map((out, i) => (
            <motion.div
              key={out}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <ArchNode label={out} color="#64748b" />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#a855f7]/20 border border-[#a855f7]/50" />
            Sensor Input
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#22c55e]/20 border border-[#22c55e]/50" />
            ML Model
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#ef4444]/20 border border-[#ef4444]/50" />
            Rule Engine
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#3b82f6]/20 border border-[#3b82f6]/50" />
            Output
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Features ─── */
function FeaturesSection({ specs, color }: { specs: HazardAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Input Modes</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {specs.features.inputModes.map((mode) => (
          <div
            key={mode.name}
            className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4"
          >
            <div className="text-sm font-bold text-white mb-2">{mode.name}</div>
            <div className="text-xs text-gray-400 font-mono">{mode.features}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>MQ Sensor Calibration Curves</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-4 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Sensor</div>
          <div>Gas</div>
          <div>Formula</div>
          <div>Clip Range</div>
        </div>
        {specs.features.calibration.map((c, i) => (
          <div
            key={c.sensor}
            className={`grid grid-cols-4 gap-0 px-4 py-2.5 text-xs ${
              i > 0 ? "border-t border-[#2a2a3e]" : ""
            } bg-[#0a0a0f]`}
          >
            <div className="font-semibold text-white">{c.sensor}</div>
            <div style={{ color }}>{c.gas}</div>
            <div className="text-gray-400 font-mono text-[10px]">{c.formula}</div>
            <div className="text-gray-400 font-mono">{c.clipRange}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Scaler Parameters</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {specs.features.scalerParams.map((s) => (
          <div key={s.feature} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3">
            <div className="text-xs font-bold text-white mb-1">{s.feature}</div>
            <div className="text-[10px] text-gray-500">{s.scaler}</div>
            <div className="text-[10px] text-gray-400 font-mono mt-0.5">{s.params}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Derived Features (15 total)</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {specs.features.derived.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2"
          >
            <span className="text-[10px] font-mono text-gray-500 w-5 text-right">{i + 1}.</span>
            <span className="text-xs font-semibold text-white min-w-[120px]">{f.name}</span>
            <span className="text-[10px] text-gray-400 font-mono">{f.formula}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Training ─── */
function TrainingSection({ specs, color }: { specs: HazardAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Training Pipeline</SectionTitle>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {specs.training.stages.map((stage, i) => (
          <div key={stage.step} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-3 text-center min-w-[120px]"
              style={{ borderColor: `${color}40`, backgroundColor: `${color}08` }}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                Step {i + 1}
              </div>
              <div className="text-xs font-bold" style={{ color }}>
                {stage.step}
              </div>
              <div className="text-[10px] text-gray-500 mt-1 max-w-[160px]">
                {stage.details}
              </div>
            </motion.div>
            {i < specs.training.stages.length - 1 && <Arrow color={color} />}
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Evaluation Metrics</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {specs.training.evaluation.map((m) => (
          <div key={m.metric} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
            <div className="text-lg font-bold font-mono" style={{ color }}>
              {m.value}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">{m.metric}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Confusion Matrix</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        <div className="grid grid-cols-4 gap-0 text-[10px] text-gray-500 uppercase tracking-wider px-4 py-2 bg-[#111118] border-b border-[#2a2a3e]">
          <div>Actual</div>
          <div className="text-center">Pred HIGH</div>
          <div className="text-center">Pred LOW</div>
          <div className="text-center">Pred MEDIUM</div>
        </div>
        {specs.training.confusionMatrix.map((row, i) => (
          <div
            key={row.actual}
            className={`grid grid-cols-4 gap-0 px-4 py-2.5 text-xs ${
              i > 0 ? "border-t border-[#2a2a3e]" : ""
            } bg-[#0a0a0f]`}
          >
            <div className="font-semibold text-white">{row.actual}</div>
            <div className="text-center font-mono" style={{ color: row.predicted.HIGH > 100 ? "#22c55e" : "#94a3b8" }}>
              {row.predicted.HIGH.toLocaleString()}
            </div>
            <div className="text-center font-mono" style={{ color: row.predicted.LOW > 100 ? "#22c55e" : "#94a3b8" }}>
              {row.predicted.LOW.toLocaleString()}
            </div>
            <div className="text-center font-mono" style={{ color: row.predicted.MEDIUM > 100 ? "#22c55e" : "#94a3b8" }}>
              {row.predicted.MEDIUM.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Feature Importance (Gain)</SectionTitle>
      <div className="space-y-3">
        {specs.training.featureImportance.map((f, i) => (
          <motion.div
            key={f.feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-white font-mono">{f.feature}</span>
              <span className="font-mono font-bold" style={{ color }}>
                {(f.importance * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-[#1a1a2e] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
                initial={{ width: 0 }}
                animate={{ width: `${f.importance * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Rule Engine ─── */
function RuleEngineSection({ specs, color }: { specs: HazardAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Priority 1 — HIGH (Life-Safety)</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.ruleEngine.high.map((rule) => (
          <div
            key={rule.rule}
            className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-bold text-red-400">{rule.rule}</div>
              <div className="text-[10px] text-gray-400 font-mono mt-0.5">{rule.condition}</div>
            </div>
            <div className="text-[10px] text-gray-500 text-right max-w-[200px]">{rule.message}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Priority 2 — MEDIUM (Warning)</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.ruleEngine.medium.map((rule) => (
          <div
            key={rule.rule}
            className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3"
          >
            <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-bold text-yellow-400">{rule.rule}</div>
              <div className="text-[10px] text-gray-400 font-mono mt-0.5">{rule.condition}</div>
            </div>
            <div className="text-[10px] text-gray-500 text-right max-w-[200px]">{rule.message}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Priority 3 — LOW (All-Clear)</SectionTitle>
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 px-4 py-3 mb-6">
        <div className="text-xs text-green-400">{specs.ruleEngine.low[0]}</div>
      </div>

      <SectionTitle color={color}>Recommendation Engine</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specs.recommendation.map((rec) => {
          const riskColor = rec.risk === "HIGH" ? "#ef4444" : rec.risk === "MEDIUM" ? "#eab308" : "#22c55e";
          return (
            <motion.div
              key={rec.risk}
              whileHover={{ scale: 1.03, y: -3 }}
              className="rounded-xl border p-4"
              style={{ borderColor: `${riskColor}30`, backgroundColor: `${riskColor}08` }}
            >
              <div className="text-sm font-bold mb-2" style={{ color: riskColor }}>
                {rec.risk}
              </div>
              <div className="text-xs text-gray-300 mb-2">{rec.action}</div>
              <div className="text-[10px] text-gray-500 font-mono">
                OSHA {rec.oshaRef}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── API & Deployment ─── */
function APIDeploySection({ specs, color }: { specs: HazardAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>API Endpoints</SectionTitle>
      <div className="rounded-xl border border-[#2a2a3e] overflow-hidden mb-6">
        {specs.api.endpoints.map((ep, i) => (
          <div
            key={ep.endpoint}
            className={`flex items-center gap-4 px-4 py-3 ${
              i > 0 ? "border-t border-[#2a2a3e]" : ""
            } bg-[#0a0a0f]`}
          >
            <span
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: ep.method === "GET" ? "#22c55e20" : "#3b82f620",
                color: ep.method === "GET" ? "#22c55e" : "#3b82f6",
              }}
            >
              {ep.method}
            </span>
            <span className="text-xs font-mono text-white min-w-[120px]">{ep.endpoint}</span>
            <span className="text-[10px] text-gray-500">{ep.auth}</span>
            <span className="text-[10px] text-gray-400 ml-auto">{ep.description}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <SectionTitle color={color}>Input Schema</SectionTitle>
          <div className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
            {Object.entries(specs.api.inputSchema).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-1.5 border-b border-[#2a2a3e]/50 last:border-0">
                <span className="text-xs font-mono text-white">{key}</span>
                <span className="text-[10px] text-gray-500 font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle color={color}>Security</SectionTitle>
          <div className="space-y-2">
            {specs.api.security.map((s, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTitle color={color}>Edge Deployment Targets</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {specs.deployment.targets.map((t) => (
          <div key={t.name} className="rounded-xl border border-[#2a2a3e] bg-[#0a0a0f] p-4">
            <div className="text-sm font-bold text-white mb-2">{t.name}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-500">RAM</div>
                <div className="text-gray-300 font-mono">{t.ram}</div>
              </div>
              <div>
                <div className="text-gray-500">Flash</div>
                <div className="text-gray-300 font-mono">{t.flash}</div>
              </div>
              <div>
                <div className="text-gray-500">CPU</div>
                <div className="text-gray-300 font-mono">{t.cpu}</div>
              </div>
              <div>
                <div className="text-gray-500">Format</div>
                <div className="text-gray-300 font-mono">{t.formats}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Compliance Coverage</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {specs.compliance.map((c) => (
          <span key={c} className="px-3 py-1 text-[10px] rounded-full border border-[#2a2a3e] bg-[#0a0a0f] text-gray-400 font-mono">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Monitoring ─── */
function MonitoringSection({ specs, color }: { specs: HazardAISpecs; color: string }) {
  return (
    <div>
      <SectionTitle color={color}>Logging</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.monitoring.logging.map((l, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-gray-300 font-mono">{l}</span>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Drift Detection</SectionTitle>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {specs.monitoring.drift.map((d, i) => (
          <div key={i} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
            <div className="text-xs font-mono" style={{ color }}>{d}</div>
          </div>
        ))}
      </div>

      <SectionTitle color={color}>Alert System</SectionTitle>
      <div className="space-y-2 mb-6">
        {specs.monitoring.alerts.map((a, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-xs text-gray-300">{a}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SectionTitle color={color}>Incident Tracking</SectionTitle>
          <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-4 text-xs text-gray-400">
            {specs.monitoring.incidents}
          </div>
        </div>
        <div>
          <SectionTitle color={color}>Model Registry</SectionTitle>
          <div className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-4 text-xs text-gray-400">
            {specs.monitoring.registry}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionTitle color={color}>FMEA — Failure Mode Analysis</SectionTitle>
        <div className="rounded-xl border border-[#2a2a3e] overflow-hidden">
          {specs.fmea.map((f, i) => (
            <div
              key={f.category}
              className={`px-4 py-3 ${i > 0 ? "border-t border-[#2a2a3e]" : ""} bg-[#0a0a0f]`}
            >
              <div className="text-xs font-bold text-white mb-1">{f.category}</div>
              <div className="text-[10px] text-gray-500 mb-0.5">
                Failures: <span className="text-gray-400">{f.failureModes}</span>
              </div>
              <div className="text-[10px] text-gray-500">
                Mitigation: <span className="text-gray-400">{f.mitigation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function HazardAIDetail({
  specs,
  color,
}: {
  specs: HazardAISpecs;
  color: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-8 relative">
      <BackgroundOrbs colors={["#f97316", "#ef4444", "#eab308"]} />
      <FloatingParticles count={20} color="#f97316" />
      <GlowCard glowColor={color} className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color }}>
              XGBoost Hazard Classifier
            </h2>
            <p className="text-xs text-gray-500">
              200 trees · 15 features · OSHA-compliant rule engine
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
                    layoutId="hazardTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <GlowingDivider color="#f97316" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 0 && <MainArchitecture color={color} />}
            {activeTab === 1 && <FeaturesSection specs={specs} color={color} />}
            {activeTab === 2 && <TrainingSection specs={specs} color={color} />}
            {activeTab === 3 && <RuleEngineSection specs={specs} color={color} />}
            {activeTab === 4 && <APIDeploySection specs={specs} color={color} />}
            {activeTab === 5 && <MonitoringSection specs={specs} color={color} />}
          </motion.div>
        </AnimatePresence>

        <GlowingDivider color="#ef4444" />

        {/* Hyperparameters */}
        <div className="mt-8">
          <SectionTitle color={color}>XGBoost Hyperparameters</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(specs.model.hyperparams).map(([key, val]) => (
              <div key={key} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
                <div className="text-xs font-mono" style={{ color }}>{val}</div>
                <div className="text-[10px] text-gray-500 mt-1">{key.replace(/_/g, " ")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tree Structure */}
        <div className="mt-6">
          <SectionTitle color={color}>Tree Structure</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {specs.model.treeStructure.map((t) => (
              <div key={t.metric} className="rounded-lg border border-[#2a2a3e] bg-[#0a0a0f] p-3 text-center">
                <div className="text-sm font-bold font-mono" style={{ color }}>{t.value}</div>
                <div className="text-[10px] text-gray-500 mt-1">{t.metric}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Metrics */}
        <div className="mt-6">
          <SectionTitle color={color}>Class-wise Performance</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#2a2a3e]">
                  <th className="text-left py-2 px-3 text-gray-500 font-medium">Class</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Precision</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Recall</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">F1</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Specificity</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium">Support</th>
                </tr>
              </thead>
              <tbody>
                {specs.training.classMetrics.map((c) => (
                  <tr key={c.class} className="border-b border-[#2a2a3e]/50">
                    <td className="py-2 px-3 font-bold" style={{ color }}>{c.class}</td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">{c.precision.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">{c.recall.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">{c.f1.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">{c.specificity.toFixed(4)}</td>
                    <td className="py-2 px-3 text-right text-gray-300 font-mono">{c.support.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
