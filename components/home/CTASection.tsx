"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

export default function CTASection() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-[#0a0a10] via-[#0d1117] to-[#0a1520] overflow-hidden">
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#f97316"]} />
      <FloatingParticles count={30} color="#00d4ff" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Pulsing grid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          animate={{
            opacity: [0.02, 0.06, 0.02],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-px"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)",
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <PulsingBadge color="#00d4ff" className="mb-6">
            Get Started
          </PulsingBadge>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Ready to Explore </span>
            <motion.span
              className="text-[#00d4ff]"
              animate={{
                textShadow: [
                  "0 0 20px #00d4ff30",
                  "0 0 40px #00d4ff50",
                  "0 0 20px #00d4ff30",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Phoenix?
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-[#94a3b8] text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Discover how AI, robotics, and engineering come together to save
            lives
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: "#00d4ff",
                  color: "#0a0a10",
                }}
              >
                {/* Energy border */}
                <motion.div
                  className="absolute -inset-[1px] rounded-xl"
                  style={{
                    backgroundImage:
                      "conic-gradient(from 0deg, #00d4ff, #7c3aed, #00d4ff)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="absolute inset-[1px] rounded-xl bg-[#00d4ff]" />

                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <span className="relative z-10">View Live Dashboard</span>
              </motion.div>
            </Link>

            <Link href="/research">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer"
                style={{
                  border: "1px solid #00d4ff40",
                  color: "#00d4ff",
                }}
              >
                <span className="relative z-10">Read Research Paper</span>
              </motion.div>
            </Link>
          </div>

          {/* Bottom glow */}
          <motion.div
            className="mt-12"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <GlowingDivider color="#00d4ff" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
