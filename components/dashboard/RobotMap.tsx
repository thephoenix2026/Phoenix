"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";
import type { Robot } from "@/lib/data/robots";

interface RobotMapProps {
  robot: Robot;
  allRobots: Robot[];
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return h >>> 0;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) | 0; return (s >>> 0) / 4294967296; };
}

function drawTerrain(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  env: string,
  seed: number,
  weather: string,
  time: number
) {
  const rng = seededRandom(seed);
  const isUrban = env.toLowerCase().includes("urban");
  const isIndustrial = env.toLowerCase().includes("industrial") || env.toLowerCase().includes("chemical");
  const isEarthquake = env.toLowerCase().includes("earthquake") || env.toLowerCase().includes("collapse");
  const isCoastal = env.toLowerCase().includes("coastal") || env.toLowerCase().includes("flood");

  // ── Base terrain ──
  if (isCoastal) {
    // Water base
    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, w, h);
    // Shoreline landmass
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    ctx.quadraticCurveTo(w * 0.2, h * 0.45, w * 0.35, h * 0.5);
    ctx.quadraticCurveTo(w * 0.5, h * 0.42, w * 0.65, h * 0.48);
    ctx.quadraticCurveTo(w * 0.8, h * 0.52, w, h * 0.47);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, h * 0.4, 0, h);
    grad.addColorStop(0, "#1a3a2a");
    grad.addColorStop(0.3, "#2d5a3e");
    grad.addColorStop(1, "#3a2a1a");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
    // Shallow water near shore
    ctx.fillStyle = "rgba(10,30,60,0.3)";
    for (let i = 0; i < 15; i++) {
      const x = rng() * w;
      const y = h * 0.3 + rng() * h * 0.25;
      ctx.beginPath();
      ctx.arc(x, y, 5 + rng() * 15, 0, Math.PI * 2);
      ctx.fill();
    }
    // Deep water patches
    ctx.fillStyle = "rgba(5,10,25,0.4)";
    for (let i = 0; i < 20; i++) {
      const x = rng() * w;
      const y = rng() * h * 0.45;
      ctx.beginPath();
      ctx.arc(x, y, 8 + rng() * 20, 0, Math.PI * 2);
      ctx.fill();
    }
    // Wave lines
    ctx.strokeStyle = "rgba(0,180,255,0.04)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      const wy = rng() * h * 0.4 + h * 0.05;
      for (let x = 0; x < w; x += 3) {
        ctx.lineTo(x, wy + Math.sin((x + time * 30) * 0.03 + i) * 3);
      }
      ctx.stroke();
    }
  } else if (isEarthquake) {
    // Rubble base
    ctx.fillStyle = "#1a1510";
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.7);
    grad.addColorStop(0, "#2a2015");
    grad.addColorStop(0.5, "#1e1812");
    grad.addColorStop(1, "#14100a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // Cracks
    ctx.strokeStyle = "rgba(50,40,30,0.3)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      let cx = rng() * w;
      let cy = rng() * h;
      ctx.moveTo(cx, cy);
      for (let j = 0; j < 6; j++) {
        cx += (rng() - 0.5) * 60;
        cy += (rng() - 0.5) * 40;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
    // Debris piles
    ctx.fillStyle = "rgba(60,50,40,0.15)";
    for (let i = 0; i < 12; i++) {
      const x = rng() * w;
      const y = rng() * h;
      ctx.beginPath();
      ctx.ellipse(x, y, 8 + rng() * 20, 4 + rng() * 8, rng() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (isIndustrial) {
    // Industrial base
    ctx.fillStyle = "#12100e";
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, w * 0.8);
    grad.addColorStop(0, "rgba(255,80,20,0.06)");
    grad.addColorStop(0.5, "rgba(200,60,10,0.03)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // Concrete pads
    ctx.fillStyle = "rgba(40,40,40,0.2)";
    for (let i = 0; i < 6; i++) {
      const x = 30 + rng() * (w - 60);
      const y = 30 + rng() * (h - 60);
      ctx.fillRect(x, y, 30 + rng() * 50, 20 + rng() * 30);
    }
  } else {
    // Urban base
    ctx.fillStyle = "#141210";
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createRadialGradient(w * 0.4, h * 0.4, 0, w * 0.4, h * 0.4, w * 0.7);
    grad.addColorStop(0, "rgba(60,55,50,0.08)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // ── Buildings (for urban/industrial/earthquake) ──
  if (!isCoastal) {
    const buildingColor = isIndustrial ? "rgba(60,55,50," : "rgba(50,48,45,";
    ctx.fillStyle = `${buildingColor}0.3)`;
    ctx.strokeStyle = `${buildingColor}0.5)`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 20; i++) {
      const bw = 6 + rng() * 18;
      const bh = 6 + rng() * 14;
      const bx = 10 + rng() * (w - bw - 20);
      const by = 10 + rng() * (h - bh - 20);
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(bx + 1, by + 1, bw, bh);
      ctx.fillStyle = `${buildingColor}0.3)`;
    }
    // Taller buildings
    ctx.fillStyle = `${buildingColor}0.2)`;
    ctx.strokeStyle = `${buildingColor}0.4)`;
    for (let i = 0; i < 4; i++) {
      const bw = 8 + rng() * 12;
      const bh = 25 + rng() * 20;
      const bx = 30 + rng() * (w - 80);
      const by = 20 + rng() * (h - bh - 30);
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);
    }
  } else {
    // Flooded buildings
    ctx.fillStyle = "rgba(50,48,45,0.2)";
    ctx.strokeStyle = "rgba(50,48,45,0.3)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 10; i++) {
      const bw = 8 + rng() * 14;
      const bh = 6 + rng() * 10;
      const bx = rng() * (w - 30);
      const by = h * 0.45 + rng() * (h * 0.45);
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeRect(bx, by, bw, bh);
    }
  }

  // ── Roads ──
  ctx.strokeStyle = "rgba(60,55,50,0.15)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    if (rng() > 0.5) {
      ctx.moveTo(rng() * w, 0);
      ctx.lineTo(rng() * w, h);
    } else {
      ctx.moveTo(0, rng() * h);
      ctx.lineTo(w, rng() * h);
    }
    ctx.stroke();
  }

  // ── Vegetation patches ──
  ctx.fillStyle = "rgba(30,60,30,0.08)";
  for (let i = 0; i < 8; i++) {
    const x = rng() * w;
    const y = rng() * h;
    ctx.beginPath();
    ctx.arc(x, y, 8 + rng() * 18, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawRadarSweep(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.save();
  ctx.translate(w / 2, h / 2);
  const angle = (time * 0.0008) % (Math.PI * 2);
  // Wedge
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, w * 0.6, angle - 0.3, angle + 0.3);
  ctx.closePath();
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.6);
  grad.addColorStop(0, "rgba(0,212,255,0.04)");
  grad.addColorStop(1, "rgba(0,212,255,0.01)");
  ctx.fillStyle = grad;
  ctx.fill();
  // Sweep line
  ctx.strokeStyle = "rgba(0,212,255,0.12)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(angle) * w * 0.6, Math.sin(angle) * w * 0.6);
  ctx.stroke();
  ctx.restore();
}

function drawWeatherOverlay(ctx: CanvasRenderingContext2D, w: number, h: number, weather: string, time: number) {
  if (weather === "fog") {
    const fog = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.8);
    fog.addColorStop(0, "rgba(200,200,210,0.08)");
    fog.addColorStop(0.5, "rgba(180,180,200,0.05)");
    fog.addColorStop(1, "rgba(160,160,180,0.02)");
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, w, h);
  }
  if (weather === "rain" || weather === "storm") {
    ctx.strokeStyle = `rgba(100,150,255,${weather === "storm" ? 0.07 : 0.04})`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < (weather === "storm" ? 80 : 40); i++) {
      const rx = ((i * 137 + time * 0.05) % (w + 40)) - 20;
      const ry = ((i * 97 + time * 0.15) % (h + 40)) - 20;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 3, ry + 10);
      ctx.stroke();
    }
  }
  if (weather === "night") {
    ctx.fillStyle = `rgba(0,0,15,${0.15 + Math.sin(time * 0.001) * 0.02})`;
    ctx.fillRect(0, 0, w, h);
    // Stars
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137) % w);
      const sy = ((i * 97) % h);
      ctx.beginPath();
      ctx.arc(sx, sy, 0.3 + ((i * 7) % 3) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (weather === "sandstorm") {
    ctx.fillStyle = `rgba(200,170,100,${0.06 + Math.sin(time * 0.002) * 0.02})`;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(200,180,120,0.06)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 151 + time * 0.08) % (w + 30)) - 15;
      const sy = ((i * 109 + time * 0.04) % h);
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + 8, sy - 2);
      ctx.stroke();
    }
  }
}

export default function RobotMap({ robot, allRobots }: RobotMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 540;
    const h = 380;
    canvas.width = w;
    canvas.height = h;

    const seed = hashStr(robot.id);

    let animId: number;
    const draw = () => {
      const time = Date.now();

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);

      // 1. Terrain
      drawTerrain(ctx, w, h, robot.environment, seed, robot.defaultWeather, time);

      // 2. Grid lines
      ctx.strokeStyle = "rgba(0, 212, 255, 0.06)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < w; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let i = 0; i < h; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
      }

      // 3. Distance rings
      ctx.strokeStyle = "rgba(0, 212, 255, 0.08)";
      ctx.lineWidth = 0.5;
      [40, 80, 120, 160, 200].forEach((r) => {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 4. Sector boundary (dashed polygon)
      const rng = seededRandom(seed + 999);
      ctx.strokeStyle = `${robot.color}30`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      const cx = w / 2 + (rng() - 0.5) * 40;
      const cy = h / 2 + (rng() - 0.5) * 30;
      const rr = 100 + rng() * 60;
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const s = 0.7 + rng() * 0.6;
        const px = cx + Math.cos(a) * rr * s;
        const py = cy + Math.sin(a) * rr * s;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      // 5. Weather overlay
      drawWeatherOverlay(ctx, w, h, robot.defaultWeather, time);

      // 6. Radar sweep
      drawRadarSweep(ctx, w, h, time);

      // 7. Robot markers
      allRobots.forEach((r, index) => {
        const rng2 = seededRandom(hashStr(r.id));
        const angle = (index / allRobots.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 65 + index * 25;
        const mx = w / 2 + (Math.cos(angle) * radius + (rng2() - 0.5) * 30);
        const my = h / 2 + (Math.sin(angle) * radius + (rng2() - 0.5) * 25);

        const isSelected = r.id === robot.id;

        // Connection line to HQ
        ctx.strokeStyle = isSelected
          ? `rgba(0, 212, 255, 0.15)`
          : `rgba(100, 116, 139, 0.08)`;
        ctx.lineWidth = isSelected ? 1 : 0.5;
        ctx.setLineDash(isSelected ? [] : [3, 4]);
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2);
        ctx.lineTo(mx, my);
        ctx.stroke();
        ctx.setLineDash([]);

        // Data pulse along line (selected)
        if (isSelected) {
          const pulsePos = ((time * 0.002) % 1);
          ctx.fillStyle = "rgba(0,212,255,0.5)";
          ctx.beginPath();
          const px = w / 2 + (mx - w / 2) * pulsePos;
          const py = h / 2 + (my - h / 2) * pulsePos;
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Pulse ring
        if (isSelected) {
          ctx.strokeStyle = `rgba(0, 212, 255, 0.12)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(mx, my, 16 + Math.sin(time / 500) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Direction arrow
        const dirAngle = time * 0.0005 + index;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(dirAngle);
        ctx.strokeStyle = isSelected ? "#00d4ff" : r.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(4, -3);
        ctx.lineTo(0, -1);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fillStyle = isSelected ? "#00d4ff" : r.color;
        ctx.fill();
        ctx.restore();

        // Robot marker
        ctx.fillStyle = isSelected ? "#00d4ff" : r.color;
        ctx.shadowColor = isSelected ? "#00d4ff" : r.color;
        ctx.shadowBlur = isSelected ? 18 : 6;
        ctx.beginPath();
        ctx.arc(mx, my, isSelected ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label background
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        const txt = r.codename;
        ctx.font = `${isSelected ? "bold " : ""}8px monospace`;
        const tw = ctx.measureText(txt).width;
        ctx.fillRect(mx - tw / 2 - 3, my + 10, tw + 6, 12);
        ctx.strokeStyle = isSelected ? "rgba(0,212,255,0.2)" : "rgba(100,116,139,0.15)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(mx - tw / 2 - 3, my + 10, tw + 6, 12);

        // Label
        ctx.fillStyle = isSelected ? "#00d4ff" : "#64748b";
        ctx.textAlign = "center";
        ctx.fillText(txt, mx, my + 19);
      });

      // 8. HQ marker
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur = 25;
      ctx.fillStyle = "#00d4ff";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // HQ label bg
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(w / 2 - 18, h / 2 - 20, 36, 14);
      ctx.strokeStyle = "rgba(0,212,255,0.2)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(w / 2 - 18, h / 2 - 20, 36, 14);
      ctx.fillStyle = "#00d4ff";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "center";
      ctx.fillText("COMMAND", w / 2, h / 2 - 10);

      // 9. Compass rose
      ctx.save();
      ctx.translate(w - 40, 35);
      ctx.strokeStyle = "rgba(0,212,255,0.2)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(0,212,255,0.3)";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("N", 0, -8);
      ctx.fillStyle = "rgba(100,116,139,0.2)";
      ctx.fillText("S", 0, 11);
      ctx.fillText("E", 9, 2);
      ctx.fillText("W", -9, 2);
      ctx.restore();

      // 10. Scale bar
      ctx.fillStyle = "rgba(0,212,255,0.15)";
      ctx.fillRect(20, h - 20, 50, 2);
      ctx.fillRect(20, h - 24, 2, 10);
      ctx.fillRect(68, h - 24, 2, 10);
      ctx.fillStyle = "rgba(0,212,255,0.3)";
      ctx.font = "7px monospace";
      ctx.textAlign = "center";
      ctx.fillText("100m", 45, h - 8);

      // 11. Top-left overlay label
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(8, 8, 110, 14);
      ctx.fillStyle = "rgba(0,212,255,0.5)";
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillText("SATELLITE IMAGERY", 12, 18);

      // 12. Coordinates label
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(w - 105, 8, 98, 14);
      ctx.fillStyle = "rgba(100,116,139,0.5)";
      ctx.font = "8px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`${robot.coordinates.lat}°N ${robot.coordinates.lng}°E`, w - 10, 18);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [robot, allRobots]);

  return (
    <GlowCard glowColor="#00d4ff" className="p-2">
      <div className="relative rounded-lg overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ aspectRatio: "540/380" }}
        />
      </div>
    </GlowCard>
  );
}
