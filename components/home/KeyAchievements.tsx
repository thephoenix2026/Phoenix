"use client";

import { motion } from "framer-motion";
import { keyAchievements } from "@/lib/data/stats";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const achievementColors = ["#00d4ff", "#7c3aed", "#10b981", "#f97316"];
const achievementIcons = ["🧬", "⚡", "🎯", "🔗"];

export function KeyAchievements() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <BackgroundOrbs colors={["#10b981", "#7c3aed"]} />
      <FloatingParticles count={15} color="#10b981" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <PulsingBadge color="#10b981" className="mb-4">
            Achievements
          </PulsingBadge>
        </div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white">Key </span>
          <motion.span
            className="text-[#10b981]"
            animate={{
              textShadow: [
                "0 0 8px #10b98130",
                "0 0 20px #10b98150",
                "0 0 8px #10b98130",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Milestones
          </motion.span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {keyAchievements.map((achievement, i) => {
            const color = achievementColors[i % achievementColors.length];
            const icon = achievementIcons[i % achievementIcons.length];

            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group"
              >
                {/* Rotating border */}
                <motion.div
                  className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `conic-gradient(from 0deg, ${color}, transparent 40%, ${color})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-[1px] rounded-xl bg-[#111118]/90" />

                <div
                  className="relative z-10 p-6 h-full overflow-hidden rounded-xl"
                  style={{ border: "1px solid rgba(42,42,62,0.5)" }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 20%, ${color}10, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span
                        className="text-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        {icon}
                      </motion.span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color }}
                      >
                        {achievement.title}
                      </h3>
                    </div>

                    <p className="text-[#94a3b8] leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Bottom accent */}
                    <motion.div
                      className="mt-4 h-0.5 rounded-full"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${color}, transparent)`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "40%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <GlowingDivider color="#f97316" />
      </div>
    </section>
  );
}
