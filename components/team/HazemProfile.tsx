"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BackgroundOrbs,
  FloatingParticles,
  GlowingDivider,
  PulsingBadge,
} from "@/components/ai-models/AIAnimations";
import {
  Crown,
  ArrowLeft,
  Mail,
  ExternalLink,
  Zap,
  Brain,
  Target,
  Rocket,
  Code,
  Database,
  Eye,
  Trophy,
  Users,
  BookOpen,
  Layers,
  Shield,
  ChevronRight,
  Cpu,
} from "lucide-react";

/* ─── Background Effects ─── */
function ProfileBackground() {
  return (
    <>
      <BackgroundOrbs colors={["#eab308", "#f97316", "#ef4444", "#00d4ff"]} />
      <FloatingParticles count={40} color="#eab308" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Scan lines */}
        <motion.div
          className="absolute w-full h-px"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(234,179,8,0.08), transparent)",
          }}
          animate={{ top: ["-5%", "105%", "-5%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent, rgba(234,179,8,0.06), transparent)",
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        {/* Holographic sweep */}
        <motion.div
          className="absolute top-0 h-full"
          style={{
            width: "20%",
            background:
              "linear-gradient(90deg, transparent, rgba(234,179,8,0.02), rgba(249,115,22,0.03), transparent)",
            filter: "blur(30px)",
          }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 5,
          }}
        />
      </div>
    </>
  );
}

/* ─── Hero Avatar with Quintuple Rings ─── */
function HeroAvatar() {
  return (
    <div className="relative flex-shrink-0">
      {/* Quintuple rotating rings */}
      <motion.div
        className="absolute -inset-5 rounded-full"
        style={{ border: "2px solid rgba(234,179,8,0.5)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-8 rounded-full"
        style={{ border: "1px dashed rgba(234,179,8,0.3)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-11 rounded-full"
        style={{ border: "1px solid rgba(249,115,22,0.2)" }}
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-14 rounded-full"
        style={{ border: "1px dashed rgba(239,68,68,0.15)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-16 rounded-full"
        style={{ backgroundColor: "rgba(234,179,8,0.04)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Orbiting dots */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#eab308]"
        style={{ filter: "drop-shadow(0 0 4px #eab308)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-[#eab308]"
          style={{ transform: "translateX(100px)" }}
        />
      </motion.div>
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#f97316]"
        style={{ filter: "drop-shadow(0 0 3px #f97316)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-[#f97316]"
          style={{ transform: "translateX(120px)" }}
        />
      </motion.div>

      {/* Avatar */}
      <motion.div
        className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center relative z-10"
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{
          boxShadow:
            "0 0 50px rgba(234,179,8,0.5), 0 0 100px rgba(234,179,8,0.25), inset 0 0 30px rgba(255,255,255,0.1)",
        }}
      >
        <span className="text-5xl font-bold text-white drop-shadow-lg">HZ</span>
        {/* Crown */}
        <motion.div
          className="absolute -top-3"
          animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Crown size={28} className="text-yellow-400 drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Holographic Skill Constellation ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = any;

function SkillConstellation({ skills }: { skills: { name: string; color: string; icon: IconType; desc: string }[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = skills.length;
  const cx = 50;
  const cy = 45;
  const radius = 34;

  const positions = skills.map((_, i) => {
    const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  return (
    <div className="relative w-full aspect-square max-w-[700px] mx-auto">
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.12), transparent 60%)",
              "radial-gradient(circle at 70% 60%, rgba(0,212,255,0.12), transparent 60%)",
              "radial-gradient(circle at 50% 30%, rgba(234,179,8,0.10), transparent 60%)",
              "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.12), transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {positions.map((pos, i) => (
            <motion.line
              key={`core-${i}`}
              x1={`${cx}%`}
              y1={`${cy}%`}
              x2={`${pos.x}%`}
              y2={`${pos.y}%`}
              stroke={skills[i].color}
              strokeWidth={hoveredIdx === i ? "1" : "0.4"}
              strokeOpacity={hoveredIdx === i ? 0.8 : 0.2}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.8 }}
            />
          ))}
          {positions.map((pos, i) => {
            const next = (i + 1) % total;
            return (
              <motion.line
                key={`ring-${i}`}
                x1={`${pos.x}%`}
                y1={`${pos.y}%`}
                x2={`${positions[next].x}%`}
                y2={`${positions[next].y}%`}
                stroke={skills[i].color}
                strokeWidth="0.3"
                strokeOpacity={0.12}
                strokeDasharray="3 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.02, duration: 0.6 }}
              />
            );
          })}
        </svg>

        <div
          className="absolute z-10"
          style={{ left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{ width: 80, height: 80, left: -40, top: -40, border: "1px solid rgba(139,92,246,0.25)" }}
            animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ width: 56, height: 56, left: -28, top: -28, border: "1px solid rgba(139,92,246,0.3)" }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.3), rgba(139,92,246,0.05))",
            }}
            animate={{
              boxShadow: [
                "0 0 40px rgba(139,92,246,0.25)",
                "0 0 70px rgba(139,92,246,0.45)",
                "0 0 40px rgba(139,92,246,0.25)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain size={24} className="text-purple-400" />
          </motion.div>
        </div>

        {skills.map((skill, i) => {
          const pos = positions[i];
          const isHovered = hoveredIdx === i;
          return (
            <motion.div
              key={skill.name}
              className="absolute z-20"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="absolute -inset-3 rounded-full"
                  style={{ background: `radial-gradient(circle, ${skill.color}20, transparent 70%)` }}
                  animate={isHovered ? { scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}30` }}
                  animate={{
                    scale: isHovered ? 1.35 : 1,
                    boxShadow: isHovered
                      ? `0 0 30px ${skill.color}50, inset 0 0 15px ${skill.color}20`
                      : `0 0 0px transparent`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color, transform: "translateX(22px)", filter: `drop-shadow(0 0 3px ${skill.color})` }}
                    />
                  </motion.div>
                  <skill.icon size={16} style={{ color: skill.color }} />
                </motion.div>
                <motion.span
                  className="text-[10px] font-bold mt-2 whitespace-nowrap text-white/60"
                  animate={isHovered ? { color: skill.color, textShadow: `0 0 8px ${skill.color}50` } : {}}
                >
                  {skill.name}
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-44 p-3 rounded-xl z-50 pointer-events-none"
                  style={{
                    backgroundColor: `${skill.color}15`,
                    border: `1px solid ${skill.color}30`,
                    backdropFilter: "blur(16px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="text-[10px] text-white/70 leading-relaxed">{skill.desc}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Contribution Timeline ─── */
function ContributionTimeline() {
  const milestones = [
    {
      date: "Sep 2025",
      title: "Project Inception",
      desc: "Defined the vision for an AI-powered disaster rescue system. Researched existing solutions and identified gaps.",
      color: "#00d4ff",
      icon: Rocket,
    },
    {
      date: "Oct 2025",
      title: "Architecture Design",
      desc: "Designed the full system architecture — sensor pipeline, AI model ensemble, cloud infrastructure, and mobile platform.",
      color: "#7c3aed",
      icon: Layers,
    },
    {
      date: "Nov 2025",
      title: "AI Research Lead",
      desc: "Led the development of 6 AI models including thermal detection (YOLOv26), acoustic classification, and rescue LLM.",
      color: "#f97316",
      icon: Brain,
    },
    {
      date: "Dec 2025",
      title: "Data Science Pipeline",
      desc: "Built the data collection, annotation, and augmentation pipeline. Curated 15K+ thermal images and 20K+ audio samples.",
      color: "#10b981",
      icon: Database,
    },
    {
      date: "Jan 2026",
      title: "Team Leadership",
      desc: "Coordinated 11 team members across 4 sub-teams. Managed sprint planning, code reviews, and integration testing.",
      color: "#eab308",
      icon: Users,
    },
    {
      date: "Feb 2026",
      title: "Model Optimization",
      desc: "Optimized all AI models for edge deployment. Achieved sub-second inference with 96.8% detection accuracy.",
      color: "#ef4444",
      icon: Zap,
    },
    {
      date: "Mar 2026",
      title: "Full-Stack Integration",
      desc: "Integrated the complete platform — robot hardware, AI pipeline, web dashboard, and Flutter mobile app.",
      color: "#ec4899",
      icon: Code,
    },
    {
      date: "Apr 2026",
      title: "Research & Publications",
      desc: "Authored 3 research papers submitted to IEEE and ACM conferences on multi-modal AI for disaster response.",
      color: "#06b6d4",
      icon: BookOpen,
    },
    {
      date: "May 2026",
      title: "Final Defense",
      desc: "Successfully defended the graduation project with the highest evaluation. Demonstrated live rescue scenarios.",
      color: "#eab308",
      icon: Trophy,
    },
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #eab308, #f97316, #ef4444, #eab308)",
          }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="space-y-8">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={m.date}
              initial={{
                opacity: 0,
                x: isLeft ? -40 : 40,
                scale: 0.9,
              }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
              className={`relative flex items-start gap-4 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node */}
              <motion.div
                className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
                style={{
                  backgroundColor: `${m.color}20`,
                  border: `2px solid ${m.color}`,
                  boxShadow: `0 0 15px ${m.color}40`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${m.color}30`,
                    `0 0 20px ${m.color}50`,
                    `0 0 10px ${m.color}30`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                <Icon size={16} style={{ color: m.color }} />
              </motion.div>

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-[45%] ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <motion.div
                  className="rounded-xl p-4 border relative overflow-hidden group"
                  style={{
                    backgroundColor: "rgba(17,17,24,0.7)",
                    borderColor: `${m.color}20`,
                  }}
                  whileHover={{
                    borderColor: `${m.color}50`,
                    boxShadow: `0 0 20px ${m.color}15`,
                  }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle at ${
                        isLeft ? "80%" : "20%"
                      } 50%, ${m.color}08, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: m.color }}
                    >
                      {m.date}
                    </span>
                    <h4 className="text-white font-bold mt-1">{m.title}</h4>
                    <p className="text-[#94a3b8] text-sm mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  index,
}: {
  icon: IconType;
  value: string;
  label: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
      }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="text-center p-4 rounded-xl border relative overflow-hidden group"
      style={{
        backgroundColor: "rgba(17,17,24,0.6)",
        borderColor: `${color}20`,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(circle, ${color}10, transparent 70%)`,
        }}
      />
      <motion.div
        className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}30`,
        }}
        animate={{
          boxShadow: [
            `0 0 0px ${color}00`,
            `0 0 10px ${color}20`,
            `0 0 0px ${color}00`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
      >
        <Icon size={18} style={{ color }} />
      </motion.div>
      <motion.div
        className="text-2xl font-bold font-mono"
        style={{ color }}
        animate={{
          textShadow: [
            `0 0 4px ${color}20`,
            `0 0 12px ${color}40`,
            `0 0 4px ${color}20`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
      >
        {value}
      </motion.div>
      <div className="text-xs text-[#94a3b8] mt-1">{label}</div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function HazemProfile() {
  const skills = [
    { name: "Python", color: "#00d4ff", icon: Code, desc: "Core language for all AI pipelines — 50K+ lines of production code" },
    { name: "TensorFlow", color: "#f97316", icon: Brain, desc: "Built & deployed 5 computer vision models with 96.8% accuracy" },
    { name: "PyTorch", color: "#ef4444", icon: Zap, desc: "Rapid prototyping of acoustic & transformer models" },
    { name: "Computer Vision", color: "#7c3aed", icon: Eye, desc: "YOLOv6n, ResNet-50, thermal image processing pipeline" },
    { name: "Data Science", color: "#10b981", icon: Database, desc: "35K+ curated thermal, acoustic & environmental samples" },
    { name: "System Architecture", color: "#eab308", icon: Layers, desc: "Full-stack design from edge sensors to cloud AI ensemble" },
    { name: "Leadership", color: "#ec4899", icon: Users, desc: "Led 11 engineers across 4 sub-teams for 9 months" },
    { name: "Research", color: "#06b6d4", icon: BookOpen, desc: "3 papers submitted to IEEE/ACM on multi-modal AI for rescue" },
    { name: "Full-Stack Dev", color: "#0ea5e9", icon: Code, desc: "Next.js, React, TypeScript — built entire mission control UI" },
    { name: "DevOps", color: "#a855f7", icon: Shield, desc: "CI/CD pipelines, Docker deployment, cloud infrastructure" },
    { name: "ROS2 / Robotics", color: "#f59e0b", icon: Rocket, desc: "Robot control systems, sensor integration, real-time comms" },
    { name: "Flutter / Mobile", color: "#34d399", icon: Target, desc: "Cross-platform companion app for field rescue teams" },
    { name: "MLOps", color: "#fb923c", icon: Cpu, desc: "ML pipeline automation, model versioning, A/B testing, monitoring & drift detection" },
  ];

  const responsibilities = [
    "Main Team Leadership & Coordination — managed 11 engineers across 4 sub-teams",
    "AI/ML Model Development — built 6 production-grade AI models from research to deployment",
    "Data Science & Analysis — created annotation pipelines for 35K+ data points",
    "Hardware Design Oversight — supervised sensor integration and robot assembly",
    "Project Architecture — designed the full-stack platform from edge to cloud",
    "Research & Publications — authored 3 papers for IEEE and ACM conferences",
    "System Integration — integrated robot, AI, dashboard, and mobile app into one platform",
    "Quality Assurance — established code review processes and testing standards",
  ];

  const stats = [
    { icon: Brain, value: "6", label: "AI Models Built", color: "#7c3aed" },
    { icon: Code, value: "50K+", label: "Lines of Code", color: "#00d4ff" },
    { icon: Database, value: "35K+", label: "Data Points Curated", color: "#10b981" },
    { icon: BookOpen, value: "3", label: "Research Papers", color: "#f97316" },
    { icon: Users, value: "11", label: "Team Members Led", color: "#eab308" },
    { icon: Trophy, value: "9", label: "Months of R&D", color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-12 md:pb-20 px-4 relative overflow-hidden bg-[#0a0a0f]">
      <ProfileBackground />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-[#eab308] transition-colors group"
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowLeft size={16} />
            </motion.div>
            <span className="text-sm font-medium">Back to Team</span>
          </Link>
        </motion.div>

        {/* ─── Hero Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-yellow-500/20 bg-[#111118]/80 backdrop-blur-xl p-8 md:p-12 mb-12 overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 20% 30%, rgba(234,179,8,0.15), transparent 50%)",
                "radial-gradient(circle at 80% 70%, rgba(249,115,22,0.15), transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(239,68,68,0.12), transparent 50%)",
                "radial-gradient(circle at 20% 30%, rgba(234,179,8,0.15), transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Rotating border */}
          <motion.div
            className="absolute -inset-[1px] rounded-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, #eab308, #f97316, #ef4444, #eab308, transparent, #eab308)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[1px] rounded-3xl bg-[#111118]/95" />

          {/* Corner accents */}
          <motion.div
            className="absolute top-0 left-0 w-40 h-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(234,179,8,0.15), transparent)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-40 h-40"
            style={{
              background:
                "linear-gradient(-45deg, rgba(249,115,22,0.15), transparent)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <HeroAvatar />

            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Crown size={14} className="text-yellow-400" />
                </motion.div>
                <span className="text-yellow-400 text-xs font-bold tracking-wider uppercase">
                  Team Leader & AI/ML Engineer
                </span>
              </motion.div>

              {/* Name with glitch */}
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-2 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  className="text-white"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0)",
                      "0 0 40px rgba(234,179,8,0.3)",
                      "0 0 20px rgba(255,255,255,0)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Hazem Nabil
                </motion.span>{" "}
                <motion.span
                  className="text-[#eab308]"
                  animate={{
                    textShadow: [
                      "0 0 10px #eab30830",
                      "0 0 30px #eab30850",
                      "0 0 10px #eab30830",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Zaky
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-[#00d4ff] text-sm font-mono mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                hazem@phoenix.com
              </motion.p>

              <motion.p
                className="text-[#94a3b8] leading-relaxed mb-6 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                The architect behind Phoenix — leading the vision from concept to
                reality. Built the entire AI pipeline, designed the system
                architecture, and coordinated a team of 11 engineers across 4
                sub-teams over 9 months of intensive research and development.
              </motion.p>

              {/* Social links */}
              <div className="flex gap-3 justify-center lg:justify-start">
                {[
                  { icon: ExternalLink, href: "https://linkedin.com/in/hazem-nabil", label: "LinkedIn" },
                  { icon: ExternalLink, href: "https://github.com/hazem-nabil", label: "GitHub" },
                  { icon: Mail, href: "mailto:hazem@phoenix.com", label: "Email" },
                ].map(({ icon: SIcon, href, label }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                  >
                    <SIcon size={14} />
                    <span className="text-xs font-semibold">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Stats Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              icon={s.icon}
              value={s.value}
              label={s.label}
              color={s.color}
              index={i}
            />
          ))}
        </div>

        <GlowingDivider color="#eab308" />

        {/* ─── Bio Section ─── */}
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgba(234,179,8,0.15)",
                border: "1px solid rgba(234,179,8,0.3)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield size={20} className="text-yellow-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">About Hazem</h2>
          </div>

          <div className="rounded-2xl border border-yellow-500/15 bg-[#111118]/60 backdrop-blur-xl p-6 md:p-8 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(234,179,8,0.05), transparent 60%)",
              }}
            />
            <div className="relative z-10 space-y-4 text-[#94a3b8] leading-relaxed">
              <p>
                Hazem is the{" "}
                <motion.span
                  className="text-[#eab308] font-semibold"
                  animate={{
                    textShadow: [
                      "0 0 4px #eab30820",
                      "0 0 12px #eab30840",
                      "0 0 4px #eab30820",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  founding mind
                </motion.span>{" "}
                behind the NABD360 Phoenix rescue robot project. As the main
                team leader, he didn&apos;t just manage — he{" "}
                <span className="text-white font-medium">architected the entire system</span>,
                from the sensor pipeline to the AI model ensemble, from the cloud
                infrastructure to the mobile companion app.
              </p>
              <p>
                His expertise spans the full spectrum:{" "}
                <span className="text-[#00d4ff]">deep learning</span>,{" "}
                <span className="text-[#7c3aed]">computer vision</span>,{" "}
                <span className="text-[#f97316]">data engineering</span>, and{" "}
                <span className="text-[#10b981]">system design</span>. He wrote
                the core AI models, built the data pipelines, designed the
                architecture, and led the team that brought it all together.
              </p>
              <p>
                Under his leadership, the project achieved{" "}
                <motion.span
                  className="text-[#10b981] font-bold"
                  animate={{
                    textShadow: [
                      "0 0 4px #10b98120",
                      "0 0 12px #10b98140",
                      "0 0 4px #10b98120",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  96.8% detection accuracy
                </motion.span>{" "}
                across 6 AI models, processed 35,000+ data points, and delivered
                a complete end-to-end platform — all within 9 months.
              </p>
            </div>
          </div>
        </motion.div>

        <GlowingDivider color="#7c3aed" />

        {/* ─── Skills Section — Holographic Constellation ─── */}
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center relative"
              style={{
                backgroundColor: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(124,58,237,0)",
                  "0 0 20px rgba(124,58,237,0.3)",
                  "0 0 0px rgba(124,58,237,0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="absolute w-1 h-1 rounded-full bg-purple-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute w-1 h-1 bg-purple-400 rounded-full" style={{ transform: "translateX(20px)" }} />
              </motion.div>
              <Zap size={20} className="text-purple-400 relative z-10" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">Skill Constellation</h2>
              <motion.p
                className="text-[#64748b] text-xs font-mono"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                13 nodes · neural network topology
              </motion.p>
            </div>
          </motion.div>

          <div className="rounded-2xl border border-purple-500/15 bg-[#111118]/40 backdrop-blur-xl overflow-hidden">
            <SkillConstellation skills={skills} />
          </div>
        </motion.div>

        <GlowingDivider color="#f97316" />

        {/* ─── Responsibilities ─── */}
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Target size={20} className="text-orange-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">
              Key Responsibilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {responsibilities.map((resp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
                whileHover={{ x: 6, backgroundColor: "rgba(234,179,8,0.04)" }}
                className="flex items-start gap-3 p-3 rounded-xl border border-yellow-500/10 group"
              >
                <motion.div
                  className="mt-0.5 flex-shrink-0"
                  whileHover={{ scale: 1.3, rotate: 15 }}
                >
                  <ChevronRight
                    size={16}
                    className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
                  />
                </motion.div>
                <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors">
                  {resp}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <GlowingDivider color="#10b981" />

        {/* ─── Contribution Timeline ─── */}
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Rocket size={20} className="text-emerald-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">
              Contribution Timeline
            </h2>
          </div>

          <ContributionTimeline />
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlowingDivider color="#eab308" />
          <div className="mt-12">
            <PulsingBadge color="#eab308" className="mb-4">
              The Architect of Phoenix
            </PulsingBadge>
            <motion.p
              className="text-[#94a3b8] text-sm max-w-md mx-auto"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Built with passion, led with vision, delivered with excellence.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
