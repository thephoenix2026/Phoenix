"use client";

import { motion } from "framer-motion";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

export function MissionStatement() {
  const words = "Saving Lives Through Intelligence".split(" ");

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#10b981"]} />
      <FloatingParticles count={20} color="#00d4ff" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <PulsingBadge color="#00d4ff" className="mb-6">
          Our Mission
        </PulsingBadge>

        {/* Animated title — each word reveals */}
        <h2 className="text-3xl md:text-5xl font-bold mb-8 flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className={
                word === "Lives"
                  ? "text-[#ef4444]"
                  : word === "Intelligence"
                    ? "text-[#00d4ff]"
                    : "text-white"
              }
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Animated underline */}
        <motion.div
          className="w-24 h-1 mx-auto rounded-full mb-8"
          style={{
            backgroundImage: "linear-gradient(90deg, #00d4ff, #7c3aed, #10b981)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Quote marks */}
        <div className="relative">
          <motion.span
            className="absolute -top-8 -left-4 text-6xl text-[#00d4ff]/10 font-serif select-none"
            animate={{ opacity: [0.05, 0.15, 0.05], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            &ldquo;
          </motion.span>
          <motion.span
            className="absolute -bottom-8 -right-4 text-6xl text-[#00d4ff]/10 font-serif select-none"
            animate={{ opacity: [0.05, 0.15, 0.05], y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            &rdquo;
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-[#94a3b8] leading-relaxed relative z-10"
          >
            Every second counts in disaster response. Phoenix combines cutting-edge
            AI with multi-sensor fusion to{" "}
            <motion.span
              className="text-[#00d4ff] font-semibold"
              animate={{
                textShadow: [
                  "0 0 4px #00d4ff30",
                  "0 0 12px #00d4ff50",
                  "0 0 4px #00d4ff30",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              detect survivors faster
            </motion.span>
            , assess hazards in real-time, and guide rescue teams through the most
            dangerous environments. Our mission is to bridge the gap between
            technology and humanitarian response, ensuring{" "}
            <motion.span
              className="text-[#ef4444] font-semibold"
              animate={{
                textShadow: [
                  "0 0 4px #ef444430",
                  "0 0 12px #ef444450",
                  "0 0 4px #ef444430",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              no survivor is left behind
            </motion.span>
            .
          </motion.p>
        </div>

        {/* Bottom glow divider */}
        <GlowingDivider color="#00d4ff" />
      </div>
    </section>
  );
}
