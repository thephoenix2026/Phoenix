"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import { futureWorkItems } from "@/lib/data/stats";

const statusColors: Record<string, { bg: string; text: string; border: string; pulse?: boolean }> = {
  planned: { bg: "bg-[#3b82f6]/20", text: "text-[#3b82f6]", border: "border-[#3b82f6]" },
  "in-progress": { bg: "bg-[#00d4ff]/20", text: "text-[#00d4ff]", border: "border-[#00d4ff]", pulse: true },
  research: { bg: "bg-[#7c3aed]/20", text: "text-[#7c3aed]", border: "border-[#7c3aed]" },
};

const timeline = [
  {
    period: "2025 (Near-term)",
    color: "#00d4ff",
    items: ["Edge AI Optimization", "Model quantization and pruning", "TensorRT deployment"],
  },
  {
    period: "2025-2026 (Mid-term)",
    color: "#10b981",
    items: ["Swarm Robotics", "Drone Integration", "Multilingual Rescue Assistant"],
  },
  {
    period: "2026-2027 (Long-term)",
    color: "#7c3aed",
    items: ["Satellite Integration", "Autonomous Navigation", "Full commercial deployment"],
  },
];

export function FutureWorkContent() {
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
              Future Work
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Development roadmap and planned features for Phoenix
          </motion.p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Development Roadmap" subtitle="Key milestones and future milestones" />
          <div className="mt-16 relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/50 via-[#10b981]/50 to-[#7c3aed]/50 hidden md:block" />
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff]/50 via-[#10b981]/50 to-[#7c3aed]/50 md:hidden" />

            <div className="space-y-12">
              {futureWorkItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                const status = statusColors[item.status] || statusColors.planned;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#0a0a0f] z-10 mt-6"
                      style={{ backgroundColor: status.pulse ? "#00d4ff" : item.status === "planned" ? "#3b82f6" : "#7c3aed" }}
                    >
                      {status.pulse && (
                        <div className="absolute inset-0 rounded-full bg-[#00d4ff] animate-ping opacity-40" />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 ml-14 md:ml-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <GlowCard className="p-6" glowColor={item.status === "in-progress" ? "#00d4ff" : item.status === "research" ? "#7c3aed" : "#3b82f6"}>
                        <div className={`flex flex-col gap-3 ${isLeft ? "md:items-end" : ""}`}>
                          <div className={`flex items-center gap-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                            <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                              <span className="text-lg">
                                {item.icon === "Bot" && "🤖"}
                                {item.icon === "Plane" && "✈️"}
                                {item.icon === "Satellite" && "🛰️"}
                                {item.icon === "Cpu" && "⚡"}
                                {item.icon === "Navigation" && "🧭"}
                                {item.icon === "Languages" && "🌐"}
                              </span>
                            </div>
                            <div className={`${isLeft ? "md:text-right" : ""}`}>
                              <h3 className="text-lg font-bold text-white">{item.title}</h3>
                              <span className="text-gray-400 text-xs">{item.timeline}</span>
                            </div>
                          </div>
                          <p className={`text-gray-300 text-sm leading-relaxed ${isLeft ? "md:text-right" : ""}`}>
                            {item.description}
                          </p>
                          <span className={`inline-flex self-start ${isLeft ? "md:self-end" : ""} px-3 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}>
                            {item.status.replace("-", " ").toUpperCase()}
                          </span>
                        </div>
                      </GlowCard>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Roadmap */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Technology Roadmap" subtitle="Strategic development phases" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {timeline.map((phase, index) => (
              <motion.div
                key={phase.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-6 h-full" glowColor={phase.color}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: phase.color }}
                    />
                    <h3 className="text-lg font-bold text-white">{phase.period}</h3>
                  </div>
                  <div className={`h-1 rounded-full mb-6`} style={{ backgroundColor: phase.color, opacity: 0.3 }} />
                  <ul className="space-y-4">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: phase.color }}
                        />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlowCard className="p-10 md:p-16 text-center" glowColor="#00d4ff">
              <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#00a0cc]/20 flex items-center justify-center border border-[#00d4ff]/30">
                <span className="text-3xl">🌍</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision</h2>
              <div className="h-1 w-20 mx-auto bg-gradient-to-r from-[#00d4ff] to-[#00a0cc] rounded-full mb-8" />
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic">
                &quot;By 2027, Phoenix aims to become a globally deployable AI-powered disaster response platform, saving thousands of lives through intelligent automation and real-time decision support.&quot;
              </p>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
