"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { teamMembers, mainTeamLeader, teamLeaders } from "@/lib/data/team";
import GridBackground from "@/components/shared/GridBackground";
import SkillRadar from "@/components/interactive/SkillRadar";
import Link from "next/link";
import {
  Sparkles,
  Star,
  Crown,
  Users,
  Code,
  Palette,
  Smartphone,
  Wrench,
  Mail,
  ChevronRight,
  Zap,
  Target,
  ExternalLink,
} from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const teamColors: Record<string, { primary: string; gradient: string; glow: string }> = {
  "Hardware Design": { primary: "#f97316", gradient: "from-orange-500 to-red-500", glow: "rgba(249,115,22,0.3)" },
  "Hardware Implementation": { primary: "#a855f7", gradient: "from-purple-500 to-indigo-500", glow: "rgba(168,85,247,0.3)" },
  "UX/UI": { primary: "#ec4899", gradient: "from-pink-500 to-rose-500", glow: "rgba(236,72,153,0.3)" },
  "Mobile App": { primary: "#22c55e", gradient: "from-green-500 to-emerald-500", glow: "rgba(34,197,94,0.3)" },
  Leadership: { primary: "#eab308", gradient: "from-yellow-400 to-orange-500", glow: "rgba(234,179,8,0.3)" },
};

function getMemberColor(name: string) {
  const colors = [
    "from-[#00d4ff] to-[#0088cc]",
    "from-[#00ff88] to-[#00cc66]",
    "from-[#ff6b6b] to-[#cc4444]",
    "from-[#ffd93d] to-[#ccaa00]",
    "from-[#a855f7] to-[#7c3aed]",
    "from-[#f472b6] to-[#db2777]",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

/* ─── Floating Particles Background ─── */
function FloatingParticles({ count = 20, color = "#00d4ff" }: { count?: number; color?: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        w: 2 + (((i * 7 + 3) % 11) / 11) * 4,
        h: 2 + (((i * 13 + 5) % 11) / 11) * 4,
        left: ((i * 37 + 17) % 100),
        top: ((i * 53 + 29) % 100),
        yOff: 30 + ((i * 19 + 11) % 40),
        xOff: ((i * 23 + 7) % 30) - 15,
        dur: 4 + ((i * 11 + 3) % 4),
        delay: i * 0.2,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.h,
            backgroundColor: color,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            y: [0, -p.yOff, 0],
            x: [0, p.xOff, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Avatar ─── */
function AnimatedAvatar({
  initials,
  color,
  size = "md",
  ring = false,
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
  ring?: boolean;
}) {
  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
  };

  return (
    <div className="relative">
      {ring && (
        <>
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{ border: `2px solid ${color}` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ border: `1px dashed ${color}40` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ backgroundColor: `${color}08` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      )}
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 relative z-10`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <span className="font-bold text-white">{initials}</span>
      </motion.div>
    </div>
  );
}

/* ─── Skill Badge ─── */
function SkillBadge({ skill, delay, color = "#00d4ff" }: { skill: string; delay: number; color?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-2.5 py-1 text-[10px] rounded-full border cursor-default"
      style={{
        backgroundColor: `${color}10`,
        color,
        borderColor: `${color}25`,
      }}
    >
      {skill}
    </motion.span>
  );
}

/* ─── Section Title ─── */
function AnimatedSectionTitle({
  icon: Icon,
  title,
  color,
  delay = 0,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center mb-10"
    >
      <motion.div
        className="inline-flex items-center gap-3 mb-3"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      </motion.div>
      <motion.div
        className="h-0.5 w-20 mx-auto rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Team Leader Spotlight ─── */
function LeaderSpotlight({ leader }: { leader: typeof mainTeamLeader }) {
  if (!leader) return null;
  const color = "#eab308";

  return (
    <section className="relative py-20 px-4">
      <FloatingParticles count={20} color={color} />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSectionTitle icon={Crown} title="Team Leader" color={color} />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative rounded-3xl border border-yellow-500/30 bg-[#111118]/90 backdrop-blur-xl p-8 md:p-10 overflow-hidden group">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, rgba(234,179,8,0.15), transparent 50%)",
                  "radial-gradient(circle at 80% 70%, rgba(249,115,22,0.15), transparent 50%)",
                  "radial-gradient(circle at 50% 20%, rgba(234,179,8,0.15), transparent 50%)",
                  "radial-gradient(circle at 20% 30%, rgba(234,179,8,0.15), transparent 50%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rotating border glow */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl"
              style={{
                background: "conic-gradient(from 0deg, #eab308, #f97316, #ef4444, #eab308, transparent, #eab308)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[1px] rounded-3xl bg-[#111118]/95" />

            {/* Corner accents */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-32"
              style={{ background: "linear-gradient(135deg, rgba(234,179,8,0.2), transparent)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-32 h-32"
              style={{ background: "linear-gradient(-45deg, rgba(249,115,22,0.2), transparent)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-32 h-32"
              style={{ background: "linear-gradient(45deg, rgba(239,68,68,0.1), transparent)" }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.7 }}
            />

            {/* Sparkles */}
            <motion.div
              className="absolute top-6 right-6"
              animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} className="text-yellow-400/60" />
            </motion.div>
            <motion.div
              className="absolute top-6 right-14"
              animate={{ rotate: [360, 180, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            >
              <Star size={18} className="text-yellow-400/60" />
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-6"
              animate={{ rotate: [0, 180, 360], scale: [1, 1.4, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-orange-400/50" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star size={14} className="text-yellow-400" />
              </motion.div>
              <span className="text-yellow-400 text-xs font-bold tracking-wider uppercase">Team Leader & AI/ML Engineer</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown size={14} className="text-yellow-400" />
              </motion.div>
            </motion.div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar with quintuple ring */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className="absolute -inset-4 rounded-full"
                  style={{ border: "2px solid rgba(234,179,8,0.4)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-6 rounded-full"
                  style={{ border: "1px dashed rgba(234,179,8,0.25)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-8 rounded-full"
                  style={{ backgroundColor: "rgba(234,179,8,0.06)" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-10 rounded-full"
                  style={{ border: "1px solid rgba(234,179,8,0.15)" }}
                  animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-12 rounded-full"
                  style={{ border: "1px dashed rgba(249,115,22,0.1)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  style={{ boxShadow: "0 0 40px rgba(234,179,8,0.5), 0 0 80px rgba(234,179,8,0.25)" }}
                >
                  <span className="text-3xl font-bold text-white">{getInitials(leader.name)}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3">
                  <motion.h3
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ textShadow: "0 0 30px rgba(234,179,8,0.3)" }}
                  >
                    <Link
                      href="/team/hazem-nabil-zaky"
                      className="hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {leader.name}
                    </Link>
                  </motion.h3>
                  <Link
                    href="/team/hazem-nabil-zaky"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all group"
                  >
                    <span>View Full Profile</span>
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </div>

                <motion.p
                  className="text-[#00d4ff] text-sm mb-3 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {leader.role}
                </motion.p>

                <motion.p
                  className="text-gray-400 text-sm mb-6 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {leader.bio}
                </motion.p>

                {/* Skills with animated bars */}
                <div className="mb-6">
                  <motion.p
                    className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 justify-center lg:justify-start"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                  >
                    <Zap size={11} style={{ color }} /> Technical Skills
                  </motion.p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {leader.skills.map((skill, i) => {
                      const skillLevel = 85 + ((i * 7) % 15);
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2 cursor-default"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-yellow-400 font-semibold">{skill}</span>
                            <span className="text-[9px] text-yellow-400/60 font-mono">{skillLevel}%</span>
                          </div>
                          <div className="h-1 rounded-full bg-yellow-500/10 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skillLevel}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.6 + i * 0.05 }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <motion.p
                    className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5 justify-center lg:justify-start"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.55 }}
                  >
                    <Target size={11} style={{ color }} /> Key Responsibilities
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {leader.responsibilities.map((resp, i) => (
                      <motion.div
                        key={resp}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.06 }}
                        whileHover={{ x: 4, backgroundColor: "rgba(234,179,8,0.05)" }}
                        className="flex items-start gap-2 p-2 rounded-lg transition-colors"
                      >
                        <motion.div
                          whileHover={{ scale: 1.4, rotate: 15 }}
                          className="mt-0.5"
                        >
                          <ChevronRight size={14} className="flex-shrink-0 text-yellow-400" />
                        </motion.div>
                        <span className="text-sm text-gray-300">{resp}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-3 justify-center lg:justify-start">
                  {[
                    { icon: ExternalLink, href: leader.linkedin, label: "LinkedIn" },
                    { icon: ExternalLink, href: leader.github, label: "GitHub" },
                    { icon: Mail, href: `mailto:${leader.email}`, label: "Email" },
                  ].map(({ icon: Icon, href, label }, i) => (
                    <motion.a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.15, y: -4 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                    >
                      <Icon size={14} />
                      <span className="text-xs font-semibold">{label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sub-Team Leader Card ─── */
function SubLeaderCard({
  member,
  index,
}: {
  member: (typeof teamLeaders)[0];
  index: number;
}) {
  const teamStyle = teamColors[member.team] || teamColors["Leadership"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <div
        className="relative rounded-2xl border bg-[#111118]/80 backdrop-blur-xl p-6 h-full overflow-hidden transition-all duration-500"
        style={{
          borderColor: `${teamStyle.primary}25`,
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${teamStyle.glow}, transparent 70%)`,
          }}
        />

        {/* Top accent */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: teamStyle.primary }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />

        {/* Corner spark */}
        <motion.div
          className="absolute top-3 right-3"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={14} style={{ color: `${teamStyle.primary}60` }} />
        </motion.div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <AnimatedAvatar
              initials={getInitials(member.name)}
              color={`bg-gradient-to-br ${teamStyle.gradient}`}
              size="md"
              ring
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="px-2 py-0.5 text-[10px] rounded-full border flex items-center gap-1"
                  style={{
                    backgroundColor: `${teamStyle.primary}15`,
                    color: teamStyle.primary,
                    borderColor: `${teamStyle.primary}30`,
                  }}
                >
                  <Zap size={10} /> Sub-Team Leader
                </motion.span>
              </div>
              <p className="text-sm mb-0.5" style={{ color: teamStyle.primary }}>{member.role}</p>
              <p className="text-gray-500 text-xs font-mono">{member.team} Team</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.skills.slice(0, 5).map((skill, i) => (
              <SkillBadge key={skill} skill={skill} delay={0.4 + i * 0.05} color={teamStyle.primary} />
            ))}
          </div>

          {/* Responsibilities */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Wrench size={10} /> Responsibilities
            </p>
            <ul className="space-y-1">
              {member.responsibilities.slice(0, 4).map((resp, i) => (
                <motion.li
                  key={resp}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="text-xs text-gray-300 flex items-start gap-1.5"
                >
                  <ChevronRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: teamStyle.primary }} />
                  {resp}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex gap-2 mt-4">
            {[
              { icon: ExternalLink, href: member.linkedin },
              { icon: ExternalLink, href: member.github },
              { icon: Mail, href: `mailto:${member.email}` },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-7 h-7 rounded-md flex items-center justify-center border transition-colors"
                style={{ borderColor: `${teamStyle.primary}25`, color: `${teamStyle.primary}80` }}
              >
                <Icon size={12} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Team Member Card ─── */
function MemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const teamStyle = teamColors[member.team] || teamColors["Leadership"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group"
    >
      <div
        className="relative rounded-xl border bg-[#111118]/60 backdrop-blur-sm p-5 h-full overflow-hidden transition-all duration-400"
        style={{ borderColor: `${teamStyle.primary}15` }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${teamStyle.glow}, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex items-start gap-3.5">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMemberColor(member.name)} flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-sm font-bold text-white">{getInitials(member.name)}</span>
            </div>
            {/* Online dot */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#111118]"
              style={{ backgroundColor: teamStyle.primary }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white mb-0.5">{member.name}</h4>
            <p className="text-xs mb-2" style={{ color: teamStyle.primary }}>{member.role}</p>
            <p className="text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">{member.bio}</p>
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[9px] rounded-full border"
                  style={{
                    backgroundColor: `${teamStyle.primary}08`,
                    color: `${teamStyle.primary}cc`,
                    borderColor: `${teamStyle.primary}20`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function TeamContent() {
  const leader = mainTeamLeader;
  const subLeaders = teamLeaders;
  const members = teamMembers.filter((m) => m.level === "member");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const teamGroups = ["Hardware Design", "Hardware Implementation", "UX/UI", "Mobile App"];

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Hero */}
      <section className="relative flex items-center justify-center py-32 overflow-hidden">
        <GridBackground />
        <FloatingParticles count={30} color="#00d4ff" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Users size={16} className="text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">Our Team</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#00a0cc] to-[#00ff88] bg-clip-text text-transparent">
              Meet the Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            The engineers and researchers building the future of disaster response
          </motion.p>

          {/* Animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { label: "Members", value: teamMembers.length },
              { label: "Sub-Teams", value: 4 },
              { label: "Skills", value: "60+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-[#00d4ff] font-mono">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Leader Spotlight */}
      <LeaderSpotlight leader={leader} />

      {/* Sub-Team Leaders */}
      <section className="relative py-16 px-4" ref={sectionRef}>
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSectionTitle icon={Zap} title="Sub-Team Leaders" color="#00d4ff" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subLeaders.map((member, index) => (
              <SubLeaderCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Members by Sub-Team */}
      <section className="relative py-16 px-4 bg-[#111118]/50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSectionTitle icon={Users} title="Team Members" color="#00d4ff" />

          {teamGroups.map((teamName) => {
            const teamMems = members.filter((m) => m.team === teamName);
            if (teamMems.length === 0) return null;
            const teamStyle = teamColors[teamName] || teamColors["Leadership"];

            return (
              <motion.div
                key={teamName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-14"
              >
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="h-px flex-1 max-w-[100px]"
                    style={{ backgroundColor: `${teamStyle.primary}30` }}
                    initial={{ scaleX: 0, originX: 1 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  />
                  <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: teamStyle.primary }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {teamName === "Hardware Design" && <Wrench size={18} />}
                      {teamName === "Hardware Implementation" && <Code size={18} />}
                      {teamName === "UX/UI" && <Palette size={18} />}
                      {teamName === "Mobile App" && <Smartphone size={18} />}
                    </motion.div>
                    {teamName} Team
                  </h3>
                  <motion.div
                    className="h-px flex-1 max-w-[100px]"
                    style={{ backgroundColor: `${teamStyle.primary}30` }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMems.map((member, index) => (
                    <MemberCard key={member.name} member={member} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Skills Radar */}
      <section className="relative py-20 px-4 overflow-hidden">
        <FloatingParticles count={10} color="#7c3aed" />
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSectionTitle icon={Target} title="Team Skills Overview" color="#7c3aed" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#94a3b8] text-center mb-10"
          >
            Collective technical capabilities across all domains
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center"
          >
            <SkillRadar />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
