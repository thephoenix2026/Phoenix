"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center"
          >
            <div className="mb-2 font-mono text-sm tracking-[0.3em] text-[#00d4ff]/60 uppercase">
              Initializing
            </div>
            <h1 className="font-mono text-4xl font-bold tracking-wider text-[#00d4ff] md:text-6xl">
              Phoenix
            </h1>
            <p className="mt-3 font-mono text-xs tracking-widest text-gray-500">
              INTELLIGENT DISASTER RESCUE SYSTEM
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-12 w-64"
          >
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[10px] text-gray-500">
              <span>SYSTEM BOOT</span>
              <span>{Math.min(Math.round(progress), 100)}%</span>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-[#00d4ff]/30" />
          <div className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-[#00d4ff]/30" />
          <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-[#00d4ff]/30" />
          <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-[#00d4ff]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
