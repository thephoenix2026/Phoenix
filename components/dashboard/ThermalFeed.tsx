"use client";

import { useEffect, useRef } from "react";
import GlowCard from "@/components/shared/GlowCard";

interface HotSpot {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  vx: number;
  vy: number;
}

const hotSpots: HotSpot[] = [
  { x: 150, y: 120, radius: 45, intensity: 0.9, vx: 0.3, vy: 0.2 },
  { x: 420, y: 220, radius: 38, intensity: 0.75, vx: -0.2, vy: 0.15 },
];

function tempToColor(temp: number): [number, number, number] {
  if (temp < 0.25) {
    const t = temp / 0.25;
    return [0, 0, Math.floor(80 + t * 40)];
  } else if (temp < 0.5) {
    const t = (temp - 0.25) / 0.25;
    return [0, Math.floor(t * 120), Math.floor(120 - t * 40)];
  } else if (temp < 0.75) {
    const t = (temp - 0.5) / 0.25;
    return [Math.floor(t * 220), Math.floor(120 + t * 100), 0];
  } else {
    const t = (temp - 0.75) / 0.25;
    return [220 + Math.floor(t * 35), Math.floor(220 - t * 100), 0];
  }
}

export default function ThermalFeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanLineRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 360;

    let animId: number;

    const draw = () => {
      frameRef.current++;

      hotSpots.forEach((hs) => {
        hs.x += hs.vx;
        hs.y += hs.vy;
        if (hs.x < 60 || hs.x > canvas.width - 60) hs.vx *= -1;
        if (hs.y < 60 || hs.y > canvas.height - 60) hs.vy *= -1;
      });

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          let temp = 0.05 + Math.random() * 0.08;

          hotSpots.forEach((hs) => {
            const dx = x - hs.x;
            const dy = y - hs.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < hs.radius * 2.5) {
              const falloff = Math.max(0, 1 - dist / (hs.radius * 2.5));
              temp += hs.intensity * falloff * falloff;
            }
          });

          temp = Math.min(1, Math.max(0, temp));
          const [r, g, b] = tempToColor(temp);
          const i = (y * canvas.width + x) * 4;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      scanLineRef.current = (scanLineRef.current + 1.5) % canvas.height;
      ctx.fillStyle = "rgba(0, 212, 255, 0.15)";
      ctx.fillRect(0, scanLineRef.current, canvas.width, 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.05)";
      ctx.fillRect(0, scanLineRef.current - 20, canvas.width, 20);

      hotSpots.forEach((hs) => {
        ctx.strokeStyle = "rgba(0, 255, 65, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(hs.x, hs.y, hs.radius + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 255, 65, 0.7)";
        ctx.font = "10px monospace";
        ctx.fillText(`T: ${(hs.intensity * 42 + 20).toFixed(1)}°C`, hs.x - 20, hs.y - hs.radius - 15);
      });

      ctx.fillStyle = "rgba(0, 212, 255, 0.85)";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "left";
      ctx.fillText("THERMAL FEED", 12, 24);

      const t = new Date().toLocaleTimeString("en-US", { hour12: false });
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      ctx.font = "12px monospace";
      ctx.fillText(t, canvas.width - 12, canvas.height - 12);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <GlowCard glowColor="#ff6b35" className="p-2 relative overflow-hidden">
      <div className="relative rounded-lg overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ aspectRatio: "16/9" }}
        />
        <div className="absolute top-3 right-3 bg-black/70 px-3 py-1.5 rounded">
          <span className="text-[#00d4ff] text-xs font-bold">
            DETECTED: 2 SURVIVORS
          </span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="flex justify-between items-center mt-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full" style={{
            background: "linear-gradient(to right, #000050, #00ff00, #ffff00, #ff0000)"
          }} />
          <span className="text-[10px] text-[#64748b]">COLD → HOT</span>
        </div>
        <span className="text-[10px] text-[#64748b]">Infrared 8-14μm</span>
      </div>
    </GlowCard>
  );
}
