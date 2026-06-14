"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import CameraFeed from "./CameraFeed";
import ThermalFeed from "./ThermalFeed";
import SensorPanel from "./SensorPanel";
import AIOutputs from "./AIOutputs";
import AlertSystem from "./AlertSystem";
import RescueSimulator from "@/components/interactive/RescueSimulator";

export function DashboardContent() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour12: false }) +
          "." +
          String(now.getMilliseconds()).padStart(3, "0")
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate((prev) => (prev >= 30 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-6">
        <SectionHeader
          title="PHOENIX MISSION CONTROL"
          subtitle="Real-time disaster rescue monitoring and AI-assisted decision support"
          badge="Live Operations"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mt-6 p-4 rounded-xl bg-[#111118]/80 border border-[#2a2a3e]"
        >
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">ROBOT: ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">CONNECTION: STABLE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-sm text-[#00d4ff] font-medium">AI: RUNNING</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <div className="text-white font-mono tabular-nums">{currentTime}</div>
            <div className="text-[#64748b]">
              Last Update: <span className="text-[#00d4ff]">{lastUpdate}s ago</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <CameraFeed />
          <ThermalFeed />
          <SensorPanel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            <AIOutputs />
          </div>
          <AlertSystem />
        </div>

        {/* Rescue Mission Simulator */}
        <div className="mt-4">
          <RescueSimulator />
        </div>
      </div>
    </section>
  );
}
