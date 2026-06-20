"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";
import type { Robot } from "@/lib/data/robots";

interface CommLogProps {
  robot: Robot;
}

interface CommEntry {
  id: number;
  from: string;
  message: string;
  timestamp: string;
  type: "transmission" | "command" | "system" | "ai";
}

const generateCommMessages = (robot: Robot): Omit<CommEntry, "id" | "timestamp">[] => [
  { from: `HQ Command`, message: `${robot.codename}, status update requested. Report your findings.`, type: "command" },
  { from: `${robot.codename}`, message: `Copy HQ. ${robot.survivorsFound} survivors located in ${robot.location.split(" —")[0]}. Proceeding with extraction protocol.`, type: "transmission" },
  { from: "AI Core", message: `Updated path plan transmitted to ${robot.codename}. ETA to survivor location: 4 minutes.`, type: "ai" },
  { from: "System", message: `Signal strength: ${robot.signal}% — Link stable.`, type: "system" },
  { from: `HQ Command`, message: `${robot.codename}, be advised: secondary collapse possible in your sector. Exercise caution.`, type: "command" },
  { from: `${robot.codename}`, message: `Acknowledged HQ. Switching to structural monitoring mode.`, type: "transmission" },
  { from: "AI Core", message: `Thermal scan re-analysis complete. Updated survivor probability map transmitted.`, type: "ai" },
  { from: "System", message: `Battery: ${robot.battery}% — ${robot.battery > 50 ? "Nominal" : "Low — consider recharge"}.`, type: "system" },
  { from: `${robot.codename}`, message: `Visual contact established with survivor. Medical team, prepare for extraction at grid reference ${robot.sectorLabel}-B.`, type: "transmission" },
  { from: "HQ Command", message: `Copy ${robot.codename}. Medical team en route. ETA 8 minutes.`, type: "command" },
];

export default function CommLog({ robot }: CommLogProps) {
  const [entries, setEntries] = useState<CommEntry[]>([]);
  const [nextId, setNextId] = useState(1);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(generateCommMessages(robot));

  useEffect(() => {
    messagesRef.current = generateCommMessages(robot);
    setEntries([]);
    setNextId(1);

    const initial = messagesRef.current.slice(0, 3).map((m, i) => ({
      ...m,
      id: i + 1,
      timestamp: new Date(Date.now() - (3 - i) * 4000).toLocaleTimeString("en-US", { hour12: false }),
    }));
    setEntries(initial);
    setNextId(4);
  }, [robot.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = messagesRef.current[Math.floor(Math.random() * messagesRef.current.length)];
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
      setEntries((prev) => [{ ...msg, id: nextId, timestamp }, ...prev]);
      setNextId((prev) => prev + 1);
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, [nextId, robot.id]);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [entries, autoScroll]);

  const typeStyles: Record<string, string> = {
    transmission: "border-l-[#00d4ff] text-[#00d4ff]",
    command: "border-l-[#f97316] text-[#f97316]",
    system: "border-l-[#64748b] text-[#64748b]",
    ai: "border-l-[#a855f7] text-[#a855f7]",
  };

  const typeLabels: Record<string, string> = {
    transmission: "TX",
    command: "CMD",
    system: "SYS",
    ai: "AI",
  };

  return (
    <GlowCard glowColor="#00d4ff" className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          Comm Log — {robot.codename}
        </h3>
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
            autoScroll ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "bg-[#1a1a2e] text-[#475569]"
          }`}
        >
          {autoScroll ? "AUTO" : "MANUAL"}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto max-h-[300px] space-y-1.5 pr-1 custom-scrollbar"
        onScroll={() => {
          if (scrollRef.current && scrollRef.current.scrollTop > 10) {
            setAutoScroll(false);
          }
        }}
      >
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a0a0f]/60 rounded border border-[#1a1a2e] border-l-2 overflow-hidden"
              style={{ borderLeftColor: entry.type === "transmission" ? "#00d4ff" : entry.type === "command" ? "#f97316" : entry.type === "system" ? "#64748b" : "#a855f7" }}
            >
              <div className="p-2">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-mono uppercase font-bold ${typeStyles[entry.type]}`}>
                      [{typeLabels[entry.type]}]
                    </span>
                    <span className="text-[10px] text-white font-mono">{entry.from}</span>
                  </div>
                  <span className="text-[9px] text-[#475569] font-mono">{entry.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-relaxed ml-[18px]">{entry.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
