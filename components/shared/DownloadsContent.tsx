"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const downloads = [
  {
    title: "Project Report",
    description: "Complete graduation project report covering system design, implementation, and results.",
    fileName: "project-report.pdf",
    fileSize: "12.5 MB",
    format: "PDF",
    color: "#00d4ff",
    icon: "📄",
  },
  {
    title: "Technical Documentation",
    description: "System architecture, API documentation, and deployment guide.",
    fileName: "technical-docs.pdf",
    fileSize: "8.2 MB",
    format: "PDF",
    color: "#7c3aed",
    icon: "📚",
  },
  {
    title: "Research Paper",
    description: "Published conference paper on multi-modal AI for disaster response.",
    fileName: "research-paper.pdf",
    fileSize: "2.1 MB",
    format: "PDF",
    color: "#10b981",
    icon: "📝",
  },
  {
    title: "Conference Poster",
    description: "A0 format research poster for academic conferences.",
    fileName: "poster.pdf",
    fileSize: "15.8 MB",
    format: "PDF",
    color: "#f97316",
    icon: "📊",
  },
  {
    title: "Presentation Slides",
    description: "Final defense presentation (16:9 format).",
    fileName: "presentation.pptx",
    fileSize: "45.3 MB",
    format: "PPTX",
    color: "#ec4899",
    icon: "🎬",
  },
  {
    title: "AI Model Weights",
    description: "Pre-trained model checkpoints for all AI components.",
    fileName: "model-weights.zip",
    fileSize: "230 MB",
    format: "ZIP",
    color: "#06b6d4",
    icon: "🧠",
  },
];

export default function DownloadsContent() {
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
              Downloads
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Access project documentation, research papers, and resources
          </motion.p>
        </div>
      </section>

      {/* Documentation Downloads */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Documentation"
            subtitle="Comprehensive project documentation and research materials"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="p-6 h-full flex flex-col" glowColor={item.color}>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-md text-xs font-bold"
                      style={{
                        backgroundColor: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                      }}
                    >
                      {item.format}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{item.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#2a2a3e]">
                    <span className="text-gray-500 text-sm">{item.fileSize}</span>
                    <a
                      href="#"
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                        border: `1px solid ${item.color}30`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${item.color}30`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${item.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${item.color}15`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Download ↓
                    </a>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source Code */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Source Code"
            subtitle="Open-source repository on GitHub"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center">
                      <span className="text-xl">💻</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Phoenix Repository</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">github.com/phoenix-rescue/phoenix</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs border border-[#10b981]/30">
                      ★ 1.2k Stars
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] text-xs border border-[#7c3aed]/30">
                      Python
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#00d4ff]/10 text-[#00d4ff] text-xs border border-[#00d4ff]/30">
                      Dart
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#f97316]/10 text-[#f97316] text-xs border border-[#f97316]/30">
                      C++
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#ec4899]/10 text-[#ec4899] text-xs border border-[#ec4899]/30">
                      MIT License
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20 transition-all duration-300 font-medium whitespace-nowrap"
                >
                  View on GitHub →
                </a>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
