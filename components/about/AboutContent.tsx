"use client";

import { motion } from "framer-motion";
import { globalDisasterStats } from "@/lib/data/stats";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const whyPhoenix = [
  {
    title: "Multi-Modal AI",
    description:
      "Our system fuses visual, acoustic, thermal, and spatial data to understand disaster scenes in ways no single sensor could achieve alone.",
  },
  {
    title: "Real-Time Processing",
    description:
      "Edge AI pipelines process sensor data in milliseconds, enabling immediate victim detection and rapid decision support for rescue teams.",
  },
  {
    title: "Complete Ecosystem",
    description:
      "              From aerial drones to ground robots to command centers, Phoenix provides an end-to-end platform that orchestrates every stage of rescue.",
  },
  {
    title: "Social Impact",
    description:
      "              Every second saved in disaster response translates to lives preserved. Phoenix aims to cut rescue time by orders of magnitude.",
  },
];

export default function AboutContent() {
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
              About Phoenix
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Intelligent Disaster Rescue — Powered by AI, Drones, and Robotics
          </motion.p>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="The Global Crisis"
            subtitle="Why disaster response must evolve"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 space-y-6 text-gray-300 leading-relaxed text-lg"
          >
            <p>
              Every year, over <span className="text-[#00d4ff] font-semibold">400 natural disasters</span> strike across the globe — earthquakes, hurricanes, floods, and building collapses — claiming hundreds of thousands of lives and displacing millions more.
            </p>
            <p>
              Rescue teams face extremely dangerous conditions: unstable structures, toxic environments, zero visibility, and overwhelming scale. Traditional search-and-rescue methods are slow, manual, and often arrive too late.
            </p>
            <p>
              The gap between disaster occurrence and effective rescue response costs lives every single day. <span className="text-[#00d4ff] font-semibold">Phoenix exists to close that gap.</span>
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalDisasterStats.map((stat, index) => (
              <motion.div
                key={stat.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="p-6 text-center">
                  <div className="text-3xl font-bold text-[#00d4ff] mb-2">
                    {stat.year}
                  </div>
                  <div className="text-sm text-gray-400 mb-1">
                    {stat.events} disasters
                  </div>
                  <div className="text-sm text-gray-400 mb-1">
                    {stat.deaths.toLocaleString()} deaths
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.affected} affected
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.economicLoss} loss
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Phoenix */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Why Phoenix"
            subtitle="A paradigm shift in disaster response"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPhoenix.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlowCard className="p-8 h-full">
                  <h3 className="text-xl font-bold text-[#00d4ff] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Our Vision"
            subtitle="The future of disaster response"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-12 space-y-6 text-gray-300 leading-relaxed text-lg"
          >
            <p>
              We envision a world where no disaster victim is left unseen. By converging <span className="text-[#00d4ff] font-semibold">artificial intelligence</span>, <span className="text-[#00d4ff] font-semibold">autonomous robotics</span>, and <span className="text-[#00d4ff] font-semibold">IoT sensor networks</span>, Phoenix will create a unified, intelligent rescue ecosystem.
            </p>
            <p>
              Our roadmap extends from victim detection to automated medical triage, from drone swarm coordination to predictive disaster modeling. Every component is designed to scale — from local incidents to country-wide emergencies.
            </p>
            <p>
              Phoenix is not just a project. It is a commitment to leveraging technology for its highest purpose: <span className="text-[#00d4ff] font-semibold">saving human lives</span>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
