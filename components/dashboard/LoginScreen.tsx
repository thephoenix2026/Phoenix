"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { users } from "@/lib/data/robots";

interface LoginScreenProps {
  onLogin: (username: string, role: string, clearance: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "PHOENIX>SYS::>_";
    const fontSize = 12;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00d4ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("ACCESS DENIED — Credentials required");
      return;
    }

    const user = users.find(
      (u) => u.username === username.toLowerCase() && u.password === password
    );

    if (!user) {
      setError("ACCESS DENIED — Invalid credentials");
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      onLogin(user.username, user.role, user.clearance);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.05)_0%,transparent_50%)]" />

      <AnimatePresence mode="wait">
        {isAuthenticating ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-2 border-[#00d4ff] border-t-transparent rounded-full mx-auto mb-6"
            />
            <motion.p
              className="text-[#00d4ff] font-mono text-lg tracking-widest"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              AUTHENTICATING...
            </motion.p>
            <div className="mt-4 flex gap-1 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#00d4ff]"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
            <p className="text-[#64748b] text-xs mt-4 font-mono">
              Establishing secure connection... █
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <div className="bg-[#111118]/90 backdrop-blur-xl border border-[#2a2a3e] rounded-2xl p-8 shadow-[0_0_50px_rgba(0,212,255,0.1)]">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 mb-4">
                  <span className="text-2xl font-bold text-[#00d4ff] font-mono">PX</span>
                </div>
                <h1 className="text-2xl font-bold text-white font-mono tracking-wider">
                  PHOENIX MISSION CONTROL
                </h1>
                <p className="text-[#64748b] text-sm mt-2 font-mono">
                  v3.2.1 — Secure Command Interface
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[#64748b] text-xs font-mono">SYSTEM ONLINE</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#64748b] text-xs font-mono mb-1.5 tracking-wider uppercase">
                    Operator ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.15)] transition-all duration-300"
                    placeholder="Enter your operator ID..."
                  />
                </div>

                <div>
                  <label className="block text-[#64748b] text-xs font-mono mb-1.5 tracking-wider uppercase">
                    Security Token
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.15)] transition-all duration-300"
                    placeholder="Enter security token..."
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                    >
                      <p className="text-red-400 text-xs font-mono">⚠ {error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff] font-mono py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] tracking-wider uppercase text-sm"
                >
                  Establish Connection
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[#2a2a3e]">
                <p className="text-[#475569] text-xs font-mono text-center mb-3">
                  AUTHORIZED PERSONNEL ONLY
                </p>
                <div className="flex justify-center gap-4">
                  {users.map((user) => (
                    <div key={user.username} className="text-center">
                      <p className="text-[#64748b] text-[10px] font-mono uppercase">{user.role}</p>
                      <p className="text-[#475569] text-[10px] font-mono">{user.clearance}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-[#475569] text-[10px] font-mono tracking-widest">
                  ∇ SECURE COMMS CHANNEL v3.2.1 ∇
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
