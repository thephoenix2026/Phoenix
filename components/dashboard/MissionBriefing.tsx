"use client";

import { motion } from "framer-motion";
import type { Robot } from "@/lib/data/robots";

interface MissionBriefingProps {
  robot: Robot;
}

const threatColors: Record<string, string> = {
  low: "#22c55e",
  moderate: "#eab308",
  high: "#f97316",
  critical: "#ef4444",
};

export default function MissionBriefing({ robot }: MissionBriefingProps) {
  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m`;
  };

  const statusColor = (val: number) => {
    if (val >= 80) return "#22c55e";
    if (val >= 50) return "#eab308";
    return "#ef4444";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={robot.id}
      className="bg-[#111118]/80 backdrop-blur-xl border border-[#2a2a3e] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white font-mono tracking-wider">
              {robot.codename}
            </h2>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full border"
              style={{
                borderColor: threatColors[robot.threatLevel],
                color: threatColors[robot.threatLevel],
                backgroundColor: `${threatColors[robot.threatLevel]}15`,
              }}
            >
              {robot.threatLevel.toUpperCase()} THREAT
            </span>
          </div>
          <p className="text-[#64748b] text-sm font-mono mt-0.5">{robot.mission}</p>
        </div>
        <div className="text-right">
          <p className="text-[#00d4ff] text-xs font-mono">{robot.missionCodename}</p>
          <p className="text-[#475569] text-[10px] font-mono mt-0.5">Mission ID</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-1">
              Location
            </p>
            <p className="text-white text-sm font-mono">{robot.location}</p>
            <p className="text-[#475569] text-[10px] font-mono mt-0.5">
              {robot.coordinates.lat}°N, {robot.coordinates.lng}°E
            </p>
          </div>

          <div>
            <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-1">
              Team Assignment
            </p>
            <p className="text-white text-sm font-mono">{robot.team}</p>
            <p className="text-[#475569] text-[10px] font-mono mt-0.5">
              Lead: {robot.teamLead}
            </p>
          </div>

          <div>
            <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-1">
              Specialization
            </p>
            <p className="text-white text-sm font-mono">{robot.specialization}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-1">
              Environment
            </p>
            <p className="text-white text-sm font-mono">{robot.environment}</p>
          </div>

          <div>
            <p className="text-[#64748b] text-[10px] font-mono uppercase tracking-wider mb-1">
              Robot Health
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["motors", "sensors", "chassis", "power"] as const).map((part) => (
                <div key={part} className="flex items-center gap-2">
                  <span className="text-[10px] text-[#64748b] font-mono uppercase w-14">
                    {part}
                  </span>
                  <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: statusColor(robot.health[part]) }}
                      animate={{ width: `${robot.health[part]}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-mono w-6 text-right"
                    style={{ color: statusColor(robot.health[part]) }}
                  >
                    {robot.health[part]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[#475569] text-[10px] font-mono">Mission Duration</p>
                <p className="text-white text-sm font-mono">{formatDuration(robot.missionDuration)}</p>
              </div>
              <div>
                <p className="text-[#475569] text-[10px] font-mono">Deployed Since</p>
                <p className="text-white text-sm font-mono">{robot.missionStartTime}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#475569] text-[10px] font-mono">Survivors Found</p>
              <p className="text-2xl font-bold text-[#22c55e] font-mono">{robot.survivorsFound}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
