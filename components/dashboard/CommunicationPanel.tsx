"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";
import type { Robot } from "@/lib/data/robots";

interface CommunicationPanelProps {
  robot: Robot;
}

const facilityIcons: Record<string, string> = {
  hospital: "🏥",
  fire_station: "🚒",
  police_station: "🚔",
  civil_defense: "🛡️",
  government_building: "🏛️",
  military_base: "⚔️",
  emergency_shelter: "⛑️",
};

type Tab = "walkie-talkie" | "phone" | "satellite" | "facilities";

export default function CommunicationPanel({ robot }: CommunicationPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>(robot.communication.primaryMethod);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "walkie-talkie", label: "WALKIE", icon: "📡" },
    { id: "phone", label: "PHONE", icon: "📞" },
    { id: "satellite", label: "SAT", icon: "🛰️" },
    { id: "facilities", label: "FACILITIES", icon: "🏛️" },
  ];

  return (
    <GlowCard glowColor="#00d4ff" className="flex flex-col">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
        Communications — {robot.codename}
      </h3>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-4 bg-[#0a0a0f]/60 rounded-lg p-1 border border-[#1a1a2e]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-[10px] font-mono font-bold tracking-wider transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-[#00d4ff]/20 text-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                : "text-[#475569] hover:text-[#64748b]"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === "walkie-talkie" && robot.communication.walkieTalkie && (
            <motion.div
              key="walkie"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="bg-gradient-to-b from-[#0d0d1a] to-[#0a0a0f] rounded-xl p-5 border border-[#1a1a2e] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                    <span className="text-[#22c55e] text-xs font-mono font-bold tracking-widest">CHANNEL ACTIVE</span>
                  </div>
                  <span className="text-[#475569] text-[10px] font-mono">SQL: OFF</span>
                </div>

                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/5 via-[#00d4ff]/10 to-[#00d4ff]/5 rounded-lg blur-xl" />
                  <div className="relative bg-black/60 rounded-lg py-4 px-3 border border-[#00d4ff]/20 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                    <div className="flex items-center justify-center gap-6 sm:gap-10">
                      <div className="text-center">
                        <p className="text-[#475569] text-[9px] font-mono uppercase tracking-[0.2em] mb-2">Frequency</p>
                        <div className="bg-[#00d4ff]/5 rounded px-3 py-1.5 border border-[#00d4ff]/10">
                          <p className="text-[#00d4ff] text-base sm:text-lg font-bold font-mono tracking-wider drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]">
                            {robot.communication.walkieTalkie.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-8 bg-[#00d4ff]/20 rounded-full" />
                        <div className="w-1 h-10 bg-[#00d4ff]/40 rounded-full" />
                        <div className="w-1 h-6 bg-[#00d4ff]/20 rounded-full" />
                      </div>
                      <div className="text-center">
                        <p className="text-[#475569] text-[9px] font-mono uppercase tracking-[0.2em] mb-2">Ch</p>
                        <p className="text-white text-2xl font-bold font-mono">{robot.communication.walkieTalkie.channels}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-8 bg-[#00d4ff]/20 rounded-full" />
                        <div className="w-1 h-10 bg-[#00d4ff]/40 rounded-full" />
                        <div className="w-1 h-6 bg-[#00d4ff]/20 rounded-full" />
                      </div>
                      <div className="text-center">
                        <p className="text-[#475569] text-[9px] font-mono uppercase tracking-[0.2em] mb-2">Range</p>
                        <p className="text-white text-base sm:text-lg font-bold font-mono">{robot.communication.walkieTalkie.range}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2 border border-[#1a1a2e]">
                  <div className="flex gap-0.5 flex-1 items-end h-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 rounded-sm"
                        style={{ backgroundColor: i < 6 ? "#00d4ff" : "#1a3a4a" }}
                        animate={{
                          height: i < 6
                            ? [`${30 + Math.random() * 70}%`, `${30 + Math.random() * 70}%`]
                            : ["10%", "10%"],
                        }}
                        transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                  <span className="text-[#475569] text-[9px] font-mono uppercase tracking-wider whitespace-nowrap">TX ACTIVE</span>
                </div>
              </div>
              <div className="bg-[#0a0a0f]/60 rounded-lg p-3 border border-[#1a1a2e]">
                <div className="flex items-center gap-2 text-[#64748b] text-[10px] font-mono">
                  <span className="text-green-400">●</span>
                  Base station is monitoring channel {robot.communication.walkieTalkie.channels > 8 ? "9" : "3"} — relay active
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "phone" && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="bg-[#0a0a0f]/60 rounded-lg p-3 border border-[#1a1a2e] mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#00d4ff] text-xs font-mono font-bold">DIRECT CONTACT LIST</span>
                  <span className="text-[#475569] text-[10px] font-mono">({robot.communication.phoneNumbers.length} numbers)</span>
                </div>
                <div className="w-full h-px bg-[#2a2a3e] mb-2" />
                {robot.communication.phoneNumbers.map((entry, idx) => {
                  const [num, ...labelParts] = entry.split(" — ");
                  const label = labelParts.join(" — ");
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#1a1a2e]/50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#475569] text-[10px] font-mono w-4">{idx + 1}.</span>
                        <span className="text-white text-xs font-mono">{num}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#64748b] text-[10px] font-mono hidden sm:block">{label}</span>
                        <span className="text-[#00d4ff] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">CALL</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#0a0a0f]/60 rounded-lg p-2.5 border border-[#1a1a2e]">
                <p className="text-[#64748b] text-[10px] font-mono text-center">
                  All calls are encrypted and routed through Phoenix secure relay
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "satellite" && robot.communication.satellitePhone && (
            <motion.div
              key="satellite"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="bg-[#0a0a0f]/60 rounded-xl p-5 border border-[#1a1a2e] text-center">
                <div className="text-3xl mb-3">🛰️</div>
                <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-2">
                  Iridium Satellite Link
                </p>
                <div className="inline-block bg-black/50 rounded-lg px-6 py-3 border border-[#2a2a3e] mb-3">
                  <p className="text-[#00d4ff] text-xl font-bold font-mono tracking-widest">
                    {robot.communication.satellitePhone}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[#22c55e] text-[10px] font-mono">GLOBAL REACH</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[#64748b] text-[10px] font-mono">ENCRYPTED</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0f]/60 rounded-lg p-2.5 border border-[#1a1a2e]">
                <p className="text-[#64748b] text-[10px] font-mono text-center">
                  Satellite communication is the primary method — infrastructure in {robot.sectorLabel} is compromised
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "facilities" && (
            <motion.div
              key="facilities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider">
                  Nearby Governmental & Emergency Facilities
                </span>
                <span className="text-[#475569] text-[10px] font-mono">
                  {robot.nearbyFacilities.length} locations
                </span>
              </div>
              {robot.nearbyFacilities.map((facility, idx) => (
                <motion.div
                  key={facility.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#0a0a0f]/60 rounded-lg border border-[#1a1a2e] overflow-hidden hover:border-[#2a2a4e] transition-colors"
                >
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span>{facilityIcons[facility.type] || "📍"}</span>
                        <div>
                          <p className="text-white text-xs font-semibold">{facility.name}</p>
                          <span className="text-[10px] text-[#475569] font-mono uppercase tracking-wider">
                            {facility.type.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00d4ff] text-xs font-mono font-bold">{facility.distance}</p>
                        <p className="text-[#22c55e] text-[10px] font-mono">ETA: {facility.eta}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#64748b]">{facility.address}</span>
                      <span className="text-[#00d4ff]">{facility.contact}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
