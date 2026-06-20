"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Survivor {
  id: number;
  priority: "critical" | "high" | "medium" | "low";
  method: "thermal" | "acoustic" | "structural" | "visual";
  location: string;
  distance: string;
  confidence: number;
}

function seedShuffle<T>(arr: T[], seed: number): T[] {
  let s = seed;
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) | 0;
    const j = (s >>> 0) % (i + 1);
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function generateSurvivors(count: number, seed: number): Survivor[] {
  const priorities: Survivor["priority"][] = ["critical", "high", "medium", "low"];
  const methods: Survivor["method"][] = ["thermal", "acoustic", "structural", "visual"];
  const locations = [
    "Ground floor — east wing", "Basement level 1", "Stairwell B — 3rd floor",
    "Rubble pile — north side", "Underground parking — section C", "Roof access — south",
    "Collapsed corridor — west wing", "Utility shaft — level 2", "Loading dock — rear",
    "Debris field — center", "Adjacent structure — annex A", "Trench — drainage canal",
  ];
  const rng = () => { seed = (seed * 1664525 + 1013904223) | 0; return (seed >>> 0) / 4294967296; };

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    priority: priorities[Math.floor(rng() * priorities.length)] as Survivor["priority"],
    method: methods[Math.floor(rng() * methods.length)] as Survivor["method"],
    location: locations[i % locations.length],
    distance: `${(1 + rng() * 15).toFixed(1)}m`,
    confidence: Math.round(75 + rng() * 23),
  }));
}

interface SurvivorBoardProps {
  survivorsFound: number;
  robotCodename: string;
  seed: number;
}

const priorityColors: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#10b981",
};

const methodIcons: Record<string, string> = {
  thermal: "🌡️",
  acoustic: "🔊",
  structural: "📐",
  visual: "👁️",
};

export default function SurvivorBoard({ survivorsFound, robotCodename, seed }: SurvivorBoardProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const survivors = useMemo(() => {
    const count = Math.max(1, Math.min(survivorsFound, 12));
    return generateSurvivors(count, seed).slice(0, count);
  }, [survivorsFound, seed]);

  return (
    <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#10b981" }}
              animate={{ boxShadow: ["0 0 4px rgba(16,185,129,0.4)", "0 0 10px rgba(16,185,129,0.7)", "0 0 4px rgba(16,185,129,0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-white font-bold font-mono">SURVIVOR STATUS</span>
          </div>
          <motion.span
            className="text-lg font-bold font-mono"
            style={{ color: "#10b981" }}
            key={survivorsFound}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
          >
            {survivorsFound}
          </motion.span>
        </div>

        {/* Radar Grid */}
        <div className="relative rounded-lg border border-[#1a1a2e] bg-[#0a0a0f] p-3 mb-3 overflow-hidden" style={{ minHeight: 160 }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Distance rings */}
          {[30, 60, 90].map((r) => (
            <div
              key={r}
              className="absolute rounded-full border border-[#00d4ff]/10"
              style={{ width: r * 2, height: r * 2, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
            />
          ))}
          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full bg-[#00d4ff]/30" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />

          {/* Survivor dots */}
          {survivors.map((s, i) => {
            const angle = (i / survivors.length) * Math.PI * 2 - Math.PI / 2;
            const dist = 20 + (s.id * 7) % 55;
            const isHovered = hoveredId === s.id;

            return (
              <motion.div
                key={s.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 18 }}
                className="absolute"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * dist}px)`,
                  top: `calc(50% + ${Math.sin(angle) * dist}px)`,
                  transform: "translate(-50%,-50%)",
                }}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 20, height: 20, left: -10, top: -10,
                    border: `1px solid ${priorityColors[s.priority]}60`,
                  }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeOut" }}
                />

                {/* Dot */}
                <motion.div
                  className="w-3 h-3 rounded-full relative z-10 cursor-pointer"
                  style={{
                    backgroundColor: priorityColors[s.priority],
                    boxShadow: `0 0 6px ${priorityColors[s.priority]}80`,
                  }}
                  animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
                />
              </motion.div>
            );
          })}

          {/* Label */}
          <div className="absolute bottom-1 left-2 text-[8px] text-[#475569] font-mono">
            {robotCodename} — scanning
          </div>
        </div>

        {/* Survivor List */}
        <div className="space-y-1">
          {survivors.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + s.id * 0.04 }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors cursor-default"
              style={{
                backgroundColor: hoveredId === s.id ? `${priorityColors[s.priority]}10` : "transparent",
              }}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Priority indicator */}
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: priorityColors[s.priority] }}
              />
              {/* ID */}
              <span className="text-[10px] text-white/60 font-mono w-5">{`S${String(s.id).padStart(2, "0")}`}</span>
              {/* Method icon */}
              <span className="text-[10px]">{methodIcons[s.method]}</span>
              {/* Distance */}
              <span className="text-[9px] text-[#64748b] font-mono">{s.distance}</span>
              {/* Confidence bar */}
              <div className="flex-1 h-1 rounded-full bg-[#1a1a2e] overflow-hidden ml-1">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: priorityColors[s.priority], width: `${s.confidence}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.confidence}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + s.id * 0.04 }}
                />
              </div>
              <span className="text-[8px] text-[#475569] font-mono w-6 text-right">{s.confidence}%</span>

              {/* Hover tooltip */}
              {hoveredId === s.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 -top-10 bg-[#0d0d15]/95 border border-[#2a2a3e] rounded-lg px-2.5 py-1.5 z-20 pointer-events-none whitespace-nowrap"
                >
                  <p className="text-[10px] text-white font-medium">{s.location}</p>
                  <p className="text-[8px] text-[#64748b] font-mono mt-0.5">
                    {s.method.toUpperCase()} · Priority: {s.priority.toUpperCase()}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
