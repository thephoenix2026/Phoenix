"use client";

import { motion } from "framer-motion";
import type { Robot } from "@/lib/data/robots";

interface RobotSelectorProps {
  robots: Robot[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const statusConfig: Record<string, { label: string; color: string; pulse: boolean }> = {
  deployed: { label: "Deployed", color: "#22c55e", pulse: true },
  engaged: { label: "Engaged", color: "#eab308", pulse: true },
  returning: { label: "Returning", color: "#3b82f6", pulse: false },
  standby: { label: "Standby", color: "#64748b", pulse: false },
  error: { label: "Error", color: "#ef4444", pulse: true },
};

export default function RobotSelector({ robots, selectedId, onSelect }: RobotSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {robots.map((robot, index) => {
        const status = statusConfig[robot.status];
        const isSelected = robot.id === selectedId;

        return (
          <motion.button
            key={robot.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(robot.id)}
            className={`relative rounded-xl p-4 text-left transition-all duration-300 border ${
              isSelected
                ? "bg-[#1a1a3e] border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                : "bg-[#111118]/80 border-[#2a2a3e] hover:border-[#4a4a6e]"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${status.pulse ? "animate-pulse" : ""}`}
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-[10px] font-mono" style={{ color: status.color }}>
                  {status.label}
                </span>
              </div>
              <span
                className="text-xs font-bold font-mono"
                style={{ color: robot.color }}
              >
                {robot.name}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white font-mono tracking-wider">
                  {robot.codename}
                </span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                  />
                )}
              </div>
              <p className="text-[10px] text-[#64748b] font-mono mt-0.5 truncate">
                {robot.missionCodename}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#475569] font-mono">BATTERY</span>
                <span
                  className="font-mono font-bold"
                  style={{
                    color: robot.battery > 50 ? "#22c55e" : robot.battery > 25 ? "#eab308" : "#ef4444",
                  }}
                >
                  {robot.battery}%
                </span>
              </div>
              <div className="w-full h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: robot.battery > 50 ? "#22c55e" : robot.battery > 25 ? "#eab308" : "#ef4444",
                  }}
                  animate={{ width: `${robot.battery}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#475569] font-mono">SIGNAL</span>
                <span
                  className="font-mono font-bold"
                  style={{
                    color: robot.signal > 60 ? "#22c55e" : robot.signal > 30 ? "#eab308" : "#ef4444",
                  }}
                >
                  {robot.signal}%
                </span>
              </div>
              <div className="w-full h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: robot.signal > 60 ? "#22c55e" : robot.signal > 30 ? "#eab308" : "#ef4444",
                  }}
                  animate={{ width: `${robot.signal}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <p className="text-[9px] text-[#475569] font-mono mt-2 truncate">
              {robot.location}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
