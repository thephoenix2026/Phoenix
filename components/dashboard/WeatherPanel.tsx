"use client";

import { motion } from "framer-motion";
import type { WeatherCondition } from "@/lib/data/weather";
import { weatherConditions } from "@/lib/data/weather";

interface WeatherPanelProps {
  condition: WeatherCondition;
}

export default function WeatherPanel({ condition }: WeatherPanelProps) {
  const weather = weatherConditions[condition];

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0a0a0f]/60 border border-[#1a1a2e]">
      <motion.span
        key={condition}
        initial={{ scale: 0.8, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        className="text-lg"
      >
        {weather.icon}
      </motion.span>
      <div className="flex items-center gap-3 text-[10px] font-mono">
        <div>
          <p className="font-bold text-white">{weather.label}</p>
          <p className="text-[#475569] text-[8px] uppercase tracking-wider">{condition}</p>
        </div>
        <div className="w-px h-5 bg-[#2a2a3e]" />
        <div className="text-center">
          <p className="text-[#475569] uppercase text-[8px]">Vis</p>
          <p className="text-white font-bold">{weather.visibility}%</p>
        </div>
        <div className="w-px h-5 bg-[#2a2a3e]" />
        <div className="text-center">
          <p className="text-[#475569] uppercase text-[8px]">Wind</p>
          <p className="text-white font-bold">{weather.windSpeed}km/h</p>
        </div>
      </div>
    </div>
  );
}
