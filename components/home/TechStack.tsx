"use client";

import { motion } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const categories = [
  {
    title: "Artificial Intelligence",
    color: "#7c3aed",
    items: ["TensorFlow", "PyTorch", "YOLOv26", "LLM Fine-tuning", "OpenCV"],
    icon: "🧠",
  },
  {
    title: "Robotics & Hardware",
    color: "#ef4444",
    items: ["ROS2", "ESP32", "Raspberry Pi 4", "FLIR Lepton", "MPU6050"],
    icon: "🤖",
  },
  {
    title: "Software Engineering",
    color: "#00d4ff",
    items: ["Next.js", "TypeScript", "Docker", "CI/CD", "REST APIs"],
    icon: "💻",
  },
  {
    title: "Mobile Development",
    color: "#10b981",
    items: ["Flutter", "Dart", "Riverpod", "WebSocket", "Firebase"],
    icon: "📱",
  },
  {
    title: "Cloud & IoT",
    color: "#f97316",
    items: ["MQTT", "AWS IoT", "LoRa Mesh", "Edge Computing", "TimeSeries DB"],
    icon: "☁️",
  },
  {
    title: "Design & Research",
    color: "#ec4899",
    items: ["Figma", "CAD/CAM", "Academic Writing", "Data Analysis", "Patents"],
    icon: "🎨",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 px-4 bg-[#0a0a10] relative overflow-hidden">
      <BackgroundOrbs colors={["#7c3aed", "#00d4ff", "#f97316"]} />
      <FloatingParticles count={20} color="#f97316" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <PulsingBadge color="#f97316" className="mb-4">
            Tech Stack
          </PulsingBadge>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Technology </span>
            <motion.span
              className="text-[#7c3aed]"
              animate={{
                textShadow: [
                  "0 0 8px #7c3aed30",
                  "0 0 20px #7c3aed50",
                  "0 0 8px #7c3aed30",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Stack
            </motion.span>
          </motion.h2>
          <p className="text-[#94a3b8] text-lg">
            Full-stack expertise powering every layer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                type: "spring",
                stiffness: 300,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <GlowCard glowColor={category.color} className="h-full relative overflow-hidden">
                {/* Animated top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                  style={{
                    backgroundImage: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 mt-1">
                    <motion.span
                      className="text-2xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {category.icon}
                    </motion.span>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: category.color }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + j * 0.04 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: `${category.color}25`,
                        }}
                        className="text-xs px-3 py-1.5 rounded-full border cursor-default transition-colors"
                        style={{
                          backgroundColor: `${category.color}10`,
                          color: category.color,
                          borderColor: `${category.color}33`,
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <GlowingDivider color="#ec4899" />
      </div>
    </section>
  );
}
