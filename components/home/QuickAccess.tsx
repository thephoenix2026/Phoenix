"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BackgroundOrbs,
  FloatingParticles,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";

const pages = [
  { title: "About", href: "/about", description: "Problem statement and vision", color: "#7c3aed", icon: "📋" },
  { title: "Team", href: "/team", description: "Meet the engineers", color: "#10b981", icon: "👥" },
  { title: "Architecture", href: "/architecture", description: "System design overview", color: "#3b82f6", icon: "🏗️" },
  { title: "Robot Design", href: "/robot", description: "Hardware and CAD models", color: "#ef4444", icon: "🤖" },
  { title: "AI Models", href: "/ai-models", description: "5 intelligent models", color: "#7c3aed", icon: "🧠" },
  { title: "Dashboard", href: "/dashboard", description: "Live monitoring system", color: "#00d4ff", icon: "📊" },
  { title: "Mobile App", href: "/mobile-app", description: "Rescue companion app", color: "#10b981", icon: "📱" },
  { title: "Research", href: "/research", description: "Innovations and papers", color: "#f97316", icon: "🔬" },
  { title: "Performance", href: "/performance", description: "Benchmarks and metrics", color: "#eab308", icon: "📈" },
  { title: "Gallery", href: "/gallery", description: "Images and videos", color: "#ec4899", icon: "🖼️" },
  { title: "Future Work", href: "/future", description: "Next-generation features", color: "#8b5cf6", icon: "🔮" },
  { title: "Downloads", href: "/downloads", description: "Documentation and resources", color: "#06b6d4", icon: "📥" },
];

export function QuickAccess() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <BackgroundOrbs colors={["#00d4ff", "#7c3aed", "#ec4899"]} />
      <FloatingParticles count={20} color="#ec4899" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-4">
          <PulsingBadge color="#ec4899" className="mb-4">
            Navigate
          </PulsingBadge>
        </div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white">Explore </span>
          <motion.span
            className="text-[#ec4899]"
            animate={{
              textShadow: [
                "0 0 8px #ec489930",
                "0 0 20px #ec489950",
                "0 0 8px #ec489930",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Phoenix
          </motion.span>
        </motion.h2>
        <p className="text-[#94a3b8] text-center text-lg mb-12">
          Navigate to any section of the platform
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page, i) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.04,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Link href={page.href}>
                <motion.div
                  className="group p-5 rounded-xl h-full relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "rgba(17,17,24,0.5)",
                    border: "1px solid rgba(42,42,62,0.5)",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    borderColor: page.color,
                    boxShadow: `0 0 20px ${page.color}20, 0 0 40px ${page.color}10`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${page.color}10, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.span
                      className="text-xl block mb-2"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      {page.icon}
                    </motion.span>

                    {/* Title */}
                    <div
                      className="text-sm font-semibold transition-colors"
                      style={{ color: "white" }}
                    >
                      <motion.span
                        className="group-hover:text-[color:var(--glow)] transition-colors"
                        style={{ "--glow": page.color } as React.CSSProperties}
                      >
                        {page.title}
                      </motion.span>
                    </div>

                    {/* Description */}
                    <div className="text-xs text-[#94a3b8] mt-1">
                      {page.description}
                    </div>

                    {/* Bottom accent */}
                    <motion.div
                      className="mt-3 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${page.color}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
