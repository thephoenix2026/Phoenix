"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const radarData = [
  { metric: "Accuracy", thermal: 96.8, acoustic: 94.3, hazard: 97.5, structural: 95.1, assistant: 93.2 },
  { metric: "Precision", thermal: 95.2, acoustic: 93.7, hazard: 96.8, structural: 94.5, assistant: 92.8 },
  { metric: "Recall", thermal: 97.1, acoustic: 95.0, hazard: 98.0, structural: 95.8, assistant: 94.1 },
  { metric: "F1 Score", thermal: 96.1, acoustic: 94.3, hazard: 97.4, structural: 95.1, assistant: 93.4 },
];

const accuracyData = [
  { name: "Thermal", accuracy: 96.8, color: "#ef4444" },
  { name: "Acoustic", accuracy: 94.3, color: "#7c3aed" },
  { name: "Hazard", accuracy: 97.5, color: "#f97316" },
  { name: "Structural", accuracy: 95.1, color: "#eab308" },
  { name: "Assistant", accuracy: 93.2, color: "#00d4ff" },
];

const modelMetrics = [
  { name: "Thermal Detection", accuracy: 96.8, precision: 95.2, recall: 97.1, f1: 96.1, latency: "33ms" },
  { name: "Acoustic Detection", accuracy: 94.3, precision: 93.7, recall: 95.0, f1: 94.3, latency: "120ms" },
  { name: "Hazard Assessment", accuracy: 97.5, precision: 96.8, recall: 98.0, f1: 97.4, latency: "15ms" },
  { name: "Structural Risk", accuracy: 95.1, precision: 94.5, recall: 95.8, f1: 95.1, latency: "50ms" },
  { name: "Rescue Assistant", accuracy: 93.2, precision: 92.8, recall: 94.1, f1: 93.4, latency: "500ms" },
];

const benchmarks = [
  {
    system: "Phoenix",
    accuracy: "96.8%",
    modality: "Multi-Modal",
    mode: "Real-Time",
    highlight: true,
  },
  {
    system: "Traditional Methods",
    accuracy: "70-80%",
    modality: "Single",
    mode: "Manual",
    highlight: false,
  },
  {
    system: "State-of-the-Art Research",
    accuracy: "94-95%",
    modality: "Limited",
    mode: "Lab-Only",
    highlight: false,
  },
];

const latencyBreakdown = [
  { stage: "Sensor Reading", time: 5, color: "#00d4ff" },
  { stage: "Data Preprocessing", time: 8, color: "#7c3aed" },
  { stage: "AI Inference", time: 33, color: "#10b981" },
  { stage: "Post-Processing", time: 4, color: "#f97316" },
];

const totalLatency = latencyBreakdown.reduce((sum, item) => sum + item.time, 0);

const resources = [
  { label: "CPU", value: "Raspberry Pi 4", detail: "45% utilization", icon: "💻" },
  { label: "RAM", value: "2.8 GB / 4 GB", detail: "70%", icon: "🧠" },
  { label: "GPU", value: "N/A", detail: "CPU inference", icon: "⚡" },
  { label: "Storage", value: "4.2 GB", detail: "Model files", icon: "💾" },
  { label: "Power", value: "12W", detail: "Average consumption", icon: "🔌" },
  { label: "Network", value: "2 Mbps", detail: "Average bandwidth", icon: "📡" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111118] border border-[#2a2a3e] rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PerformanceContent() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative flex items-center justify-center py-32 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#00a0cc] bg-clip-text text-transparent">
              Performance Evaluation
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive benchmarks and metrics for all AI models
          </motion.p>
        </div>
      </section>

      {/* Radar Chart - Model Comparison */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Model Comparison"
            subtitle="Multi-dimensional performance analysis"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="#2a2a3e" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#9ca3af", fontSize: 13 }} />
                  <PolarRadiusAxis angle={30} domain={[88, 100]} tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Radar name="Thermal" dataKey="thermal" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Acoustic" dataKey="acoustic" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Hazard" dataKey="hazard" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Structural" dataKey="structural" stroke="#eab308" fill="#eab308" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Assistant" dataKey="assistant" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: "#d1d5db", paddingTop: 16 }} />
                </RadarChart>
              </ResponsiveContainer>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Bar Chart - Accuracy Comparison */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Accuracy Comparison"
            subtitle="Individual model accuracy breakdown"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={accuracyData} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 13 }} stroke="#2a2a3e" />
                  <YAxis domain={[88, 100]} tick={{ fill: "#6b7280", fontSize: 12 }} stroke="#2a2a3e" />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,212,255,0.05)" }} />
                  <Bar dataKey="accuracy" name="Accuracy" radius={[6, 6, 0, 0]}>
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Metrics Table */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Metrics Overview"
            subtitle="Performance comparison across all AI models"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a3e]">
                      <th className="text-left p-4 text-[#00d4ff] font-semibold">Model</th>
                      <th className="text-center p-4 text-[#00d4ff] font-semibold">Accuracy</th>
                      <th className="text-center p-4 text-[#7c3aed] font-semibold">Precision</th>
                      <th className="text-center p-4 text-[#10b981] font-semibold">Recall</th>
                      <th className="text-center p-4 text-[#f97316] font-semibold">F1 Score</th>
                      <th className="text-center p-4 text-[#00d4ff] font-semibold">Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelMetrics.map((model, index) => (
                      <tr
                        key={model.name}
                        className={`border-b border-[#2a2a3e] ${index % 2 === 0 ? "bg-[#111118]/50" : "bg-[#0a0a0f]/50"}`}
                      >
                        <td className="p-4 text-white font-medium">{model.name}</td>
                        <td className="p-4 text-center text-[#00d4ff]">{model.accuracy}%</td>
                        <td className="p-4 text-center text-[#7c3aed]">{model.precision}%</td>
                        <td className="p-4 text-center text-[#10b981]">{model.recall}%</td>
                        <td className="p-4 text-center text-[#f97316]">{model.f1}%</td>
                        <td className="p-4 text-center text-gray-300">{model.latency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Benchmark Comparisons */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Benchmark Comparisons"
            subtitle="How Phoenix compares to existing solutions"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {benchmarks.map((benchmark, index) => (
              <motion.div
                key={benchmark.system}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard
                  className={`p-8 h-full ${benchmark.highlight ? "border-2 border-[#00d4ff]" : ""}`}
                  glowColor={benchmark.highlight ? "#00d4ff" : "#2a2a3e"}
                >
                  <h3 className={`text-xl font-bold mb-4 ${benchmark.highlight ? "text-[#00d4ff]" : "text-white"}`}>
                    {benchmark.system}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Accuracy</p>
                      <p className={`text-2xl font-bold ${benchmark.highlight ? "text-[#00d4ff]" : "text-white"}`}>
                        {benchmark.accuracy}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Modality</p>
                      <p className="text-white">{benchmark.modality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mode</p>
                      <p className="text-white">{benchmark.mode}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latency Breakdown */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Latency Breakdown"
            subtitle="End-to-end pipeline performance"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <div className="space-y-6">
                <div className="relative h-12 bg-[#0a0a0f] rounded-full overflow-hidden flex">
                  {latencyBreakdown.map((stage, index) => (
                    <motion.div
                      key={stage.stage}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(stage.time / totalLatency) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full relative group"
                      style={{ backgroundColor: stage.color }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {stage.time}ms
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {latencyBreakdown.map((stage) => (
                    <div key={stage.stage} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <div>
                        <p className="text-sm text-white">{stage.stage}</p>
                        <p className="text-xs text-gray-400">{stage.time}ms</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#2a2a3e] flex justify-between items-center">
                  <span className="text-gray-400">Total End-to-End Latency</span>
                  <span className="text-2xl font-bold text-[#00d4ff]">{totalLatency}ms</span>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* Resource Consumption */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Resource Consumption"
            subtitle="Hardware requirements and utilization"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{resource.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{resource.label}</h3>
                      <p className="text-[#00d4ff] text-xl font-semibold">{resource.value}</p>
                      <p className="text-gray-400 text-sm">{resource.detail}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
