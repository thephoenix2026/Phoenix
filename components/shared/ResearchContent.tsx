"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const novelContributions = [
  {
    title: "Multi-Modal Sensor Fusion",
    description: "First system to combine thermal, acoustic, environmental, and structural data for unified disaster assessment",
    color: "#00d4ff",
    icon: "🔬"
  },
  {
    title: "Attention-Guided Thermal Detection",
    description: "Novel YOLOv26 variant with thermal-specific attention mechanisms achieving 96.8% accuracy",
    color: "#7c3aed",
    icon: "🎯"
  },
  {
    title: "Acoustic Distress Classification",
    description: "CNN-LSTM hybrid with multi-head attention for real-time distress signal detection in noisy environments",
    color: "#10b981",
    icon: "🔊"
  },
  {
    title: "Domain-Specific Rescue LLM",
    description: "Fine-tuned language model with RAG pipeline integrating real-time sensor data with emergency protocols",
    color: "#f97316",
    icon: "🤖"
  }
];

const technicalInnovations = [
  "Real-time multi-model inference pipeline on edge hardware",
  "Adaptive sensor fusion with dynamic weight adjustment",
  "Noise-robust acoustic feature extraction for disaster environments",
  "Structural vibration pattern analysis for collapse prediction",
  "Safety-critical thresholding with graceful degradation"
];

const researchGapsSolved = [
  "No existing system combines all 4 AI modalities",
  "Thermal survivor detection lacks disaster-specific training",
  "Acoustic detection in disaster noise is under-researched",
  "Real-time structural risk assessment is not democratized",
  "No domain-specific LLM exists for rescue operations"
];

const scientificContributions = [
  {
    title: "Published Conference Paper (Submitted)",
    description: "Peer-reviewed research submitted to IEEE International Conference on Emergency Response Technologies"
  },
  {
    title: "Open-Source Dataset Contribution",
    description: "Publicly available multi-modal disaster response dataset for research community"
  },
  {
    title: "Novel Architecture Designs",
    description: "Custom AI architectures optimized for disaster-specific sensor modalities"
  },
  {
    title: "Benchmark Establishment",
    description: "First comprehensive benchmark for multi-modal disaster AI systems"
  }
];

export default function ResearchContent() {
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
              Research & Innovation
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Pioneering AI-driven solutions for intelligent disaster response
          </motion.p>
        </div>
      </section>

      {/* Novel Contributions */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Novel Contributions"
            subtitle="Breakthrough innovations in disaster response AI"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {novelContributions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-8 h-full" glowColor={item.color}>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Innovations */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Technical Innovations"
            subtitle="Key technological breakthroughs achieved"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalInnovations.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="p-6 h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#00d4ff]" />
                    <p className="text-gray-300">{item}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Gaps Solved */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Research Gaps Solved"
            subtitle="Critical gaps addressed by our work"
          />
          <div className="mt-12 space-y-4">
            {researchGapsSolved.map((gap, index) => (
              <motion.div
                key={gap}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-[#111118]/50 border border-[#2a2a3e]"
              >
                <div className="w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#10b981] text-lg">✓</span>
                </div>
                <p className="text-gray-300">{gap}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Contributions */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Scientific Contributions"
            subtitle="Advancing the field of disaster response AI"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {scientificContributions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-6 h-full">
                  <h3 className="text-lg font-bold text-[#00d4ff] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}