"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { FloatingParticles, BackgroundOrbs, GlowingDivider } from "@/components/ai-models/AIAnimations";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";

const PathsContext = createContext<(SVGPathElement | null)[]>([]);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function FlowingDot({ delay, pathIndex }: { delay: number; pathIndex: number }) {
  const paths = useContext(PathsContext);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const offsetRef = useRef(0);

  useEffect(() => {
    const path = paths[pathIndex];
    if (!path) return;
    let raf: number;
    const update = () => {
      const len = path.getTotalLength();
      const pt = path.getPointAtLength(offsetRef.current * len);
      setPos({ x: pt.x, y: pt.y });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [pathIndex, paths]);

  useEffect(() => {
    let raf: number;
    const start = performance.now() + delay * 1000;
    const animate = (now: number) => {
      const elapsed = (now - start) / 4000;
      const t = (elapsed % 1 + 1) % 1;
      offsetRef.current = t;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [delay]);

  return <circle cx={pos.x} cy={pos.y} r={3} fill="#00d4ff" opacity={0.9} />;
}

export default function ArchitectureContent() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pathEls, setPathEls] = useState<(SVGPathElement | null)[]>([]);

  const hardwareItems = [
    { name: "FLIR Lepton 3.5", role: "Thermal Camera", specs: "640×480 • 9Hz • LWIR", color: "cyan" },
    { name: "OV5640", role: "RGB Camera", specs: "5MP • 30fps • Auto-focus", color: "cyan" },
    { name: "MAX9814", role: "Sound Sensor", specs: "20Hz–20kHz • AGC", color: "cyan" },
    { name: "MQ-135 / MQ-2 / MQ-4", role: "Gas Sensors", specs: "CO • Smoke • Methane", color: "orange" },
    { name: "MPU6050", role: "IMU (6-axis)", specs: "Accel + Gyro • 100Hz", color: "yellow" },
    { name: "DHT22", role: "Temp / Humidity", specs: "±0.5°C • ±2% RH", color: "red" },
    { name: "ESP32", role: "WiFi + BLE", specs: "240MHz • Dual-mode", color: "cyan" },
    { name: "LoRa SX1276", role: "Mesh Comms", specs: "868/915MHz • 3km range", color: "yellow" },
  ];

  const dataFlowSteps = [
    { from: "Sensors", to: "Data Acquisition", detail: "ESP32 reads all sensor data at configured intervals", icon: "📡" },
    { from: "Data Acquisition", to: "Edge Processing", detail: "Raw data sent to Raspberry Pi 4 via SPI/UART", icon: "🔌" },
    { from: "Edge Processing", to: "AI Inference", detail: "Preprocessed tensors fed into inference pipeline", icon: "🧠" },
    { from: "AI Inference", to: "Decision Engine", detail: "Aggregated predictions scored and prioritized", icon: "⚙️" },
    { from: "Decision Engine", to: "Response Actions", detail: "Dashboard • Mobile App • Rescue Alerts dispatched", icon: "🚨" },
  ];

  const commStack = [
    { link: "Robot ↔ Cloud", protocol: "MQTT over WebSocket", color: "#00d4ff" },
    { link: "Cloud ↔ Dashboard", protocol: "WebSocket (real-time)", color: "#a855f7" },
    { link: "Cloud ↔ Mobile", protocol: "REST API + FCM Push", color: "#22c55e" },
    { link: "Robot ↔ Robot", protocol: "LoRa Mesh Network", color: "#eab308" },
  ];

  const nodePositions: Record<string, { x: number; y: number }> = {};

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <GridBackground />

      {/* ───── HERO ───── */}
      <section className="relative z-10 pt-32 pb-16 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              title="System Architecture"
              subtitle="A comprehensive view of the Phoenix platform"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ───── ARCHITECTURE DIAGRAM ───── */}
      <section className="relative z-10 pb-24 px-4">
        <BackgroundOrbs colors={["#00d4ff", "#f97316", "#a855f7", "#22c55e"]} />
        <FloatingParticles count={30} color="#00d4ff" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="rounded-2xl border border-[#2a2a3e] bg-[#111118]/80 backdrop-blur-sm p-6 md:p-10 overflow-x-auto">
            <svg viewBox="0 0 1000 620" className="w-full min-w-[700px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow-cyan"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00d4ff" floodOpacity="0.6" /></filter>
                <filter id="glow-red"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.6" /></filter>
                <filter id="glow-orange"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f97316" floodOpacity="0.6" /></filter>
                <filter id="glow-yellow"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#eab308" floodOpacity="0.6" /></filter>
                <filter id="glow-purple"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a855f7" floodOpacity="0.6" /></filter>
                <filter id="glow-green"><feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.6" /></filter>
              </defs>

              {/* Layer labels */}
              <text x="500" y="30" textAnchor="middle" fill="#00d4ff" fontSize="13" fontWeight="700" letterSpacing="3" opacity="0.7">PERCEPTION LAYER</text>
              <text x="500" y="260" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="700" letterSpacing="3" opacity="0.7">PROCESSING LAYER</text>
              <text x="500" y="490" textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="700" letterSpacing="3" opacity="0.7">APPLICATION LAYER</text>

              {/* ── PERCEPTION NODES ── */}
              {[
                { id: "thermal", label: "Thermal Camera", x: 80, color: "#00d4ff", filter: "glow-cyan" },
                { id: "rgb", label: "RGB Camera", x: 230, color: "#00d4ff", filter: "glow-cyan" },
                { id: "sound", label: "Sound Sensor", x: 380, color: "#00d4ff", filter: "glow-cyan" },
                { id: "gas", label: "Gas Sensors", x: 530, color: "#f97316", filter: "glow-orange" },
                { id: "imu", label: "MPU6050 IMU", x: 680, color: "#eab308", filter: "glow-yellow" },
                { id: "temp", label: "Temp / Humidity", x: 830, color: "#ef4444", filter: "glow-red" },
              ].map((n) => {
                nodePositions[n.id] = { x: n.x + 50, y: 80 };
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHoveredNode(n.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={n.x} y="55" width="140" height="50" rx="10"
                      fill="#111118" stroke={n.color}
                      strokeWidth={hoveredNode === n.id ? 3 : 1.5}
                      filter={hoveredNode === n.id ? `url(#${n.filter})` : undefined}
                      opacity={hoveredNode && hoveredNode !== n.id ? 0.3 : 1}
                      style={{ transition: "all 0.3s ease-out" }}
                    />
                    <text x={n.x + 70} y="85" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="500">
                      {n.label}
                    </text>
                  </g>
                );
              })}

              {/* ── Connection lines: Perception → Processing ── */}
              {[150, 300, 450, 600, 750, 900].map((x1, i) => {
                const id = `pp${i}`;
                return (
                  <path
                    key={id}
                    ref={(el) => { setPathEls(prev => { const next = [...prev]; next[i] = el; return next; }); }}
                    d={`M${x1},105 C${x1},170 500,180 500,310`}
                    fill="none" stroke="#2a2a3e" strokeWidth="1"
                    strokeDasharray="6 4"
                    opacity="0.5"
                  />
                );
              })}

              {/* ── PROCESSING NODES ── */}
              {[
                { id: "thermal-ai", label: "Thermal Detection AI", x: 60, color: "#ef4444", filter: "glow-red" },
                { id: "acoustic-ai", label: "Acoustic Detection AI", x: 250, color: "#a855f7", filter: "glow-purple" },
                { id: "hazard-ai", label: "Hazard Assessment AI", x: 440, color: "#f97316", filter: "glow-orange" },
                { id: "structural-ai", label: "Structural Risk AI", x: 630, color: "#eab308", filter: "glow-yellow" },
                { id: "llm", label: "Rescue Assistant LLM", x: 820, color: "#00d4ff", filter: "glow-cyan" },
              ].map((n) => {
                nodePositions[n.id] = { x: n.x + 70, y: 340 };
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHoveredNode(n.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={n.x} y="310" width="160" height="60" rx="10"
                      fill="#111118" stroke={n.color}
                      strokeWidth={hoveredNode === n.id ? 3 : 1.5}
                      filter={hoveredNode === n.id ? `url(#${n.filter})` : undefined}
                      opacity={hoveredNode && hoveredNode !== n.id ? 0.3 : 1}
                      style={{ transition: "all 0.3s ease-out" }}
                    />
                    <text x={n.x + 80} y="345" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="500">
                      {n.label}
                    </text>
                  </g>
                );
              })}

              {/* ── Connection lines: Processing → Application ── */}
              {[140, 330, 520, 710, 900].map((x1, i) => {
                const id = `pa${i}`;
                return (
                  <path
                    key={id}
                    ref={(el) => { setPathEls(prev => { const next = [...prev]; next[i + 6] = el; return next; }); }}
                    d={`M${x1},370 C${x1},430 500,440 500,520`}
                    fill="none" stroke="#2a2a3e" strokeWidth="1"
                    strokeDasharray="6 4"
                    opacity="0.5"
                  />
                );
              })}

              {/* ── APPLICATION NODES ── */}
              {[
                { id: "dashboard", label: "Live Dashboard", x: 110, color: "#00d4ff", filter: "glow-cyan" },
                { id: "mobile", label: "Mobile App", x: 330, color: "#22c55e", filter: "glow-green" },
                { id: "alerts", label: "Rescue Alerts", x: 550, color: "#ef4444", filter: "glow-red" },
                { id: "predictions", label: "AI Predictions", x: 770, color: "#a855f7", filter: "glow-purple" },
              ].map((n) => {
                nodePositions[n.id] = { x: n.x + 70, y: 560 };
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHoveredNode(n.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={n.x} y="530" width="140" height="50" rx="10"
                      fill="#111118" stroke={n.color}
                      strokeWidth={hoveredNode === n.id ? 3 : 1.5}
                      filter={hoveredNode === n.id ? `url(#${n.filter})` : undefined}
                      opacity={hoveredNode && hoveredNode !== n.id ? 0.3 : 1}
                      style={{ transition: "all 0.3s ease-out" }}
                    />
                    <text x={n.x + 70} y="560" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="500">
                      {n.label}
                    </text>
                  </g>
                );
              })}

              {/* Animated flowing dots on first two paths */}
              <PathsContext.Provider value={pathEls}>
                <FlowingDot delay={0} pathIndex={0} />
                <FlowingDot delay={0.6} pathIndex={2} />
                <FlowingDot delay={1.2} pathIndex={4} />
              </PathsContext.Provider>
            </svg>
          </div>
        </motion.div>
      </section>

      <GlowingDivider color="#f97316" />

      {/* ───── HARDWARE COMPONENTS ───── */}
      <section className="relative z-10 pb-24 px-4">
        <FloatingParticles count={15} color="#f97316" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionHeader
              title="Hardware Components"
              subtitle="Sensor suite and processing hardware powering each rescue robot"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hardwareItems.map((item) => (
              <motion.div key={item.name} variants={fadeUp}>
                <GlowCard glowColor={item.color as "cyan" | "orange" | "yellow" | "red"}>
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: item.color === "cyan" ? "#00d4ff" : item.color === "orange" ? "#f97316" : item.color === "yellow" ? "#eab308" : "#ef4444" }}>
                      {item.role}
                    </p>
                    <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.specs}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GlowingDivider color="#a855f7" />

      {/* ───── DATA FLOW ───── */}
      <section className="relative z-10 pb-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionHeader
              title="Data Flow"
              subtitle="How sensor data travels from perception to life-saving action"
            />
          </motion.div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#a855f7] to-[#22c55e] opacity-30" />

            <div className="space-y-0">
              {dataFlowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative pl-16 md:pl-20 py-6"
                >
                  {/* Step number dot */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-3 md:left-5 top-6 w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xs z-10"
                    style={{ boxShadow: "0 0 15px rgba(0,212,255,0.4)" }}
                  >
                    {i + 1}
                  </motion.div>

                  <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/70 backdrop-blur-sm p-5 hover:border-[#00d4ff]/40 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{step.icon}</span>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[#00d4ff] font-semibold">{step.from}</span>
                        <svg width="20" height="10" viewBox="0 0 20 10" className="text-[#2a2a3e]">
                          <line x1="0" y1="5" x2="16" y2="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                          <polygon points="14,1 20,5 14,9" fill="#00d4ff" opacity="0.6" />
                        </svg>
                        <span className="text-[#a855f7] font-semibold">{step.to}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <GlowingDivider color="#22c55e" />

      {/* ───── COMMUNICATION ARCHITECTURE ───── */}
      <section className="relative z-10 pb-32 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionHeader
              title="Communication Architecture"
              subtitle="Network protocols connecting robots, cloud, and end-users"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commStack.map((c, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/70 backdrop-blur-sm p-6 flex items-center gap-5 hover:border-[color:var(--accent)] transition-colors duration-300"
                  style={{ ["--accent" as string]: c.color }}
                >
                  {/* Animated pulse dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color, opacity: 0.8 }} />
                    <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping" style={{ backgroundColor: c.color, opacity: 0.3 }} />
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{c.link}</p>
                    <p className="text-gray-400 text-xs font-mono tracking-wide">{c.protocol}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Network topology mini-diagram */}
          <motion.div variants={fadeUp} className="mt-10">
            <div className="rounded-xl border border-[#2a2a3e] bg-[#111118]/60 backdrop-blur-sm p-6">
              <svg viewBox="0 0 800 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
                {/* Robot nodes */}
                {[80, 200, 320].map((x, i) => (
                  <g key={`r${i}`}>
                    <rect x={x - 30} y="60" width="60" height="40" rx="8" fill="#111118" stroke="#00d4ff" strokeWidth="1.5" />
                    <text x={x} y="85" textAnchor="middle" fill="#00d4ff" fontSize="9" fontWeight="600">ROBOT {i + 1}</text>
                  </g>
                ))}

                {/* LoRa mesh lines */}
                <line x1="110" y1="80" x2="170" y2="80" stroke="#eab308" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                <line x1="230" y1="80" x2="290" y2="80" stroke="#eab308" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />

                {/* Cloud node */}
                <rect x="460" y="50" width="100" height="60" rx="12" fill="#111118" stroke="#a855f7" strokeWidth="1.5" />
                <text x="510" y="85" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="700">CLOUD</text>

                {/* Robot → Cloud MQTT line */}
                <line x1="350" y1="80" x2="460" y2="80" stroke="#00d4ff" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
                <text x="405" y="75" textAnchor="middle" fill="#00d4ff" fontSize="7" opacity="0.6">MQTT</text>

                {/* Dashboard */}
                <rect x="640" y="30" width="100" height="35" rx="8" fill="#111118" stroke="#00d4ff" strokeWidth="1.5" />
                <text x="690" y="52" textAnchor="middle" fill="#00d4ff" fontSize="9" fontWeight="600">DASHBOARD</text>
                <line x1="560" y1="65" x2="640" y2="50" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                <text x="598" y="50" fill="#a855f7" fontSize="7" opacity="0.6">WS</text>

                {/* Mobile */}
                <rect x="640" y="95" width="100" height="35" rx="8" fill="#111118" stroke="#22c55e" strokeWidth="1.5" />
                <text x="690" y="117" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="600">MOBILE APP</text>
                <line x1="560" y1="95" x2="640" y2="110" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                <text x="598" y="110" fill="#22c55e" fontSize="7" opacity="0.6">REST+FCM</text>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
