"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { robots } from "@/lib/data/robots";
import SectionHeader from "@/components/shared/SectionHeader";

interface Session { username: string; role: string; clearance: string; }

/* ─── Helpers ─── */
const ci = (ctx: CanvasRenderingContext2D) => ctx;
function seeded(seed: number) { let s = seed; return () => { s = (s * 1664525 + 1013904223) | 0; return (s >>> 0) / 4294967296; }; }

/* ─── Canvas Bar Chart ─── */
function BarChart({ data, labels, colors, title, unit, height = 180 }: {
  data: number[]; labels: string[]; colors: string[]; title: string; unit?: string; height?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = 420, H = height;
    c.width = W * 2; c.height = H * 2; c.style.width = `${W}px`; c.style.height = `${H}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);
    const max = Math.max(...data, 1);
    const pad = { t: 20, r: 10, b: 30, l: 10 };
    const cw = (W - pad.l - pad.r) / data.length;
    data.forEach((v, i) => {
      const bh = ((v / max) * (H - pad.t - pad.b));
      const x = pad.l + i * cw + 4;
      const y = H - pad.b - bh;
      const grad = ctx.createLinearGradient(x, y, x, H - pad.b);
      grad.addColorStop(0, colors[i % colors.length]);
      grad.addColorStop(1, `${colors[i % colors.length]}40`);
      ctx.fillStyle = grad;
      ci(ctx).beginPath();
      ci(ctx).roundRect(x, y, cw - 8, bh, [2, 2, 0, 0]);
      ctx.fill();
      ctx.fillStyle = "#475569"; ctx.font = "7px monospace"; ctx.textAlign = "center";
      ctx.fillText(labels[i], x + (cw - 8) / 2, H - 8);
      ctx.fillStyle = colors[i % colors.length]; ctx.font = "bold 8px monospace";
      ctx.fillText(`${v}${unit || ""}`, x + (cw - 8) / 2, y - 4);
    });
    ctx.fillStyle = "#475569"; ctx.font = "7px monospace"; ctx.textAlign = "left";
    ctx.fillText(title, 6, 12);
  }, [data, labels, colors, title, unit, height]);
  return <canvas ref={ref} className="w-full block rounded-lg" style={{ aspectRatio: `${420}/${height}` }} />;
}

/* ─── Canvas Doughnut Chart ─── */
function DoughnutChart({ segments, size = 140 }: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const total = segments.reduce((s, v) => s + v.value, 0) || 1;
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = size * 2; c.height = size * 2; c.style.width = `${size}px`; c.style.height = `${size}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2, r = size / 2 - 10, inR = r * 0.55;
    let start = -Math.PI / 2;
    segments.forEach((s) => {
      const sweep = (s.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + sweep);
      ctx.arc(cx, cy, inR, start + sweep, start, true);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      start += sweep;
    });
    ctx.fillStyle = "#0a0a0f";
    ctx.beginPath();
    ctx.arc(cx, cy, inR - 2, 0, Math.PI * 2);
    ctx.fill();
  }, [segments, size, total]);
  return <canvas ref={ref} className="block" style={{ width: size, height: size }} />;
}

/* ─── Canvas Radar Chart ─── */
function RadarChart({ axes, dataSets, size = 180 }: {
  axes: { label: string; max: number }[];
  dataSets: { label: string; values: number[]; color: string }[];
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    c.width = size * 2; c.height = size * 2; c.style.width = `${size}px`; c.style.height = `${size}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2, cy = size / 2, r = size / 2 - 20;
    const n = axes.length;

    // Grid
    for (let ring = 1; ring <= 4; ring++) {
      ctx.strokeStyle = `rgba(0,212,255,${0.03 + ring * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r * (ring / 4);
        const y = cy + Math.sin(a) * r * (ring / 4);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Axes lines
    axes.forEach((_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.strokeStyle = "rgba(0,212,255,0.06)";
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke();
    });

    // Data
    dataSets.forEach((ds) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const a = (idx / n) * Math.PI * 2 - Math.PI / 2;
        const v = (ds.values[idx] || 0) / (axes[idx]?.max || 1);
        const x = cx + Math.cos(a) * r * Math.min(v, 1);
        const y = cy + Math.sin(a) * r * Math.min(v, 1);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `${ds.color}15`;
      ctx.fill();
      ctx.strokeStyle = ds.color;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Labels
    ctx.fillStyle = "#64748b";
    ctx.font = "7px monospace";
    ctx.textAlign = "center";
    axes.forEach((ax, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.fillText(ax.label, cx + Math.cos(a) * (r + 14), cy + Math.sin(a) * (r + 14) + 2.5);
    });
  }, [axes, dataSets, size]);
  return <canvas ref={ref} className="block" style={{ width: size, height: size }} />;
}

/* ─── Canvas Heatmap ─── */
function AlertHeatmap({ height = 140 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cells = useMemo(() => {
    const rng = seeded(77);
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const hours = Array.from({length: 12}, (_, i) => `${(i*2).toString().padStart(2,"0")}h`);
    const grid: { v: number; color: string }[][] = [];
    days.forEach(() => {
      const row: { v: number; color: string }[] = [];
      hours.forEach(() => {
        const v = Math.round(rng() * 8);
        const c = v === 0 ? "rgba(0,212,255,0.02)" : `rgba(239,68,68,${0.05 + v * 0.1})`;
        row.push({ v, color: c });
      });
      grid.push(row);
    });
    return { grid, days, hours };
  }, []);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = 400, H = height;
    c.width = W * 2; c.height = H * 2; c.style.width = `${W}px`; c.style.height = `${H}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);

    const rows = cells.grid.length, cols = cells.grid[0].length;
    const cw = (W - 50) / cols, ch = (H - 30) / rows;
    cells.grid.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        const x = 50 + ci * cw, y = 20 + ri * ch;
        ctx.fillStyle = cell.color;
        ctx.fillRect(x, y, cw - 1, ch - 1);
        if (cell.v > 0) {
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.font = "6px monospace";
          ctx.textAlign = "center";
          ctx.fillText(String(cell.v), x + cw / 2, y + ch / 2 + 2);
        }
      });
    });
    ctx.fillStyle = "#475569"; ctx.font = "6px monospace"; ctx.textAlign = "right";
    cells.days.forEach((d, i) => ctx.fillText(d, 46, 20 + i * ch + ch / 2 + 2));
    ctx.textAlign = "center";
    cells.hours.forEach((h, i) => ctx.fillText(h, 50 + i * cw + cw / 2, H - 4));
    ctx.fillStyle = "#475569"; ctx.font = "7px monospace"; ctx.textAlign = "left";
    ctx.fillText("ALERT FREQUENCY HEATMAP", 6, 10);
  }, [cells, height]);
  return <canvas ref={ref} className="w-full block rounded-lg" style={{ aspectRatio: `${400}/${height}` }} />;
}

/* ─── Canvas Scatter Plot ─── */
function ScatterPlot({ height = 160 }: { height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = 400, H = height;
    c.width = W * 2; c.height = H * 2; c.style.width = `${W}px`; c.style.height = `${H}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0a0a0f"; ctx.fillRect(0, 0, W, H);
    // Grid
    ctx.strokeStyle = "rgba(0,212,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let i = 0; i < H; i += 30) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

    const rng = seeded(123);
    robots.forEach((r, ri) => {
      for (let i = 0; i < 6; i++) {
        const x = 30 + rng() * (W - 60);
        const y = 20 + rng() * (H - 40);
        ctx.fillStyle = `${r.color}${ri === 0 ? "80" : "50"}`;
        ctx.beginPath();
        ctx.arc(x, y, 2 + rng() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.fillStyle = "#475569"; ctx.font = "7px monospace"; ctx.textAlign = "left";
    ctx.fillText("SENSOR CORRELATION — Temp vs Vibration", 6, 10);
    ctx.textAlign = "right";
    ctx.fillText("Vibration →", W - 4, H - 4);
    ctx.save(); ctx.translate(6, H / 2); ctx.rotate(-Math.PI / 2); ctx.fillText("Temperature →", 0, 0); ctx.restore();
  }, [height]);
  return <canvas ref={ref} className="w-full block rounded-lg" style={{ aspectRatio: `${400}/${height}` }} />;
}

/* ─── Advanced Report Generator ─── */
function AdvancedReportGenerator() {
  const [tab, setTab] = useState("summary");
  const [format, setFormat] = useState("pdf");
  const [phase, setPhase] = useState<"idle" | "collecting" | "processing" | "rendering" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<{ name: string; format: string; date: string }[]>([]);
  const intervalRef = useRef<number>(0);

  const runExport = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("collecting");
    setProgress(0);
    const stages: ("collecting" | "processing" | "rendering")[] = ["collecting", "processing", "rendering"];
    let stageIdx = 0;
    let step = 0;
    intervalRef.current = window.setInterval(() => {
      step++;
      setProgress(Math.min((step / 30) * 100, 100));
      if (step >= 30) {
        clearInterval(intervalRef.current);
        if (stageIdx < stages.length - 1) {
          stageIdx++;
          setPhase(stages[stageIdx]);
          step = 0;
          setProgress(0);
        } else {
          setPhase("done");
          setProgress(100);
          const fmtMap: Record<string, string> = { pdf: "PDF", csv: "CSV", json: "JSON", html: "HTML" };
          setHistory((h) => [{ name: `phoenix_analysis_${tab}`, format: fmtMap[format] || "PDF", date: new Date().toLocaleTimeString() }, ...h].slice(0, 5));
          setTimeout(() => { setPhase("idle"); setProgress(0); }, 3000);
        }
      }
    }, 80);
  }, [phase, tab, format]);

  const stages = [
    { id: "collecting", label: "Collecting data from all robots", icon: "📡" },
    { id: "processing", label: "Processing AI model outputs", icon: "🧠" },
    { id: "rendering", label: "Rendering report document", icon: "📄" },
  ] as const;

  const formats = [
    { id: "pdf", label: "PDF Document", desc: "Formatted report with charts" },
    { id: "csv", label: "CSV Spreadsheet", desc: "Raw data tables for Excel" },
    { id: "json", label: "JSON Export", desc: "Machine-readable data" },
    { id: "html", label: "HTML Report", desc: "Interactive web report" },
  ];

  return (
    <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#00d4ff", boxShadow: "0 0 8px rgba(0,212,255,0.6)" }}
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <span className="text-sm text-white font-bold font-mono">ADVANCED REPORT ENGINE</span>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 mb-4">
        {[
          { id: "summary", label: "Mission Summary", color: "#00d4ff" },
          { id: "ai", label: "AI Performance", color: "#7c3aed" },
          { id: "sensors", label: "Sensor Logs", color: "#f97316" },
          { id: "alerts", label: "Alert Timeline", color: "#ef4444" },
          { id: "survivors", label: "Survivor Report", color: "#10b981" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold transition-all border ${
              tab === t.id ? "text-white" : "text-[#475569] border-transparent"
            }`}
            style={{
              backgroundColor: tab === t.id ? `${t.color}15` : "transparent",
              borderColor: tab === t.id ? `${t.color}30` : "transparent",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Preview Panel */}
      <div className="rounded-lg border border-[#1a1a2e] bg-[#0a0a0f] p-3 mb-4 min-h-[100px]">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            {tab === "summary" && (
              <>
                <p className="text-[10px] text-white font-mono font-bold">Phoenix Mission Analysis Report</p>
                <p className="text-[8px] text-[#64748b] font-mono">Date: {new Date().toLocaleDateString()} · Period: Last 24 hours</p>
                {robots.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 py-0.5">
                    <span className="text-[8px] font-bold font-mono" style={{ color: r.color }}>{r.codename}</span>
                    <span className="text-[8px] text-[#64748b] font-mono">Sector {r.sectorLabel.slice(-3)} · {r.survivorsFound} survivors · BAT {r.battery}%</span>
                  </div>
                ))}
              </>
            )}
            {tab === "ai" && robots[0].aiOutputs.map((ai) => (
              <div key={ai.model} className="flex items-center gap-2 py-0.5">
                <span className="text-[8px] text-[#94a3b8] font-mono w-16">{ai.model}</span>
                <div className="flex-1 h-1.5 rounded-full bg-[#1a1a2e] overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${ai.confidence * 100}%` }} />
                </div>
                <span className="text-[8px] text-white font-mono w-8 text-right">{(ai.confidence * 100).toFixed(0)}%</span>
              </div>
            ))}
            {tab === "sensors" && robots[0].sensors.slice(0, 5).map((s) => (
              <div key={s.name} className="flex items-center gap-2 py-0.5">
                <span className="text-[8px] text-[#94a3b8] font-mono w-20">{s.name}</span>
                <span className="text-[8px] text-white font-mono">{s.value.toFixed(1)} {s.unit}</span>
                <span className="text-[7px] text-[#475569] font-mono">(range: {s.min}-{s.max} {s.unit})</span>
              </div>
            ))}
            {tab === "alerts" && robots.flatMap((r) => r.alerts).slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center gap-2 py-0.5">
                <span className={`text-[7px] font-mono px-1 py-0.5 rounded ${
                  a.type === "critical" ? "bg-red-500/20 text-red-400" :
                  a.type === "warning" ? "bg-orange-500/20 text-orange-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>{a.type.toUpperCase()}</span>
                <span className="text-[8px] text-[#94a3b8] font-mono truncate">{a.message}</span>
                <span className="text-[7px] text-[#475569] font-mono ml-auto">{a.timestamp}</span>
              </div>
            ))}
            {tab === "survivors" && (
              <>
                <p className="text-[10px] text-white font-mono font-bold">Survivor Detection Summary</p>
                <p className="text-[8px] text-[#64748b] font-mono">Total: {robots.reduce((s, r) => s + r.survivorsFound, 0)} across {robots.length} robots</p>
                {robots.map((r) => (
                  <div key={r.id} className="flex items-center gap-2 py-0.5">
                    <span className="text-[8px] font-bold font-mono" style={{ color: r.color }}>{r.codename}</span>
                    <span className="text-[8px] text-emerald-400 font-mono">{r.survivorsFound} rescued</span>
                    <span className="text-[8px] text-[#64748b] font-mono">· Sector {r.sectorLabel.slice(-3)}</span>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Format Selector */}
      <div className="flex gap-2 mb-4">
        {formats.map((f) => (
          <button key={f.id} onClick={() => setFormat(f.id)}
            className={`flex-1 p-2 rounded-lg border text-center transition-all ${
              format === f.id ? "bg-[#00d4ff]/10 border-[#00d4ff]/40" : "bg-[#0a0a0f]/60 border-[#1a1a2e]"
            }`}
          >
            <p className="text-[10px] font-bold font-mono" style={{ color: format === f.id ? "#00d4ff" : "#64748b" }}>{f.label}</p>
            <p className="text-[7px] text-[#475569] font-mono mt-0.5">{f.desc}</p>
          </button>
        ))}
      </div>

      {/* Progress & Generate */}
      <div className="flex items-center gap-3">
        <motion.button
          onClick={runExport}
          disabled={phase !== "idle"}
          whileTap={phase === "idle" ? { scale: 0.97 } : {}}
          className="flex-1 py-2.5 rounded-lg text-xs font-mono font-bold transition-all border relative overflow-hidden"
          style={{
            backgroundColor: phase === "done" ? "rgba(16,185,129,0.15)" : phase !== "idle" ? "rgba(0,212,255,0.08)" : "rgba(0,212,255,0.12)",
            borderColor: phase === "done" ? "rgba(16,185,129,0.3)" : "rgba(0,212,255,0.25)",
            color: phase === "done" ? "#10b981" : "#00d4ff",
          }}
        >
          {phase === "idle" && "▶ Generate Report"}
          {phase === "done" && "✓ Exported Successfully"}
          {(phase === "collecting" || phase === "processing" || phase === "rendering") && (
            <span className="flex items-center justify-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">⟳</motion.span>
              {stages.find((s) => s.id === phase)?.icon} {stages.find((s) => s.id === phase)?.label}
            </span>
          )}
        </motion.button>
      </div>
      {(phase === "collecting" || phase === "processing" || phase === "rendering") && (
        <div className="h-1.5 rounded-full bg-[#1a1a2e] overflow-hidden mt-3">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
            initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
        </div>
      )}

      {/* Export History */}
      {history.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#1a1a2e]">
          <p className="text-[8px] text-[#475569] font-mono mb-2">RECENT EXPORTS</p>
          <div className="space-y-1">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1 rounded bg-[#0a0a0f]/60">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#94a3b8] font-mono">{h.name}</span>
                  <span className="text-[7px] text-[#475569] font-mono px-1 py-0.5 rounded bg-[#1a1a2e]">{h.format}</span>
                </div>
                <span className="text-[7px] text-[#475569] font-mono">{h.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Analyst Dashboard ─── */
export default function AnalystDashboard({ session }: { session: Session }) {
  const [time, setTime] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const u = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    u(); const t = setInterval(u, 1000); return () => clearInterval(t);
  }, []);

  const globalStats = useMemo(() => ({
    alerts: robots.reduce((s, r) => s + r.alerts.length, 0),
    survivors: robots.reduce((s, r) => s + r.survivorsFound, 0),
    avgBat: Math.round(robots.reduce((s, r) => s + r.battery, 0) / robots.length),
    avgSig: Math.round(robots.reduce((s, r) => s + r.signal, 0) / robots.length),
    totalMissions: robots.length,
    threatAvg: robots.filter((r) => r.threatLevel === "critical" || r.threatLevel === "high").length,
  }), []);

  const survivorMethods = [
    { label: "Thermal", value: 42, color: "#ef4444" },
    { label: "Acoustic", value: 28, color: "#f97316" },
    { label: "Visual", value: 18, color: "#3b82f6" },
    { label: "Structural", value: 12, color: "#10b981" },
  ];
  const alertSeverities = [
    { label: "Critical", value: 8, color: "#ef4444" },
    { label: "Warning", value: 15, color: "#f97316" },
    { label: "Info", value: 22, color: "#3b82f6" },
    { label: "Resolved", value: 12, color: "#10b981" },
  ];

  const radarAxes = [
    { label: "Detection", max: 100 },
    { label: "Mobility", max: 100 },
    { label: "Durability", max: 100 },
    { label: "Comms", max: 100 },
    { label: "Battery", max: 100 },
    { label: "Sensors", max: 100 },
  ];
  const radarSets = robots.map((r) => {
    const rng = seeded(r.id.charCodeAt(4) * 100);
    return {
      label: r.codename,
      values: [75 + rng() * 20, 65 + rng() * 25, 70 + rng() * 20, r.signal, r.battery, 80 + rng() * 15],
      color: r.color,
    };
  });

  const sections = [
    { id: "fleet", label: "FLEET COMPARISON", icon: "🤖" },
    { id: "ai", label: "AI PERFORMANCE", icon: "🧠" },
    { id: "alerts", label: "ALERT & SURVIVOR ANALYTICS", icon: "📊" },
    { id: "sensors", label: "SENSOR & ENVIRONMENTAL", icon: "🌡️" },
  ];

  return (
    <section className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-6">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between mb-6">
          <SectionHeader title="PHOENIX ANALYTICS CENTER" subtitle="Comprehensive multi-robot data analysis, AI performance monitoring, and mission intelligence reporting"
            badge="Analyst Terminal" />
          <div className="flex items-center gap-3">
            <div className="bg-[#111118]/80 border border-[#2a2a3e] rounded-lg px-3 py-2">
              <p className="text-[10px] text-[#7c3aed] font-mono uppercase font-bold">{session.role}</p>
              <p className="text-xs text-[#00d4ff] font-mono">{session.username.toUpperCase()}</p>
            </div>
            <div className="text-white font-mono text-xs tabular-nums">{time}</div>
          </div>
        </div>

        {/* ─── Global Stats ─── */}
        <div className="grid grid-cols-6 gap-3 mb-6">
          {[
            { label: "ACTIVE MISSIONS", value: globalStats.totalMissions, color: "#00d4ff" },
            { label: "SURVIVORS FOUND", value: globalStats.survivors, color: "#10b981" },
            { label: "TOTAL ALERTS", value: globalStats.alerts, color: "#f97316" },
            { label: "HIGH THREAT", value: globalStats.threatAvg, color: "#ef4444" },
            { label: "AVG BATTERY", value: `${globalStats.avgBat}%`, color: "#00d4ff" },
            { label: "AVG SIGNAL", value: `${globalStats.avgSig}%`, color: "#7c3aed" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-3 text-center">
              <motion.p className="text-xl font-bold font-mono" style={{ color: s.color }}
                animate={{ textShadow: [`0 0 4px ${s.color}30`, `0 0 10px ${s.color}50`, `0 0 4px ${s.color}30`] }}
                transition={{ duration: 2.5, repeat: Infinity }}>{s.value}</motion.p>
              <p className="text-[8px] text-[#64748b] font-mono mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ─── Section Navigation ─── */}
        <div className="flex gap-2 mb-6">
          {sections.map((sec) => (
            <button key={sec.id} onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
              className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                expandedSection === sec.id ? "bg-[#7c3aed]/15 border-[#7c3aed]/40 text-white" : "bg-[#111118]/60 border-[#2a2a3e] text-[#64748b] hover:text-white"
              }`}
            >
              {sec.icon} {sec.label}
            </button>
          ))}
        </div>

        {/* ─── Collapsible Sections ─── */}

        {/* Row: Fleet Bar + Radar */}
        <AnimatePresence>
          {(expandedSection === null || expandedSection === "fleet") && (
            <motion.div key="fleet" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 overflow-hidden">
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px rgba(0,212,255,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">FLEET PERFORMANCE COMPARISON</span>
                </div>
                <BarChart data={robots.map((r) => r.survivorsFound)} labels={robots.map((r) => r.codename)} colors={robots.map((r) => r.color)} title="Survivors Rescued per Robot" height={160} />
              </div>
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3 self-start">
                  <div className="w-2 h-2 rounded-full bg-purple-400" style={{ boxShadow: "0 0 6px rgba(124,58,237,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">CAPABILITY RADAR</span>
                </div>
                <RadarChart axes={radarAxes} dataSets={radarSets} size={200} />
                <div className="flex gap-4 mt-2">
                  {radarSets.map((ds) => (
                    <div key={ds.label} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ds.color }} />
                      <span className="text-[8px] text-[#64748b] font-mono">{ds.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row: AI Confidence + Doughnuts */}
        <AnimatePresence>
          {(expandedSection === null || expandedSection === "ai") && (
            <motion.div key="ai" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 overflow-hidden">
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7c3aed", boxShadow: "0 0 6px rgba(124,58,237,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">AI CONFIDENCE TREND</span>
                </div>
                <BarChart data={robots[0].aiOutputs.map((a) => Math.round(a.confidence * 100))} labels={robots[0].aiOutputs.map((a) => a.model)} colors={["#7c3aed", "#f97316", "#ef4444", "#10b981", "#00d4ff"]} title="Current confidence per model" unit="%" height={160} />
              </div>
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">DETECTION METHOD BREAKDOWN</span>
                </div>
                <div className="flex items-center gap-4">
                  <DoughnutChart segments={survivorMethods} size={120} />
                  <div className="space-y-1.5 flex-1">
                    {survivorMethods.map((m) => (
                      <div key={m.label} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                        <span className="text-[8px] text-[#94a3b8] font-mono w-14">{m.label}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-[#1a1a2e] overflow-hidden">
                          <div className="h-full rounded-full" style={{ backgroundColor: m.color, width: `${m.value}%` }} />
                        </div>
                        <span className="text-[8px] text-white font-mono w-8 text-right">{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ef4444", boxShadow: "0 0 6px rgba(239,68,68,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">ALERT SEVERITY DISTRIBUTION</span>
            </div>
            <div className="flex items-center gap-4">
              <DoughnutChart segments={alertSeverities} size={120} />
              <div className="space-y-1.5 flex-1">
                {alertSeverities.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[8px] text-[#94a3b8] font-mono w-14">{s.label}</span>
                    <span className="text-[8px] font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row: Heatmap + Scatter (Alert & Survivor Analytics) */}
        <AnimatePresence>
          {(expandedSection === null || expandedSection === "alerts") && (
            <motion.div key="alerts" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 overflow-hidden">
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <AlertHeatmap height={150} />
              </div>
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <ScatterPlot height={150} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row: Mission Efficiency + Fleet Health (Sensor & Environmental) */}
        <AnimatePresence>
          {(expandedSection === null || expandedSection === "sensors") && (
            <motion.div key="sensors" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 overflow-hidden">
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00d4ff", boxShadow: "0 0 6px rgba(0,212,255,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">MISSION TIMELINE ANALYSIS</span>
                </div>
                <div className="space-y-3">
                  {robots.map((r, ri) => {
                    const rng = seeded(ri * 100);
                    const deploy = 5 + rng() * 10;
                    const search = 10 + rng() * 20;
                    const detect = 3 + rng() * 8;
                    const rescue = 8 + rng() * 12;
                    const total = deploy + search + detect + rescue;
                    return (
                      <div key={r.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold font-mono" style={{ color: r.color }}>{r.codename}</span>
                          <span className="text-[8px] text-[#64748b] font-mono">{total.toFixed(0)} min total</span>
                        </div>
                        <div className="flex h-2.5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(deploy / total) * 100}%` }} className="bg-cyan-500" />
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(search / total) * 100}%` }} className="bg-orange-500" />
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(detect / total) * 100}%` }} className="bg-purple-500" />
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(rescue / total) * 100}%` }} className="bg-emerald-500" />
                        </div>
                        <div className="flex gap-3 text-[7px] text-[#475569] font-mono mt-0.5">
                          <span>🔄 Deploy {deploy.toFixed(0)}m</span>
                          <span>🔍 Search {search.toFixed(0)}m</span>
                          <span>🧠 Detect {detect.toFixed(0)}m</span>
                          <span>🚁 Rescue {rescue.toFixed(0)}m</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }} />
                  <span className="text-xs text-white font-bold font-mono">FLEET HEALTH & STATUS</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {robots.map((r) => (
                    <div key={r.id} className="rounded-lg border border-[#1a1a2e] bg-[#0a0a0f]/60 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold font-mono" style={{ color: r.color }}>{r.codename}</span>
                        <span className={`text-[7px] font-mono px-1.5 py-0.5 rounded-full ${
                          r.status === "engaged" ? "bg-green-500/20 text-green-400" :
                          r.status === "deployed" ? "bg-blue-500/20 text-blue-400" :
                          r.status === "error" ? "bg-red-500/20 text-red-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>{r.status.toUpperCase()}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                          { label: "BAT", value: r.battery, c: r.battery > 50 ? "#10b981" : r.battery > 25 ? "#f97316" : "#ef4444" },
                          { label: "SIG", value: r.signal, c: r.signal > 50 ? "#10b981" : r.signal > 25 ? "#f97316" : "#ef4444" },
                          { label: "SUR", value: r.survivorsFound, c: "#00d4ff" },
                        ].map((m) => (
                          <div key={m.label}>
                            <p className="text-[7px] text-[#475569] font-mono">{m.label}</p>
                            <div className="flex items-center gap-1 justify-center">
                              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: m.c }} />
                              <p className="text-[10px] font-bold font-mono" style={{ color: m.c }}>{m.value}{m.label === "SUR" ? "" : "%"}</p>
                            </div>
                            <div className="h-1 rounded-full bg-[#1a1a2e] overflow-hidden mt-0.5">
                              <div className="h-full rounded-full" style={{ backgroundColor: m.c, width: `${m.label === "SUR" ? (m.value / 12) * 100 : m.value}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Advanced Report Engine ─── */}
        <div className="mb-6">
          <AdvancedReportGenerator />
        </div>
      </div>
    </section>
  );
}
