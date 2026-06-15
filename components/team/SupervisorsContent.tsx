"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { supervisors } from "@/lib/data/supervisors";
import GridBackground from "@/components/shared/GridBackground";
import {
  GraduationCap,
  Building2,
  Sparkles,
  BookOpen,
  Award,
  Mail,
  ExternalLink,
  ChevronRight,
  Star,
  Briefcase,
} from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const tagColors = [
  { bg: "#00d4ff", text: "#00d4ff" },
  { bg: "#00ff88", text: "#00ff88" },
  { bg: "#a855f7", text: "#a855f7" },
  { bg: "#f472b6", text: "#f472b6" },
  { bg: "#ffd93d", text: "#ffd93d" },
];

/* ─── Floating Particles ─── */
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
  gradient,
  size = "md",
  ring = false,
}: {
  initials: string;
  gradient: string;
  size?: "sm" | "md" | "lg";
  ring?: boolean;
}) {
  const sizeClasses = { sm: "w-12 h-12 text-sm", md: "w-16 h-16 text-xl", lg: "w-20 h-20 text-2xl" };
  const color = gradient.includes("cyan") ? "#00d4ff" : gradient.includes("emerald") ? "#00ff88" : gradient.includes("violet") ? "#a855f7" : "#f472b6";

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
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </>
      )}
      <motion.div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 relative z-10`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <span className="font-bold text-white">{initials}</span>
      </motion.div>
    </div>
  );
}

/* ─── Research Interest Tag ─── */
function ResearchTag({ interest, index }: { interest: string; index: number }) {
  const color = tagColors[index % tagColors.length];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-3 py-1 text-xs rounded-full border cursor-default"
      style={{
        backgroundColor: `${color.bg}10`,
        color: color.text,
        borderColor: `${color.bg}25`,
      }}
    >
      {interest}
    </motion.span>
  );
}

/* ─── Contribution Item ─── */
function ContributionItem({ contrib, index, color }: { contrib: string; index: number; color: string }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
      className="text-sm text-gray-300 flex items-start gap-2"
    >
      <motion.div
        whileHover={{ scale: 1.3, rotate: 10 }}
        className="mt-0.5"
      >
        <ChevronRight size={14} style={{ color }} />
      </motion.div>
      {contrib}
    </motion.li>
  );
}

/* ─── Section Title ─── */
function AnimatedSectionTitle({
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        className="inline-flex items-center gap-3 mb-3"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Icon size={22} style={{ color }} />
        </motion.div>
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </motion.div>
      <motion.div
        className="h-0.5 w-24 mx-auto rounded-full mt-2"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Supervisor Card ─── */
function SupervisorCard({
  supervisor,
  index,
  type,
}: {
  supervisor: (typeof supervisors)[0];
  index: number;
  type: "academic" | "industry";
}) {
  const isAcademic = type === "academic";
  const color = isAcademic ? "#00d4ff" : "#f97316";
  const gradient = isAcademic ? "from-cyan-400 to-blue-500" : "from-orange-400 to-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group"
    >
      <div
        className="relative rounded-2xl border bg-[#111118]/80 backdrop-blur-xl p-8 h-full overflow-hidden transition-all duration-500"
        style={{ borderColor: `${color}20` }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${color}10, transparent 60%)`,
          }}
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 left-0 w-24 h-24"
          style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24"
          style={{ background: `linear-gradient(-45deg, ${color}10, transparent)` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />

        {/* Sparkle */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={16} style={{ color: `${color}50` }} />
        </motion.div>

        <div className="relative z-10">
          <div className="flex items-start gap-6">
            <AnimatedAvatar
              initials={getInitials(supervisor.name)}
              gradient={gradient}
              size="lg"
              ring
            />

            <div className="flex-1 min-w-0">
              {/* Name & Title */}
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {supervisor.name}
              </motion.h3>

              <motion.p
                className="text-sm mb-1"
                style={{ color }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                {supervisor.title}
              </motion.p>

              {supervisor.institution && (
                <motion.p
                  className="text-gray-400 text-sm mb-0.5 flex items-center gap-1.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {isAcademic ? <GraduationCap size={13} /> : <Building2 size={13} />}
                  {supervisor.institution}
                </motion.p>
              )}

              {supervisor.department && (
                <motion.p
                  className="text-gray-500 text-xs mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  {supervisor.department}
                </motion.p>
              )}

              {/* Bio */}
              <motion.p
                className="text-gray-300 text-sm mb-5 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {supervisor.bio}
              </motion.p>

              {/* Research Interests */}
              {supervisor.researchInterests && supervisor.researchInterests.length > 0 && (
                <div className="mb-5">
                  <motion.p
                    className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45 }}
                  >
                    <BookOpen size={11} style={{ color }} /> Research Interests
                  </motion.p>
                  <div className="flex flex-wrap gap-2">
                    {supervisor.researchInterests.map((interest, i) => (
                      <ResearchTag key={interest} interest={interest} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Contributions */}
              {supervisor.contributions && supervisor.contributions.length > 0 && (
                <div className="mb-4">
                  <motion.p
                    className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <Award size={11} style={{ color }} /> Contributions
                  </motion.p>
                  <ul className="space-y-1.5">
                    {supervisor.contributions.map((contrib, i) => (
                      <ContributionItem key={contrib} contrib={contrib} index={i} color={color} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Social */}
              <div className="flex gap-2 mt-4">
                <motion.a
                  href={`mailto:${supervisor.email}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                  style={{ borderColor: `${color}25`, color: `${color}80` }}
                >
                  <Mail size={14} />
                </motion.a>
                <motion.a
                  href={supervisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                  style={{ borderColor: `${color}25`, color: `${color}80` }}
                >
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function SupervisorsContent() {
  const academicSupervisors = supervisors.filter((s) => s.type === "academic");
  const industrySupervisors = supervisors.filter((s) => s.type === "industry");

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
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <GraduationCap size={16} className="text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase">Academic Excellence</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#f97316] bg-clip-text text-transparent">
              Supervisors
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Academic and industry experts guiding Phoenix to success
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            {[
              { label: "Supervisors", value: supervisors.length, icon: Star },
              { label: "Academic", value: academicSupervisors.length, icon: GraduationCap },
              { label: "Industry", value: industrySupervisors.length, icon: Briefcase },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <stat.icon size={14} className="text-[#00d4ff]" />
                  <div className="text-2xl font-bold text-[#00d4ff] font-mono">{stat.value}</div>
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Academic Supervisors */}
      {academicSupervisors.length > 0 && (
        <section className="relative py-20 px-4">
          <FloatingParticles count={12} color="#00d4ff" />
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedSectionTitle
              icon={GraduationCap}
              title="Academic Supervisors"
              subtitle="University leadership and research guidance"
              color="#00d4ff"
            />

            {/* Featured: Dr. Magda Ibrahim */}
            <div className="mt-14 mb-10">
              {academicSupervisors.filter(s => s.name.includes("Magda")).map((supervisor) => (
                <motion.div
                  key={supervisor.name}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  <div className="relative rounded-3xl border border-[#00d4ff]/30 bg-[#111118]/90 backdrop-blur-xl p-8 md:p-10 overflow-hidden group">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(0,212,255,0.15), transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(0,212,255,0.15), transparent 50%)",
                          "radial-gradient(circle at 50% 20%, rgba(0,212,255,0.15), transparent 50%)",
                          "radial-gradient(circle at 20% 50%, rgba(0,212,255,0.15), transparent 50%)",
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Rotating border glow */}
                    <motion.div
                      className="absolute -inset-[1px] rounded-3xl"
                      style={{
                        background: "conic-gradient(from 0deg, #00d4ff, #7c3aed, #00d4ff, transparent, #00d4ff)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-[1px] rounded-3xl bg-[#111118]/95" />

                    {/* Corner accents */}
                    <motion.div
                      className="absolute top-0 left-0 w-32 h-32"
                      style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.2), transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-32 h-32"
                      style={{ background: "linear-gradient(-45deg, rgba(124,58,237,0.2), transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    />

                    {/* Sparkles */}
                    <motion.div
                      className="absolute top-6 right-6"
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={24} className="text-[#00d4ff]/60" />
                    </motion.div>
                    <motion.div
                      className="absolute top-6 right-14"
                      animate={{ rotate: [360, 180, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    >
                      <Star size={18} className="text-yellow-400/60" />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4ff]/15 border border-[#00d4ff]/30 mb-6"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Star size={14} className="text-yellow-400" />
                      </motion.div>
                      <span className="text-[#00d4ff] text-xs font-bold tracking-wider uppercase">Primary Academic Supervisor</span>
                    </motion.div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
                      {/* Avatar with triple ring */}
                      <div className="relative flex-shrink-0">
                        <motion.div
                          className="absolute -inset-4 rounded-full"
                          style={{ border: "2px solid rgba(0,212,255,0.3)" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute -inset-6 rounded-full"
                          style={{ border: "1px dashed rgba(0,212,255,0.2)" }}
                          animate={{ rotate: -360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute -inset-8 rounded-full"
                          style={{ backgroundColor: "rgba(0,212,255,0.05)" }}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute -inset-10 rounded-full"
                          style={{ border: "1px solid rgba(0,212,255,0.1)" }}
                          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center relative z-10"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          style={{ boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2)" }}
                        >
                          <span className="text-3xl font-bold text-white">MI</span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {supervisor.name}
                        </motion.h3>

                        <motion.p
                          className="text-[#00d4ff] text-base font-semibold mb-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {supervisor.title}
                        </motion.p>

                        <motion.p
                          className="text-gray-400 text-sm mb-1 flex items-center gap-1.5 justify-center lg:justify-start"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.35 }}
                        >
                          <GraduationCap size={14} /> {supervisor.institution}
                        </motion.p>

                        <motion.p
                          className="text-gray-500 text-xs mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          {supervisor.department}
                        </motion.p>

                        <motion.p
                          className="text-gray-300 text-sm mb-6 leading-relaxed max-w-2xl"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.45 }}
                        >
                          {supervisor.bio}
                        </motion.p>

                        {/* Research Interests */}
                        {supervisor.researchInterests && (
                          <div className="mb-5">
                            <motion.p
                              className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 justify-center lg:justify-start"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 }}
                            >
                              <BookOpen size={11} className="text-[#00d4ff]" /> Research Interests
                            </motion.p>
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                              {supervisor.researchInterests.map((interest, i) => (
                                <motion.span
                                  key={interest}
                                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.55 + i * 0.06, type: "spring" }}
                                  whileHover={{ scale: 1.1, y: -3 }}
                                  className="px-3 py-1 text-xs rounded-full border cursor-default"
                                  style={{
                                    backgroundColor: `${tagColors[i % tagColors.length].bg}12`,
                                    color: tagColors[i % tagColors.length].text,
                                    borderColor: `${tagColors[i % tagColors.length].bg}30`,
                                  }}
                                >
                                  {interest}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contributions */}
                        {supervisor.contributions && (
                          <div className="mb-5">
                            <motion.p
                              className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 justify-center lg:justify-start"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 }}
                            >
                              <Award size={11} className="text-[#00d4ff]" /> Key Contributions
                            </motion.p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {supervisor.contributions.map((contrib, i) => (
                                <motion.li
                                  key={contrib}
                                  initial={{ opacity: 0, x: -12 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.65 + i * 0.06 }}
                                  className="text-sm text-gray-300 flex items-start gap-2 list-none"
                                >
                                  <motion.div whileHover={{ scale: 1.4, rotate: 15 }}>
                                    <ChevronRight size={14} className="mt-0.5 text-[#00d4ff]" />
                                  </motion.div>
                                  {contrib}
                                </motion.li>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Social */}
                        <div className="flex gap-3 justify-center lg:justify-start">
                          <motion.a
                            href={`mailto:${supervisor.email}`}
                            whileHover={{ scale: 1.15, y: -3 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
                          >
                            <Mail size={16} />
                          </motion.a>
                          <motion.a
                            href={supervisor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -3 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Other Academic Supervisors */}
            {academicSupervisors.filter(s => !s.name.includes("Magda")).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {academicSupervisors.filter(s => !s.name.includes("Magda")).map((supervisor, index) => (
                  <SupervisorCard
                    key={supervisor.name}
                    supervisor={supervisor}
                    index={index}
                    type="academic"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Industry Supervisors */}
      {industrySupervisors.length > 0 && (
        <section className="relative py-20 px-4 bg-[#111118]/50">
          <FloatingParticles count={12} color="#f97316" />
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedSectionTitle
              icon={Briefcase}
              title="Industry Supervisors"
              subtitle="Professional mentorship and industry expertise"
              color="#f97316"
            />

            {/* Featured: Eng. Ahmed Yasser */}
            <div className="mt-14">
              {industrySupervisors.map((supervisor) => (
                <motion.div
                  key={supervisor.name}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  <div className="relative rounded-3xl border border-[#f97316]/30 bg-[#111118]/90 backdrop-blur-xl p-8 md:p-10 overflow-hidden group">
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15), transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(249,115,22,0.15), transparent 50%)",
                          "radial-gradient(circle at 50% 20%, rgba(249,115,22,0.15), transparent 50%)",
                          "radial-gradient(circle at 20% 50%, rgba(249,115,22,0.15), transparent 50%)",
                        ],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Rotating border glow */}
                    <motion.div
                      className="absolute -inset-[1px] rounded-3xl"
                      style={{
                        background: "conic-gradient(from 0deg, #f97316, #ea4335, #f97316, transparent, #f97316)",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-[1px] rounded-3xl bg-[#111118]/95" />

                    {/* Corner accents */}
                    <motion.div
                      className="absolute top-0 left-0 w-32 h-32"
                      style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.2), transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-32 h-32"
                      style={{ background: "linear-gradient(-45deg, rgba(234,67,53,0.2), transparent)" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    />

                    {/* Sparkles */}
                    <motion.div
                      className="absolute top-6 right-6"
                      animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={24} className="text-[#f97316]/60" />
                    </motion.div>
                    <motion.div
                      className="absolute top-6 right-14"
                      animate={{ rotate: [360, 180, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    >
                      <Star size={18} className="text-yellow-400/60" />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/30 mb-6"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Briefcase size={14} className="text-[#f97316]" />
                      </motion.div>
                      <span className="text-[#f97316] text-xs font-bold tracking-wider uppercase">Industry Supervisor</span>
                    </motion.div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
                      {/* Avatar with quadruple ring */}
                      <div className="relative flex-shrink-0">
                        <motion.div
                          className="absolute -inset-4 rounded-full"
                          style={{ border: "2px solid rgba(249,115,22,0.3)" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute -inset-6 rounded-full"
                          style={{ border: "1px dashed rgba(249,115,22,0.2)" }}
                          animate={{ rotate: -360 }}
                          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute -inset-8 rounded-full"
                          style={{ backgroundColor: "rgba(249,115,22,0.05)" }}
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute -inset-10 rounded-full"
                          style={{ border: "1px solid rgba(249,115,22,0.1)" }}
                          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Orbiting dot */}
                        <motion.div
                          className="absolute -inset-5"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#f97316]" style={{ boxShadow: "0 0 10px #f97316" }} />
                        </motion.div>
                        {/* Second orbiting dot */}
                        <motion.div
                          className="absolute -inset-7"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ea4335]" style={{ boxShadow: "0 0 8px #ea4335" }} />
                        </motion.div>
                        <motion.div
                          className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 flex items-center justify-center relative z-10"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          style={{ boxShadow: "0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(249,115,22,0.2)" }}
                        >
                          <span className="text-3xl font-bold text-white">AY</span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          {supervisor.name}
                        </motion.h3>

                        <motion.p
                          className="text-[#f97316] text-base font-semibold mb-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          {supervisor.title}
                        </motion.p>

                        <motion.p
                          className="text-gray-400 text-sm mb-1 flex items-center gap-1.5 justify-center lg:justify-start"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.35 }}
                        >
                          <Building2 size={14} /> {supervisor.institution}
                        </motion.p>

                        <motion.p
                          className="text-gray-500 text-xs mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          {supervisor.department}
                        </motion.p>

                        <motion.p
                          className="text-gray-300 text-sm mb-6 leading-relaxed max-w-2xl"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.45 }}
                        >
                          {supervisor.bio}
                        </motion.p>

                        {/* Research Interests */}
                        {supervisor.researchInterests && (
                          <div className="mb-5">
                            <motion.p
                              className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 justify-center lg:justify-start"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 }}
                            >
                              <BookOpen size={11} className="text-[#f97316]" /> Expertise
                            </motion.p>
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                              {supervisor.researchInterests.map((interest, i) => (
                                <motion.span
                                  key={interest}
                                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.55 + i * 0.06, type: "spring" }}
                                  whileHover={{ scale: 1.1, y: -3 }}
                                  className="px-3 py-1 text-xs rounded-full border cursor-default"
                                  style={{
                                    backgroundColor: `${tagColors[i % tagColors.length].bg}12`,
                                    color: tagColors[i % tagColors.length].text,
                                    borderColor: `${tagColors[i % tagColors.length].bg}30`,
                                  }}
                                >
                                  {interest}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contributions */}
                        {supervisor.contributions && (
                          <div className="mb-5">
                            <motion.p
                              className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5 justify-center lg:justify-start"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 }}
                            >
                              <Award size={11} className="text-[#f97316]" /> Key Contributions
                            </motion.p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {supervisor.contributions.map((contrib, i) => (
                                <motion.li
                                  key={contrib}
                                  initial={{ opacity: 0, x: -12 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.65 + i * 0.06 }}
                                  className="text-sm text-gray-300 flex items-start gap-2 list-none"
                                >
                                  <motion.div whileHover={{ scale: 1.4, rotate: 15 }}>
                                    <ChevronRight size={14} className="mt-0.5 text-[#f97316]" />
                                  </motion.div>
                                  {contrib}
                                </motion.li>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Social */}
                        <div className="flex gap-3 justify-center lg:justify-start">
                          <motion.a
                            href={`mailto:${supervisor.email}`}
                            whileHover={{ scale: 1.15, y: -3 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                          >
                            <Mail size={16} />
                          </motion.a>
                          <motion.a
                            href={supervisor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -3 }}
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#f97316]/30 text-[#f97316] hover:bg-[#f97316]/10 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
