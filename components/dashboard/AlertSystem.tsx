"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Alert } from "@/lib/data/robots";
import GlowCard from "@/components/shared/GlowCard";

interface AlertSystemProps {
  alerts: Alert[];
  robotCodename?: string;
}

const simulatedMessages: Omit<Alert, "id" | "timestamp">[] = [
  { type: "critical", message: "Temperature spike detected — exceeds safety threshold", source: "Temperature Sensor" },
  { type: "warning", message: "Battery level dropping — consider recharging", source: "Power System" },
  { type: "info", message: "Path planning updated: new shortest route calculated", source: "AI — Pathfinding" },
  { type: "success", message: "Obstacle cleared: debris removed from corridor", source: "Navigation System" },
  { type: "critical", message: "Gas leak detected in adjacent compartment", source: "Gas Sensor" },
  { type: "warning", message: "Motor temperature elevated — reducing speed", source: "Motor Controller" },
  { type: "info", message: "New acoustic signature classified as non-human", source: "AI — Acoustic Model" },
  { type: "success", message: "Survivor extraction point marked and verified", source: "AI — Rescue Assistant" },
  { type: "warning", message: "IMU drift detected — recalibrating gyroscope", source: "MPU6050 IMU" },
  { type: "info", message: "Map updated: 8 new grid cells explored", source: "SLAM Module" },
];

const alertBorderColor: Record<string, string> = {
  critical: "#ef4444",
  warning: "#f97316",
  info: "#00d4ff",
  success: "#22c55e",
};

const alertBadgeColor: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400",
  warning: "bg-orange-500/20 text-orange-400",
  info: "bg-cyan-500/20 text-cyan-400",
  success: "bg-green-500/20 text-green-400",
};

export default function AlertSystem({ alerts: initialAlerts, robotCodename = "PHX" }: AlertSystemProps) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [nextId, setNextId] = useState(100);

  useEffect(() => {
    setAlerts(initialAlerts);
    setNextId(100);
  }, [initialAlerts]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const msg =
          simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
        const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });

        setAlerts((prev) => [
          { ...msg, id: nextId, timestamp },
          ...prev,
        ]);
        setNextId((prev) => prev + 1);
      },
      8000 + Math.random() * 7000
    );
    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <GlowCard glowColor="#ef4444" className="flex flex-col">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Alert System — {robotCodename}
      </h3>
      <div className="flex-1 overflow-y-auto max-h-[460px] space-y-2 pr-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0f]/60 rounded-lg border border-[#1a1a2e] overflow-hidden"
              style={{
                borderLeftWidth: "3px",
                borderLeftColor: alertBorderColor[alert.type],
              }}
            >
              <div className="p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${alertBadgeColor[alert.type]}`}
                  >
                    {alert.type}
                  </span>
                  <span className="text-[10px] text-[#64748b] font-mono tabular-nums">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed mt-1">
                  {alert.message}
                </p>
                <p className="text-[10px] text-[#475569] mt-1">
                  Source: {alert.source}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
