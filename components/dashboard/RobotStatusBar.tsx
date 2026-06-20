"use client";

import { motion } from "framer-motion";
import type { Robot } from "@/lib/data/robots";

interface RobotStatusBarProps {
  robots: Robot[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  deployed: { label: "DP", color: "#22c55e" },
  engaged: { label: "EG", color: "#eab308" },
  returning: { label: "RT", color: "#3b82f6" },
  standby: { label: "SB", color: "#64748b" },
  error: { label: "ER", color: "#ef4444" },
};

export default function RobotStatusBar({ robots, selectedId, onSelect }: RobotStatusBarProps) {
  return (
    <div className="flex items-center gap-2">
      {robots.map((robot) => {
        const status = statusConfig[robot.status];
        const isSelected = robot.id === selectedId;

        return (
          <motion.button
            key={robot.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(robot.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 border ${
              isSelected
                ? "bg-[#1a1a3e] border-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                : "bg-[#111118]/80 border-[#2a2a3e] hover:border-[#4a4a6e]"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${robot.status !== "standby" && robot.status !== "returning" ? "animate-pulse" : ""}`}
              style={{ backgroundColor: status.color }}
            />
            <span className="text-white font-bold tracking-wider">{robot.codename}</span>
            <span className="text-[#475569]">{status.label}</span>
            <span
              className="tabular-nums"
              style={{
                color: robot.battery > 50 ? "#22c55e" : robot.battery > 25 ? "#eab308" : "#ef4444",
              }}
            >
              {robot.battery}%
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
