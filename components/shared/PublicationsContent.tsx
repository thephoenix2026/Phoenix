"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import { publications } from "@/lib/data/stats";

const statusColors = {
  "submitted": { bg: "bg-[#10b981]/20", text: "text-[#10b981]", border: "border-[#10b981]" },
  "in-preparation": { bg: "bg-[#f97316]/20", text: "text-[#f97316]", border: "border-[#f97316]" },
  "under-review": { bg: "bg-[#7c3aed]/20", text: "text-[#7c3aed]", border: "border-[#7c3aed]" }
};

const conferencePresentations = [
  {
    title: "Multi-Modal AI for Intelligent Disaster Rescue",
    conference: "IEEE International Conference on Emergency Response Technologies",
    date: "2025",
    type: "poster"
  },
  {
    title: "Thermal Survivor Detection with Attention Mechanisms",
    conference: "IEEE CVPR Workshops",
    date: "2025",
    type: "presentation"
  }
];

const researchPosters = [
  {
    title: "Phoenix System Architecture Overview",
    description: "Visual overview of the complete Phoenix platform architecture and component integration"
  },
  {
    title: "Multi-Modal Sensor Fusion Pipeline",
    description: "Detailed visualization of the adaptive sensor fusion algorithm and data flow"
  },
  {
    title: "AI Model Performance Benchmarks",
    description: "Comparative analysis of all AI models against state-of-the-art baselines"
  }
];

export default function PublicationsContent() {
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
              Publications
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Research contributions and academic publications
          </motion.p>
        </div>
      </section>

      {/* Papers Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Research Papers"
            subtitle="Peer-reviewed publications and submissions"
          />
          <div className="mt-12 space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                        {pub.title}
                      </h3>
                      <p className="text-gray-300 mb-2">{pub.authors}</p>
                      <p className="text-[#00d4ff] font-medium">{pub.conference}</p>
                      <p className="text-gray-400 text-sm mt-1">{pub.year}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[pub.status as keyof typeof statusColors].bg} ${statusColors[pub.status as keyof typeof statusColors].text} ${statusColors[pub.status as keyof typeof statusColors].border}`}>
                        {pub.status.replace("-", " ").toUpperCase()}
                      </span>
                      <button className="text-[#00d4ff] hover:text-[#00a0cc] text-sm font-medium transition-colors">
                        View Paper →
                      </button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Presentations */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Conference Presentations"
            subtitle="Talks and presentations at academic conferences"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {conferencePresentations.map((pres, index) => (
              <motion.div
                key={pres.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-6 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {pres.title}
                      </h3>
                      <p className="text-[#00d4ff] text-sm">{pres.conference}</p>
                      <p className="text-gray-400 text-sm mt-1">{pres.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pres.type === "presentation" 
                        ? "bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]" 
                        : "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]"
                    }`}>
                      {pres.type.toUpperCase()}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Posters */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Research Posters"
            subtitle="Visual presentations of our research"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchPosters.map((poster, index) => (
              <motion.div
                key={poster.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-6 h-full">
                  <div className="aspect-[3/4] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-lg mb-4 flex items-center justify-center border border-[#2a2a3e]">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center">
                        <span className="text-3xl">📊</span>
                      </div>
                      <p className="text-gray-400 text-sm">Poster Preview</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{poster.title}</h3>
                  <p className="text-gray-300 text-sm">{poster.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation Format */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Citation Format"
            subtitle="How to cite our work"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <GlowCard className="p-8">
              <div className="font-mono text-sm text-gray-300 bg-[#0a0a0f] p-6 rounded-lg border border-[#2a2a3e]">
                <p className="mb-2">A. Al-Rashid, F. Hassan, O. Khalil, L. Mahmoud, Y. Ibrahim, N. Saeed.</p>
                <p className="mb-2">&quot;NABD360: An AI-Powered Multi-Modal Platform for Intelligent Disaster Rescue Operations.&quot;</p>
                <p className="text-[#00d4ff]">IEEE International Conference on Emergency Response Technologies, 2025.</p>
              </div>
              <div className="mt-4 flex gap-4">
                <button className="px-4 py-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg hover:bg-[#00d4ff]/20 transition-colors text-sm font-medium">
                  Copy BibTeX
                </button>
                <button className="px-4 py-2 bg-[#7c3aed]/10 text-[#7c3aed] rounded-lg hover:bg-[#7c3aed]/20 transition-colors text-sm font-medium">
                  Export Citation
                </button>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}