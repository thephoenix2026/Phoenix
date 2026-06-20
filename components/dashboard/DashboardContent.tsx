"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import LoginScreen from "./LoginScreen";
import RobotSelector from "./RobotSelector";
import RobotStatusBar from "./RobotStatusBar";
import MissionBriefing from "./MissionBriefing";
import RobotMap from "./RobotMap";
import CameraFeed from "./CameraFeed";
import ThermalFeed from "./ThermalFeed";
import SensorPanel from "./SensorPanel";
import AIOutputs from "./AIOutputs";
import AlertSystem from "./AlertSystem";
import CommLog from "./CommLog";
import CommunicationPanel from "./CommunicationPanel";
import RescueSimulator from "@/components/interactive/RescueSimulator";
import MissionTimeline from "./MissionTimeline";
import WeatherPanel from "./WeatherPanel";
import VoiceEcho from "./VoiceEcho";
import SurvivorBoard from "./SurvivorBoard";
import HolographicGlobe from "./HolographicGlobe";
import AnalystDashboard from "./AnalystDashboard";
import { useVoiceCommands } from "@/hooks/useVoiceCommands";
import { useBroadcastSync } from "@/hooks/useBroadcastSync";
import { robots, type Robot } from "@/lib/data/robots";
import type { BroadcastMessage } from "@/hooks/useBroadcastSync";

interface Session {
  username: string;
  role: string;
  clearance: string;
}

export function DashboardContent() {
  const [session, setSession] = useState<Session | null>(null);
  const [selectedRobotId, setSelectedRobotId] = useState<string>(robots[0].id);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState(0);
  const [showCommLog, setShowCommLog] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [showCommsPanel, setShowCommsPanel] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);
  const [echoMessage, setEchoMessage] = useState<{ transcript: string; action: string } | null>(null);
  const prevAlertsRef = useRef(0);

  const selectedRobot: Robot = robots.find((r) => r.id === selectedRobotId) || robots[0];
  const broadcastSendRef = useRef<BroadcastMessage | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour12: false }) +
          "." +
          String(now.getMilliseconds()).padStart(3, "0")
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate((prev) => (prev >= 30 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectRobot = useCallback((id: string) => {
    setSelectedRobotId(id);
    broadcastSendRef.current = { type: "SELECT_ROBOT", value: id };
  }, []);

  const handleToggleMap = useCallback((show: boolean) => {
    setShowMap(show);
    broadcastSendRef.current = { type: "TOGGLE_MAP", value: show };
  }, []);

  const handleToggleLog = useCallback((show: boolean) => {
    setShowCommLog(show);
    broadcastSendRef.current = { type: "TOGGLE_LOG", value: show };
  }, []);

  const handleToggleRadio = useCallback((show: boolean) => {
    setShowCommsPanel(show);
    broadcastSendRef.current = { type: "TOGGLE_RADIO", value: show };
  }, []);

  const handleDisconnect = useCallback(() => {
    setSession(null);
  }, []);

  const handleStartMission = useCallback(() => {
    setShowTimeline(true);
  }, []);

  const { startListening, stopListening } = useVoiceCommands({
    onSelectRobot: (codename) => {
      const robot = robots.find((r) => r.codename === codename);
      if (robot) handleSelectRobot(robot.id);
    },
    onToggleMap: handleToggleMap,
    onToggleLog: handleToggleLog,
    onToggleRadio: handleToggleRadio,
    onDisconnect: handleDisconnect,
    onStartMission: handleStartMission,
    onResetMission: () => setShowTimeline(false),
    onCommandHeard: (transcript, action) => setEchoMessage({ transcript, action }),
  });

  // Siren effect: watch for critical/emergency alerts
  useEffect(() => {
    const hasCritical = selectedRobot.alerts.some(
      (a) => a.type === "critical"
    );
    const prevCount = prevAlertsRef.current;
    prevAlertsRef.current = selectedRobot.alerts.length;

    if (hasCritical && selectedRobot.alerts.length > prevCount) {
      setSirenActive(true);

      // Flash tab title
      const origTitle = document.title;
      document.title = "🚨 CRITICAL ALERT — Phoenix Mission Control";
      const titleTimer = setInterval(() => {
        document.title = document.title === origTitle
          ? "🚨 CRITICAL ALERT — Phoenix Mission Control"
          : origTitle;
      }, 1000);

      // Siren audio via Web Audio API
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sawtooth";
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.35);
        osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.7);
        osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 1.05);
        osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
      } catch {}

      setTimeout(() => {
        setSirenActive(false);
        document.title = origTitle;
        clearInterval(titleTimer);
      }, 4000);
    }
  }, [selectedRobot.alerts, selectedRobot.id]);

  useBroadcastSync(broadcastSendRef, {
    onSelectRobot: (id) => setSelectedRobotId(id),
    onToggleMap: (show) => setShowMap(show),
    onToggleLog: (show) => setShowCommLog(show),
    onToggleRadio: (show) => setShowCommsPanel(show),
  });

  const toggleVoice = () => {
    if (voiceActive) {
      stopListening();
      setVoiceActive(false);
    } else {
      startListening();
      setVoiceActive(true);
    }
  };

  const handleLogin = (username: string, role: string, clearance: string) => {
    setSession({ username, role, clearance });
  };

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (session.username === "analyst") {
    return <AnalystDashboard session={session} />;
  }

  return (
    <section
      className={`min-h-screen bg-[#0a0a0f] relative overflow-hidden transition-all duration-500 ${
        sirenActive ? "siren-active" : ""
      }`}
      style={{
        boxShadow: sirenActive
          ? "inset 0 0 80px rgba(239,68,68,0.15), inset 0 0 160px rgba(239,68,68,0.08)"
          : "none",
      }}
    >
      {sirenActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            border: "4px solid rgba(239,68,68,0.4)",
            borderRadius: "0",
          }}
          animate={{
            borderColor: [
              "rgba(239,68,68,0.4)",
              "rgba(239,68,68,0.1)",
              "rgba(239,68,68,0.4)",
            ],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
      {sirenActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239,68,68,0.03) 10px, rgba(239,68,68,0.03) 20px)",
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <SectionHeader
            title="PHOENIX MISSION CONTROL"
            subtitle="Real-time multi-robot disaster rescue monitoring and AI-assisted decision support"
            badge="Live Operations"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-mono border transition-all ${
                voiceActive
                  ? "bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                  : "bg-[#111118]/80 border-[#2a2a3e] text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${voiceActive ? "bg-green-500 animate-pulse" : "bg-[#475569]"}`} />
              {voiceActive ? "VOICE ON" : "VOICE"}
            </button>
            <div className="bg-[#111118]/80 border border-[#2a2a3e] rounded-lg px-3 py-2">
              <p className="text-[10px] text-[#64748b] font-mono uppercase">{session.role}</p>
              <p className="text-xs text-[#00d4ff] font-mono">{session.username.toUpperCase()}</p>
            </div>
            <button
              onClick={handleDisconnect}
              className="bg-[#111118]/80 border border-[#2a2a3e] hover:border-red-500/50 text-[#64748b] hover:text-red-400 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-300"
            >
              DISCONNECT
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#111118]/80 border border-[#2a2a3e] mb-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <RobotStatusBar
              robots={robots}
              selectedId={selectedRobotId}
              onSelect={handleSelectRobot}
            />
            <div className="hidden sm:block w-px h-6 bg-[#2a2a3e]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">SYS: ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              <span className="text-sm text-[#00d4ff] font-medium">AI: RUNNING</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#2a2a3e]" />
            <WeatherPanel condition={selectedRobot.defaultWeather} />
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            <div className="text-white font-mono tabular-nums">{currentTime}</div>
            <div className="text-[#64748b]">
              Update: <span className="text-[#00d4ff]">{lastUpdate}s</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleMap(!showMap)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                  showMap ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "bg-[#1a1a2e] text-[#475569]"
                }`}
              >
                MAP
              </button>
              <button
                onClick={() => handleToggleLog(!showCommLog)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                  showCommLog ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "bg-[#1a1a2e] text-[#475569]"
                }`}
              >
                LOG
              </button>
              <button
                onClick={() => handleToggleRadio(!showCommsPanel)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-colors ${
                  showCommsPanel ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "bg-[#1a1a2e] text-[#475569]"
                }`}
              >
                RADIO
              </button>
              <div className="w-px h-4 bg-[#2a2a3e]" />
              <button
                onClick={() => setShowTimeline(true)}
                className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              >
                REPLAY
              </button>
            </div>
          </div>
        </motion.div>

        {/* Robot Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <RobotSelector
            robots={robots}
            selectedId={selectedRobotId}
            onSelect={handleSelectRobot}
          />
        </motion.div>

        {/* Mission Briefing + Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRobot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MissionBriefing robot={selectedRobot} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={showMap ? "flex flex-col gap-4" : "hidden"}>
            <RobotMap robot={selectedRobot} allRobots={robots} />
            <HolographicGlobe
              lat={selectedRobot.coordinates.lat}
              lng={selectedRobot.coordinates.lng}
              label={selectedRobot.codename}
            />
          </div>
        </div>

        {/* Camera + Thermal + Sensors Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`cam-${selectedRobot.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CameraFeed
                robotName={selectedRobot.name}
                robotCodename={selectedRobot.codename}
                sectorLabel={selectedRobot.sectorLabel}
                color={selectedRobot.color}
                weather={selectedRobot.defaultWeather}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`thermal-${selectedRobot.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ThermalFeed
                robotCodename={selectedRobot.codename}
                sectorLabel={selectedRobot.sectorLabel}
                survivorsFound={selectedRobot.survivorsFound}
                color={selectedRobot.color}
                weather={selectedRobot.defaultWeather}
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`sensor-${selectedRobot.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SensorPanel
                sensors={selectedRobot.sensors}
                robotCodename={selectedRobot.codename}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI Outputs */}
        <div className="mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`ai-${selectedRobot.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AIOutputs
                outputs={selectedRobot.aiOutputs}
                robotCodename={selectedRobot.codename}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Comm Log + Communication Panel Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className={showCommLog ? "block" : "hidden"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`comm-${selectedRobot.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CommLog robot={selectedRobot} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={`${showCommLog && showCommsPanel ? "lg:col-span-2" : "lg:col-span-3"} ${showCommsPanel ? "block" : "hidden"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`comms-${selectedRobot.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CommunicationPanel robot={selectedRobot} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Alerts + Survivors + Simulator Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <RescueSimulator />
          </div>
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`alert-${selectedRobot.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertSystem
                  alerts={selectedRobot.alerts}
                  robotCodename={selectedRobot.codename}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={`survivor-${selectedRobot.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <SurvivorBoard
                  survivorsFound={selectedRobot.survivorsFound}
                  robotCodename={selectedRobot.codename}
                  seed={selectedRobot.id.charCodeAt(4) * 1000 + selectedRobot.id.charCodeAt(5)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Voice Command Echo */}
      <VoiceEcho message={echoMessage} />

      {/* Mission Timeline Overlay */}
      <AnimatePresence>
        {showTimeline && (
          <MissionTimeline
            robot={selectedRobot}
            onClose={() => setShowTimeline(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
