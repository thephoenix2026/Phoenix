"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Radar, Brain, Heart, X, SkipForward, Trophy, MapPin } from "lucide-react";
import type { Robot } from "@/lib/data/robots";

interface MissionTimelineProps {
  robot: Robot;
  onClose: () => void;
}

interface Phase {
  id: string;
  icon: typeof Rocket;
  title: string;
  description: string;
  color: string;
}

export default function MissionTimeline({ robot, onClose }: MissionTimelineProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const phases: Phase[] = [
    { id: "deploy", icon: Rocket, title: "Deploy", description: `Deploying ${robot.name} to ${robot.sectorLabel}`, color: "#00d4ff" },
    { id: "search", icon: Radar, title: "Search", description: "Scanning sector with multi-spectral sensors", color: "#f97316" },
    { id: "detect", icon: Brain, title: "Detect", description: "AI ensemble analyzing sensor data for survivors", color: "#7c3aed" },
    { id: "rescue", icon: Heart, title: "Rescue", description: "Coordinating rescue operation", color: "#10b981" },
  ];

  useEffect(() => {
    if (completed || currentPhase >= phases.length) return;
    setProgress(0);
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min((step / steps) * 100, 100));
      if (step >= steps) {
        clearInterval(timer);
        if (currentPhase < phases.length - 1) {
          setCurrentPhase((p) => p + 1);
        } else {
          setCompleted(true);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentPhase, completed, phases.length]);

  const handleSkip = useCallback(() => {
    setCurrentPhase(phases.length - 1);
    setProgress(100);
    setCompleted(true);
  }, [phases.length]);

  const current = phases[currentPhase] || phases[phases.length - 1];
  const PhaseIcon = current.icon;

  const markerAngles = [0, 60, 120, 180, 240, 300];
  const markerIndex = Math.min(Math.floor((progress / 100) * markerAngles.length), markerAngles.length - 1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-3xl mx-4 rounded-3xl border border-[#2a2a3e] bg-[#0d0d15]/95 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.05)_0%,transparent_70%)]" />

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white font-mono">MISSION REPLAY</h2>
              <p className="text-[#64748b] text-xs font-mono mt-1">{robot.name} · {robot.sectorLabel}</p>
            </div>
            <div className="flex items-center gap-2">
              {!completed && (
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-[#94a3b8] hover:text-white text-xs font-mono transition-colors"
                >
                  <SkipForward size={12} /> Skip
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a3e] text-[#64748b] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Phase Progress Bar */}
          <div className="flex gap-1 mb-8">
            {phases.map((phase, i) => {
              const isActive = i === currentPhase;
              const isDone = i < currentPhase;
              return (
                <div key={phase.id} className="flex-1">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: isDone ? phase.color : isActive ? phase.color : "#1a1a2e",
                      opacity: isActive ? 1 : isDone ? 0.8 : 0.3,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Phase Labels */}
          <div className="flex justify-between mb-10">
            {phases.map((phase, i) => {
              const isActive = i === currentPhase;
              const isDone = i < currentPhase;
              const PIcon = phase.icon;
              return (
                <div key={phase.id} className="flex flex-col items-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isDone ? `${phase.color}25` : isActive ? `${phase.color}20` : "#1a1a2e",
                      border: `2px solid ${isDone ? phase.color : isActive ? phase.color : "#2a2a3e"}`,
                    }}
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  >
                    <PIcon size={16} style={{ color: isDone || isActive ? phase.color : "#475569" }} />
                  </motion.div>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: isDone || isActive ? phase.color : "#475569" }}
                  >
                    {phase.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current Phase Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center mb-8"
            >
              {/* Animated icon */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${current.color}12`,
                  border: `1px solid ${current.color}30`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${current.color}20`,
                    `0 0 40px ${current.color}40`,
                    `0 0 20px ${current.color}20`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PhaseIcon size={36} style={{ color: current.color }} />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">{current.title} Phase</h3>
              <p className="text-[#94a3b8] text-sm">{current.description}</p>

              {/* Progress circle */}
              <div className="relative w-24 h-24 mt-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a2e" strokeWidth="6" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={current.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="263.89"
                    strokeDashoffset={263.89 - (263.89 * progress) / 100}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold font-mono" style={{ color: current.color }}>
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mini Radar Map */}
          <div className="relative h-32 rounded-xl border border-[#1a1a2e] bg-[#0a0a0f] overflow-hidden mb-6">
            <div className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* HQ marker */}
              <div className="absolute" style={{ left: "15%", top: "50%" }}>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[7px] text-green-400 font-mono mt-0.5">HQ</span>
                </div>
              </div>
              {/* Robot marker moving in arc */}
              <motion.div
                className="absolute"
                style={{
                  left: `${15 + (progress / 100) * 60}%`,
                  top: `${30 + Math.sin((progress / 100) * Math.PI) * 25}%`,
                }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${robot.color}30`, border: `2px solid ${robot.color}` }}
                    animate={{ boxShadow: [`0 0 4px ${robot.color}60`, `0 0 12px ${robot.color}80`, `0 0 4px ${robot.color}60`] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <MapPin size={8} style={{ color: robot.color }} />
                  </motion.div>
                  <span className="text-[7px] font-mono mt-0.5" style={{ color: robot.color }}>{robot.codename}</span>
                </motion.div>
              </motion.div>
              {/* Sector marker */}
              <div className="absolute" style={{ left: "78%", top: "45%" }}>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-dashed"
                    style={{ borderColor: `${current.color}50` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[7px] text-[#64748b] font-mono mt-0.5">{robot.sectorLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Area Searched", value: `${Math.min(Math.round((progress / 100) * 100), 100)}%`, color: current.color },
              { label: "Survivors Found", value: `${Math.min(Math.round((progress / 100) * robot.survivorsFound), robot.survivorsFound)}`, color: "#10b981" },
              { label: "Mission Status", value: completed ? "COMPLETE" : currentPhase >= 3 ? "RESCUING" : currentPhase >= 2 ? "DETECTING" : currentPhase >= 1 ? "SEARCHING" : "DEPLOYING", color: completed ? "#10b981" : current.color },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl border border-[#1a1a2e] bg-[#0a0a0f]/60">
                <motion.p
                  className="text-lg font-bold font-mono"
                  style={{ color: stat.color }}
                  animate={{ textShadow: [`0 0 4px ${stat.color}30`, `0 0 8px ${stat.color}50`, `0 0 4px ${stat.color}30`] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-[10px] text-[#64748b] font-mono mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Completion Badge */}
          {completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mt-6 flex items-center justify-center gap-3 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy size={24} className="text-emerald-400" />
              </motion.div>
              <div>
                <p className="text-emerald-400 font-bold text-sm">Mission Complete</p>
                <p className="text-emerald-300/60 text-xs font-mono">{robot.survivorsFound} survivors rescued · {robot.sectorLabel} cleared</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
