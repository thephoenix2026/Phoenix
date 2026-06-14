"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initialSensorData, type SensorReading } from "@/lib/data/sensors";
import GlowCard from "@/components/shared/GlowCard";

export default function SensorPanel() {
  const [sensors, setSensors] = useState<SensorReading[]>(initialSensorData);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          const range = sensor.max - sensor.min;
          const fluctuation = range * 0.015;
          const delta = (Math.random() - 0.5) * fluctuation;
          const newVal = Math.max(
            sensor.min,
            Math.min(sensor.max, sensor.value + delta)
          );
          return { ...sensor, value: parseFloat(newVal.toFixed(2)) };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (sensor: SensorReading) => {
    if (sensor.value >= sensor.criticalThreshold) return "#ef4444";
    if (sensor.value >= sensor.warningThreshold) return "#eab308";
    return "#22c55e";
  };

  const getBarPercent = (sensor: SensorReading) => {
    return ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;
  };

  return (
    <GlowCard glowColor="#00d4ff" className="flex flex-col">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
        Sensor Array
      </h3>
      <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[420px] pr-1 custom-scrollbar">
        <AnimatePresence>
          {sensors.map((sensor) => {
            const statusColor = getStatusColor(sensor);
            const barPercent = getBarPercent(sensor);
            return (
              <motion.div
                key={sensor.name}
                layout
                className="bg-[#0a0a0f]/60 rounded-lg p-2.5 border border-[#1a1a2e]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#94a3b8] font-medium">
                    {sensor.name}
                  </span>
                  <span
                    className="text-sm font-bold font-mono tabular-nums"
                    style={{ color: statusColor }}
                  >
                    {sensor.value}
                    <span className="text-[10px] ml-0.5 opacity-70">
                      {sensor.unit}
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: statusColor }}
                    animate={{ width: `${Math.min(barPercent, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
