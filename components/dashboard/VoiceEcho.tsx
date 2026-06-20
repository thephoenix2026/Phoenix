"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EchoMessage {
  transcript: string;
  action: string;
}

interface VoiceEchoProps {
  message: EchoMessage | null;
}

export default function VoiceEcho({ message }: VoiceEchoProps) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<EchoMessage | null>(null);

  useEffect(() => {
    if (!message) return;
    setCurrent(message);
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && current && (
          <motion.div
            key={current.transcript + current.action}
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl"
            style={{
              backgroundColor: "rgba(15,15,25,0.85)",
              borderColor: "rgba(0,212,255,0.25)",
              boxShadow: "0 0 40px rgba(0,212,255,0.1), 0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* Mic icon with pulse */}
            <motion.div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)" }}
              animate={{ boxShadow: ["0 0 0px rgba(0,212,255,0)", "0 0 15px rgba(0,212,255,0.3)", "0 0 0px rgba(0,212,255,0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </motion.div>

            {/* Divider */}
            <div className="w-px h-8" style={{ backgroundColor: "rgba(0,212,255,0.15)" }} />

            {/* Text */}
            <div>
              <motion.p
                className="text-sm text-white/90 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                "{current.transcript}"
              </motion.p>
              <motion.div
                className="flex items-center gap-1.5 mt-0.5"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
                <span className="text-xs text-emerald-400 font-mono">{current.action}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
