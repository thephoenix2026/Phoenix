"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const galleryImages = [
  { title: "Robot Front View", category: "Hardware", gradient: "from-[#00d4ff]/30 to-[#0066cc]/30" },
  { title: "Robot Side View", category: "Hardware", gradient: "from-[#00a0cc]/30 to-[#004d99]/30" },
  { title: "Thermal Camera Output", category: "AI", gradient: "from-[#ff6b35]/30 to-[#cc3300]/30" },
  { title: "Sensor Array Closeup", category: "Hardware", gradient: "from-[#7c3aed]/30 to-[#5b21b6]/30" },
  { title: "Mobile App Screenshot", category: "Software", gradient: "from-[#10b981]/30 to-[#059669]/30" },
  { title: "Dashboard Screenshot", category: "Software", gradient: "from-[#06b6d4]/30 to-[#0891b2]/30" },
  { title: "AI Detection Demo", category: "AI", gradient: "from-[#f97316]/30 to-[#ea580c]/30" },
  { title: "Team Working in Lab", category: "Team", gradient: "from-[#8b5cf6]/30 to-[#7c3aed]/30" },
  { title: "Testing Session", category: "Testing", gradient: "from-[#ec4899]/30 to-[#db2777]/30" },
  { title: "CAD Model Render", category: "Hardware", gradient: "from-[#14b8a6]/30 to-[#0d9488]/30" },
  { title: "PCB Design", category: "Hardware", gradient: "from-[#6366f1]/30 to-[#4f46e5]/30" },
  { title: "Final Prototype", category: "Hardware", gradient: "from-[#f59e0b]/30 to-[#d97706]/30" },
];

const categoryColors: Record<string, string> = {
  Hardware: "bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30",
  Software: "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30",
  AI: "bg-[#f97316]/20 text-[#f97316] border-[#f97316]/30",
  Team: "bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30",
  Testing: "bg-[#ec4899]/20 text-[#ec4899] border-[#ec4899]/30",
};

const videos = [
  { title: "Phoenix Demo Video", description: "Full system demonstration", duration: "12:45" },
  { title: "AI Detection Showcase", description: "Thermal and acoustic detection in action", duration: "8:30" },
  { title: "Project Presentation", description: "Graduation defense presentation", duration: "25:00" },
];

const demos = [
  { title: "Live Thermal Detection", description: "Real-time thermal survivor detection", gradient: "from-[#ff6b35] to-[#cc3300]" },
  { title: "Acoustic Analysis", description: "Sound-based survivor detection", gradient: "from-[#00d4ff] to-[#0066cc]" },
  { title: "Hazard Assessment", description: "Environmental risk evaluation", gradient: "from-[#f97316] to-[#ea580c]" },
  { title: "Rescue Guidance", description: "AI assistant in action", gradient: "from-[#10b981] to-[#059669]" },
];

export function GalleryContent() {
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
              Media Gallery
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Images, videos, and demonstrations of the Phoenix system
          </motion.p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Image Gallery" subtitle="Visual documentation of the Phoenix platform" />
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <div className="relative group rounded-xl overflow-hidden border border-[#2a2a3e] hover:border-[#00d4ff]/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_#00d4ff33]">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${img.gradient} flex items-center justify-center`}>
                    <div className="text-center p-6">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <p className="text-white/40 text-sm">{img.title}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm">{img.title}</h3>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${categoryColors[img.category]}`}>
                      {img.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Videos" subtitle="Demonstrations and presentations" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-0 overflow-hidden h-full">
                  <div className="relative aspect-video bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:border-[#00d4ff]/50 group-hover:bg-[#00d4ff]/20 transition-all duration-300">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 text-white text-xs font-mono">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
                    <p className="text-gray-400 text-sm">{video.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstrations Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Demonstrations" subtitle="Interactive showcases of Phoenix capabilities" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-0 overflow-hidden h-full">
                  <div className={`h-48 bg-gradient-to-br ${demo.gradient} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 text-center">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{demo.description}</p>
                    <button className="text-[#00d4ff] hover:text-[#00a0cc] text-sm font-medium transition-colors">
                      Watch Demo →
                    </button>
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
