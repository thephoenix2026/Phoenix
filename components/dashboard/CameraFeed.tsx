"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";
import type { WeatherCondition } from "@/lib/data/weather";

interface CameraFeedProps {
  robotName?: string;
  robotCodename?: string;
  sectorLabel?: string;
  color?: string;
  weather?: WeatherCondition;
}

export default function CameraFeed({
  robotName = "PHX-01",
  robotCodename = "HORUS",
  sectorLabel = "SECTOR 3",
  color = "#00d4ff",
  weather = "clear",
}: CameraFeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const weatherRef = useRef(weather);
  const [flicker, setFlicker] = useState(false);

  weatherRef.current = weather;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 360;

    let frame = 0;
    let animId: number;

    const drawNoise = () => {
      const w = weatherRef.current;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      const brightness = w === "night" ? 8 : w === "fog" ? 30 : w === "sandstorm" ? 18 : w === "storm" ? 12 : 25;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * brightness;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }

      // Weather tint
      if (w === "night") {
        for (let i = 0; i < data.length; i += 4) {
          data[i] *= 0.3;
          data[i + 1] *= 0.3;
          data[i + 2] *= 0.6;
        }
      } else if (w === "fog") {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 60);
          data[i + 1] = Math.min(255, data[i + 1] + 60);
          data[i + 2] = Math.min(255, data[i + 2] + 65);
        }
      } else if (w === "sandstorm") {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 40 + Math.random() * 20);
          data[i + 1] = Math.min(255, data[i + 1] + 25 + Math.random() * 15);
          data[i + 2] = Math.min(255, data[i + 2] * 0.5);
        }
      } else if (w === "storm" || w === "rain") {
        for (let i = 0; i < data.length; i += 4) {
          data[i] *= 0.85;
          data[i + 1] *= 0.85;
          data[i + 2] *= 0.9;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // Rain / storm streaks
      if (w === "rain" || w === "storm") {
        ctx.strokeStyle = `rgba(180, 210, 255, ${w === "storm" ? 0.25 : 0.15})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < (w === "storm" ? 40 : 20); i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - 4, y + 12);
          ctx.stroke();
        }
      }

      // Sandstorm particles
      if (w === "sandstorm") {
        ctx.fillStyle = "rgba(210, 180, 120, 0.3)";
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 1 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Storm lightning flash
      if (w === "storm" && frame % 180 === 0 && Math.random() > 0.6) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Scan lines
      ctx.fillStyle = `rgba(0, 212, 255, 0.03)`;
      for (let i = 0; i < 3; i++) {
        const y = Math.random() * canvas.height;
        ctx.fillRect(0, y, canvas.width, 1);
      }

      // Crosshair
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const size = 20;
      ctx.strokeStyle = "#00ff41";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - size, cy);
      ctx.lineTo(cx + size, cy);
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx, cy + size);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      // Labels
      ctx.fillStyle = `rgba(0, 212, 255, 0.85)`;
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`CAMERA FEED — ${sectorLabel}`, 12, 24);

      ctx.textAlign = "right";
      ctx.fillStyle = `rgba(0, 212, 255, 0.6)`;
      ctx.font = "12px monospace";
      ctx.fillText(`${robotCodename} • ${robotName}`, canvas.width - 12, 24);

      // Weather overlay label
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.font = "10px monospace";
      const weatherLabels: Record<string, string> = {
        rain: "🌧️ RAIN — VIS REDUCED",
        storm: "⛈️ STORM — CAUTION",
        fog: "🌫️ FOG — LOW VISIBILITY",
        night: "🌙 NIGHT MODE — IR ACTIVE",
        sandstorm: "🌪️ SANDSTORM — SENSORS DEGRADED",
        clear: "☀️ CLEAR — NOMINAL",
      };
      ctx.fillText(weatherLabels[w] || "", 12, 44);

      const t = new Date().toLocaleTimeString("en-US", { hour12: false });
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      ctx.font = "12px monospace";
      ctx.fillText(t, canvas.width - 12, canvas.height - 12);

      if (frame % 120 === 0 && Math.random() > 0.5) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 80);
      }

      frame++;
      animId = requestAnimationFrame(drawNoise);
    };

    drawNoise();
    return () => cancelAnimationFrame(animId);
  }, [sectorLabel, robotCodename, robotName]);

  return (
    <GlowCard glowColor={color} className="p-2 relative overflow-hidden">
      <div className="relative rounded-lg overflow-hidden bg-black">
        <motion.canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ aspectRatio: "16/9" }}
          animate={{ opacity: flicker ? 0.3 : 1 }}
          transition={{ duration: 0.05 }}
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-500 text-xs font-bold tracking-wider">LIVE</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <p className="text-center text-[#64748b] text-xs mt-2 font-mono">
        {robotCodename} • Camera Feed • 1080p • 30fps
      </p>
    </GlowCard>
  );
}
