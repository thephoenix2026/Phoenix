"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "camera", label: "Camera" },
  { id: "alerts", label: "Alerts" },
  { id: "ai", label: "AI" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const features = [
  {
    title: "Live Camera Feeds",
    description:
      "Real-time thermal and RGB video streaming with recording capability",
    icon: "📷",
  },
  {
    title: "AI-Powered Alerts",
    description:
      "Instant notifications for detected survivors, hazards, and structural risks",
    icon: "⚠️",
  },
  {
    title: "Environmental Monitoring",
    description:
      "Real-time sensor data for temperature, humidity, gas levels, and air quality",
    icon: "🌡️",
  },
  {
    title: "Rescue Assistant",
    description:
      "AI chatbot for safety procedures, PPE recommendations, and rescue guidance",
    icon: "🤖",
  },
  {
    title: "Interactive Maps",
    description: "Real-time robot location tracking and safe zone mapping",
    icon: "🗺️",
  },
  {
    title: "Team Coordination",
    description:
      "Multi-user support for rescue team communication and task assignment",
    icon: "👥",
  },
  {
    title: "Offline Mode",
    description: "Critical features available without internet connection",
    icon: "📡",
  },
  {
    title: "Data Export",
    description:
      "Export sensor logs, AI predictions, and mission reports",
    icon: "📊",
  },
];

const journeySteps = [
  { number: 1, label: "Launch App" },
  { number: 2, label: "Connect Robot" },
  { number: 3, label: "View Feeds" },
  { number: 4, label: "Receive Alerts" },
  { number: 5, label: "Guide Rescue" },
];

const techStack = [
  { category: "Framework", value: "Flutter (Dart)" },
  { category: "State", value: "Riverpod" },
  { category: "Networking", value: "WebSocket + REST API" },
  { category: "Local Storage", value: "Hive" },
  { category: "Maps", value: "Google Maps Flutter" },
  { category: "UI", value: "Custom Material Design 3" },
];

function DashboardScreen() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="text-[8px] font-bold text-[#00f0ff] uppercase tracking-wider">
        Robot Status
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-md bg-[#1a1a2e] p-1.5 text-center">
          <div className="text-[7px] text-gray-400">Battery</div>
          <div className="text-[10px] font-bold text-green-400">87%</div>
          <div className="mt-0.5 h-1 rounded-full bg-[#2a2a3e]">
            <div className="h-1 w-[87%] rounded-full bg-green-400" />
          </div>
        </div>
        <div className="rounded-md bg-[#1a1a2e] p-1.5 text-center">
          <div className="text-[7px] text-gray-400">Signal</div>
          <div className="text-[10px] font-bold text-[#00f0ff]">Strong</div>
          <div className="mt-0.5 h-1 rounded-full bg-[#2a2a3e]">
            <div className="h-1 w-[95%] rounded-full bg-[#00f0ff]" />
          </div>
        </div>
      </div>
      <div className="rounded-md bg-[#1a1a2e] p-1.5">
        <div className="text-[7px] text-gray-400">Temperature</div>
        <div className="text-[10px] font-bold text-orange-400">42.3°C</div>
      </div>
      <div className="rounded-md bg-[#1a1a2e] p-1.5">
        <div className="text-[7px] text-gray-400">CO Level</div>
        <div className="text-[10px] font-bold text-yellow-400">12 ppm</div>
      </div>
      <div className="rounded-md bg-[#1a1a2e] p-1.5">
        <div className="text-[7px] text-gray-400">Humidity</div>
        <div className="text-[10px] font-bold text-blue-400">68%</div>
      </div>
    </div>
  );
}

function CameraScreen() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between">
        <div className="text-[8px] font-bold text-[#00f0ff] uppercase tracking-wider">
          Camera Feed
        </div>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[6px] text-red-400">REC</span>
        </div>
      </div>
      <div className="relative flex h-24 items-center justify-center rounded-md bg-[#1a1a2e]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border border-[#00f0ff]/30" />
          <div className="absolute h-8 w-8 rounded-full border border-[#00f0ff]/20" />
          <div className="absolute h-1 w-8 bg-[#00f0ff]/40" />
          <div className="absolute h-8 w-1 rotate-90 bg-[#00f0ff]/40" />
        </div>
        <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[6px] text-[#00f0ff]">
          RGB CAM
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="rounded-md bg-[#1a1a2e] p-1 text-center">
          <div className="text-[6px] text-gray-400">Thermal</div>
          <div className="text-[8px] font-bold text-red-400">ON</div>
        </div>
        <div className="rounded-md bg-[#1a1a2e] p-1 text-center">
          <div className="text-[6px] text-gray-400">Night</div>
          <div className="text-[8px] font-bold text-purple-400">ON</div>
        </div>
        <div className="rounded-md bg-[#1a1a2e] p-1 text-center">
          <div className="text-[6px] text-gray-400">Zoom</div>
          <div className="text-[8px] font-bold text-[#00f0ff]">2x</div>
        </div>
      </div>
    </div>
  );
}

function AlertsScreen() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="text-[8px] font-bold text-[#00f0ff] uppercase tracking-wider">
        Active Alerts
      </div>
      <div className="rounded-md border border-red-500/30 bg-red-500/10 p-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[7px] font-bold text-red-400">SURVIVOR DETECTED</span>
        </div>
        <div className="text-[6px] text-gray-400">Floor 2, Room 12 — 2m ahead</div>
      </div>
      <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          <span className="text-[7px] font-bold text-yellow-400">GAS LEAK WARNING</span>
        </div>
        <div className="text-[6px] text-gray-400">CO level rising — 18 ppm</div>
      </div>
      <div className="rounded-md border border-orange-500/30 bg-orange-500/10 p-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="text-[7px] font-bold text-orange-400">STRUCTURAL RISK</span>
        </div>
        <div className="text-[6px] text-gray-400">Ceiling instability detected</div>
      </div>
      <div className="rounded-md border border-green-500/30 bg-green-500/10 p-1.5">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="text-[7px] font-bold text-green-400">ZONE CLEARED</span>
        </div>
        <div className="text-[6px] text-gray-400">Area 3B — No hazards found</div>
      </div>
    </div>
  );
}

function AIScreen() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="text-[8px] font-bold text-[#00f0ff] uppercase tracking-wider">
        AI Assistant
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="self-start rounded-md bg-[#1a1a2e] px-1.5 py-1 text-[7px] text-gray-300">
          How do I approach a survivor with leg injury?
        </div>
        <div className="self-end rounded-md bg-[#00f0ff]/20 px-1.5 py-1 text-[7px] text-[#00f0ff]">
          Approach slowly. Check for spinal injuries first. Use cervical collar if available. Do not move until stabilized.
        </div>
        <div className="self-start rounded-md bg-[#1a1a2e] px-1.5 py-1 text-[7px] text-gray-300">
          What PPE do I need for zone 4?
        </div>
        <div className="self-end rounded-md bg-[#00f0ff]/20 px-1.5 py-1 text-[7px] text-[#00f0ff]">
          Full respiratory mask, heat-resistant suit, steel-toe boots. Gas levels elevated.
        </div>
      </div>
    </div>
  );
}

function PhoneScreenContent({ activeTab }: { activeTab: TabId }) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardScreen />;
    case "camera":
      return <CameraScreen />;
    case "alerts":
      return <AlertsScreen />;
    case "ai":
      return <AIScreen />;
  }
}

export default function MobileAppContent() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a12] py-24">
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <SectionHeader
            title="Mobile Application"
            subtitle="Rescue companion app for field operations"
          />
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 flex flex-col items-center"
        >
          {/* Tab selector */}
          <div className="mb-8 flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#00f0ff]/20 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    : "bg-[#1a1a2e] text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Phone frame */}
          <div className="relative w-[280px] h-[560px] rounded-[3rem] border-4 border-[#2a2a3e] bg-[#111118] shadow-[0_0_40px_rgba(0,240,255,0.15),0_0_80px_rgba(0,240,255,0.05)]">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#2a2a3e]" />
                <div className="h-2 w-16 rounded-full bg-[#2a2a3e]" />
                <div className="h-2 w-2 rounded-full bg-[#2a2a3e]" />
              </div>
            </div>

            {/* Screen */}
            <div className="mx-2 mt-10 mb-8 h-[480px] overflow-hidden rounded-[2rem] bg-[#0d0d16]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <PhoneScreenContent activeTab={activeTab} />
              </motion.div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
              <div className="h-1 w-24 rounded-full bg-[#2a2a3e]" />
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            App Features
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlowCard className="group flex flex-col items-center p-6 text-center">
                  <div className="mb-4 text-3xl">{feature.icon}</div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400">
                    {feature.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            User Journey
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
            {journeySteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 * index }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00f0ff]/50 bg-[#1a1a2e] shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                  >
                    <span className="text-xl font-bold text-[#00f0ff]">
                      {step.number}
                    </span>
                  </motion.div>
                  <span className="mt-2 max-w-[80px] text-center text-xs text-gray-300">
                    {step.label}
                  </span>
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="mx-2 h-0.5 w-8 bg-[#00f0ff]/30 md:w-12 lg:w-16" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
            Tech Stack
          </h2>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <GlowCard className="flex flex-col items-center p-5 text-center">
                  <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#00f0ff]">
                    {tech.category}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {tech.value}
                  </span>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
