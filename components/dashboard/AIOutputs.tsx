"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AIModelOutput } from "@/lib/data/robots";
import GlowCard from "@/components/shared/GlowCard";

interface AIOutputsProps {
  outputs: AIModelOutput[];
  robotCodename?: string;
}

const altOutputs: Record<string, string[]> = {
  "Thermal Detection": [
    "Scanning thermal signature — 3 survivors detected, Priority: HIGH",
    "Heat signature lost — adjusting IR sensitivity",
    "Multi-spectral analysis complete — 2 survivors confirmed",
  ],
  "Acoustic Analysis": [
    "Faint tapping detected at 340Hz — human origin probable",
    "No survivor sounds in current sector — moving to next zone",
    "Machinery vibration detected — filtering background noise",
  ],
  "Hazard Assessment": [
    "Risk Level: HIGH — PPE: Full HAZMAT Required — toxin detected",
    "Risk Level: LOW — Safe to proceed without additional PPE",
    "Risk Level: MODERATE — Structural instability in adjacent area",
  ],
  "Structural Risk": [
    "Collapse Probability: 28% — MODERATE — Monitor load-bearing walls",
    "Collapse Probability: 5% — LOW — Structure is stable",
    "Collapse Probability: 45% — HIGH — Evacuate immediately",
  ],
  "Rescue Assistant": [
    "Recommended: Re-route via Corridor A-3 for safer access",
    "Recommended: Hold position — secondary scan in progress",
    "Recommended: Proceed with caution — survivor extraction route B",
  ],
};

export default function AIOutputs({ outputs: initialOutputs, robotCodename = "PHX" }: AIOutputsProps) {
  const [outputs, setOutputs] = useState<AIModelOutput[]>(initialOutputs);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);

  useEffect(() => {
    setOutputs(initialOutputs);
  }, [initialOutputs]);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * initialOutputs.length);
      const model = initialOutputs[idx].model;
      const alternatives = altOutputs[model] || [];
      const newOutput = alternatives[Math.floor(Math.random() * alternatives.length)];
      const newConf = parseFloat((85 + Math.random() * 14).toFixed(1));

      setOutputs((prev) =>
        prev.map((o, i) =>
          i === idx
            ? { ...o, output: newOutput, confidence: newConf, status: "processing" as const }
            : o
        )
      );
      setFlashIdx(idx);
      setTimeout(() => setFlashIdx(null), 300);
      setTimeout(() => {
        setOutputs((prev) =>
          prev.map((o, i) =>
            i === idx ? { ...o, status: "active" as const } : o
          )
        );
      }, 600);
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [initialOutputs]);

  const statusColor = (s: string) => {
    if (s === "active") return "#22c55e";
    if (s === "processing") return "#eab308";
    return "#64748b";
  };

  return (
    <GlowCard glowColor="#a855f7" className="flex flex-col h-full">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
        AI Model Outputs — {robotCodename}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 flex-1">
        <AnimatePresence mode="popLayout">
          {outputs.map((out, i) => (
            <motion.div
              key={out.model}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                borderColor: flashIdx === i ? "#a855f7" : "#1a1a2e",
                boxShadow: flashIdx === i
                  ? "0 0 15px rgba(168, 85, 247, 0.3)"
                  : "0 0 0px rgba(168, 85, 247, 0)",
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0f]/60 rounded-lg p-3 border border-[#1a1a2e] flex flex-col"
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: statusColor(out.status) }}
                />
                <span className="text-xs text-white font-bold truncate">
                  {out.model}
                </span>
              </div>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed flex-1">
                {out.output}
              </p>
              {out.confidence !== undefined && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex-1 h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#a855f7] rounded-full"
                      animate={{ width: `${out.confidence}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-[10px] text-[#64748b] tabular-nums">
                    {out.confidence}%
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
