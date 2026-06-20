"use client";

import { useEffect, useRef } from "react";

interface HolographicGlobeProps {
  lat: number;
  lng: number;
  label: string;
}

// Simplified continent outlines as [lat, lng][] in degrees
const continents: [number, number][][] = [
  // Africa
  [[37,-10],[36,0],[33,12],[30,15],[22,18],[12,20],[5,25],[0,30],[-5,28],[-10,25],[-15,22],[-20,20],[-25,18],[-30,15],[-35,18],[-35,20],[-30,30],[-25,35],[-20,40],[-15,42],[-10,40],[0,42],[5,40],[10,42],[15,40],[20,38],[25,35],[30,32],[32,30],[35,25],[37,20],[37,10]],
  // Europe
  [[36,-5],[38,-8],[40,-8],[43,-8],[45,-5],[48,-5],[50,-3],[52,0],[55,0],[58,5],[60,5],[62,10],[65,12],[70,20],[70,25],[68,30],[65,35],[60,35],[55,30],[52,30],[50,28],[48,25],[45,25],[42,28],[40,25],[38,22],[36,20],[35,15],[36,10],[36,5]],
  // Asia (simplified)
  [[42,28],[45,28],[48,30],[50,30],[52,35],[55,38],[58,40],[60,45],[62,50],[65,55],[65,60],[68,65],[70,70],[70,80],[68,90],[65,100],[60,110],[55,120],[50,130],[45,135],[40,135],[35,130],[30,125],[25,120],[22,115],[20,110],[18,105],[15,100],[12,98],[10,95],[8,90],[8,85],[10,80],[12,75],[15,72],[18,68],[20,65],[22,62],[25,60],[28,58],[30,55],[35,50],[38,48],[40,45],[40,40],[42,35],[42,30]],
  // North America
  [[60,-140],[62,-130],[65,-125],[68,-120],[70,-115],[70,-100],[68,-95],[65,-85],[60,-80],[55,-75],[50,-70],[48,-68],[45,-65],[42,-65],[40,-70],[35,-75],[30,-80],[25,-82],[22,-85],[20,-88],[15,-90],[18,-95],[20,-100],[22,-105],[25,-108],[28,-110],[30,-115],[32,-117],[35,-120],[40,-125],[45,-128],[48,-130],[50,-135],[55,-140],[60,-140]],
  // South America
  [[10,-75],[8,-70],[5,-65],[3,-60],[0,-55],[-5,-50],[-10,-48],[-15,-45],[-20,-45],[-25,-48],[-30,-50],[-35,-52],[-40,-55],[-42,-58],[-40,-60],[-35,-65],[-30,-68],[-25,-70],[-20,-72],[-15,-75],[-10,-78],[-5,-80],[0,-78],[5,-77],[10,-75]],
  // Australia
  [[-12,130],[-14,135],[-18,140],[-22,145],[-25,148],[-28,150],[-30,150],[-33,145],[-35,140],[-35,135],[-33,130],[-30,128],[-28,125],[-25,122],[-22,120],[-18,118],[-15,120],[-12,125]],
];

function latLngTo3D(lat: number, lng: number, r: number): [number, number, number] {
  const φ = (lat * Math.PI) / 180;
  const λ = (lng * Math.PI) / 180;
  return [
    r * Math.cos(φ) * Math.cos(λ),
    r * Math.sin(φ),
    r * Math.cos(φ) * Math.sin(λ),
  ];
}

function project3D(
  [x, y, z]: [number, number, number],
  rotationY: number,
  cx: number, cy: number, scale: number
): { px: number; py: number; z: number } | null {
  // Rotate around Y
  const cosR = Math.cos(rotationY);
  const sinR = Math.sin(rotationY);
  const rx = x * cosR + z * sinR;
  const ry = y;
  const rz = -x * sinR + z * cosR;

  if (rz > 0) return null; // back face culling for land

  const perspective = 3;
  const px = cx + (rx * perspective) / (perspective - rz) * scale;
  const py = cy - (ry * perspective) / (perspective - rz) * scale;
  return { px, py, z: rz };
}

export default function HolographicGlobe({ lat, lng, label }: HolographicGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 260;
    const h = 260;
    canvas.width = w * 2;
    canvas.height = h * 2;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    let animId: number;
    const draw = () => {
      const time = Date.now();
      const rotationY = time * 0.0003;
      const cx = w;
      const cy = h;
      const r = 80;
      const scale = 1.2;

      ctx.save();
      ctx.scale(1, 1);
      ctx.clearRect(0, 0, w * 2, h * 2);

      // ── Atmosphere glow ──
      const grad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * 1.4);
      grad.addColorStop(0, "rgba(0,212,255,0.03)");
      grad.addColorStop(0.6, "rgba(0,212,255,0.02)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // ── Globe outline ──
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // ── Grid (lat/lng lines) ──
      ctx.strokeStyle = "rgba(0,212,255,0.07)";
      ctx.lineWidth = 0.3;
      for (let latG = -60; latG <= 60; latG += 30) {
        ctx.beginPath();
        let first = true;
        for (let lngG = 0; lngG <= 360; lngG += 2) {
          const p = project3D(latLngTo3D(latG, lngG, r), rotationY, cx, cy, scale);
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
          first = false;
        }
        ctx.stroke();
      }
      for (let lngG = -150; lngG <= 180; lngG += 30) {
        ctx.beginPath();
        let first = true;
        for (let latG = -90; latG <= 90; latG += 2) {
          const p = project3D(latLngTo3D(latG, lngG, r), rotationY, cx, cy, scale);
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
          first = false;
        }
        ctx.stroke();
      }

      // ── Continents ──
      continents.forEach((polygon) => {
        ctx.beginPath();
        let first = true;
        for (const [plat, plng] of polygon) {
          const p = project3D(latLngTo3D(plat, plng, r * 0.98), rotationY, cx, cy, scale);
          if (!p) { first = true; continue; }
          first ? ctx.moveTo(p.px, p.py) : ctx.lineTo(p.px, p.py);
          first = false;
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(0,212,255,0.12)";
        ctx.fill();
        ctx.strokeStyle = "rgba(0,212,255,0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ── Robot position marker ──
      const pos = project3D(latLngTo3D(lat, lng, r * 0.98), rotationY, cx, cy, scale);
      if (pos) {
        // Outer rings
        const ringR = 6 + Math.sin(time / 400) * 3;
        ctx.strokeStyle = "rgba(0,212,255,0.2)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(pos.px, pos.py, ringR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(0,212,255,0.08)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(pos.px, pos.py, ringR * 2, 0, Math.PI * 2);
        ctx.stroke();

        // Dot
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#00d4ff";
        ctx.beginPath();
        ctx.arc(pos.px, pos.py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        const lbl = label;
        ctx.font = "8px monospace";
        const tw = ctx.measureText(lbl).width;
        ctx.fillRect(pos.px - tw / 2 - 3, pos.py + 8, tw + 6, 12);
        ctx.fillStyle = "rgba(0,212,255,0.6)";
        ctx.textAlign = "center";
        ctx.fillText(lbl, pos.px, pos.py + 17);
      }

      // ── Orbit ring (elliptical) ──
      ctx.strokeStyle = "rgba(0,212,255,0.06)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.5, r * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [lat, lng, label]);

  return (
    <div className="relative rounded-xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ aspectRatio: "1/1" }}
      />
      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded">
        <span className="text-[8px] text-[#00d4ff] font-mono">GLOBAL POSITION</span>
      </div>
    </div>
  );
}
