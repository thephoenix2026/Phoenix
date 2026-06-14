"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";

export default function CameraFeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flicker, setFlicker] = useState(false);

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
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 25;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      ctx.fillStyle = "rgba(0, 212, 255, 0.03)";
      for (let i = 0; i < 3; i++) {
        const y = Math.random() * canvas.height;
        ctx.fillRect(0, y, canvas.width, 1);
      }

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

      ctx.fillStyle = "rgba(0, 212, 255, 0.85)";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "left";
      ctx.fillText("CAMERA FEED - SECTOR 3", 12, 24);

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
  }, []);

  return (
    <GlowCard glowColor="#00d4ff" className="p-2 relative overflow-hidden">
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
        Camera Feed • 1080p • 30fps
      </p>
    </GlowCard>
  );
}
