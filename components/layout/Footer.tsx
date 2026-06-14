"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "About", href: "/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Team", href: "/team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Architecture", href: "/architecture", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Robot Design", href: "/robot", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "AI Models", href: "/ai-models", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

const resourceLinks = [
  { label: "Live Dashboard", href: "/dashboard", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Research", href: "/research", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Publications", href: "/publications", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Performance", href: "/performance", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Gallery", href: "/gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Downloads", href: "/downloads", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/phoenix-rescue", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", color: "#94a3b8" },
  { label: "LinkedIn", href: "https://linkedin.com/company/phoenix-rescue", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", color: "#0077b5" },
  { label: "Email", href: "mailto:team@phoenix.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#ea4335" },
];

/* ─── Floating Particles ─── */
function FooterParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        w: 1.5 + ((i * 7 + 3) % 11) / 4,
        left: (i * 37 + 17) % 100,
        top: (i * 53 + 29) % 100,
        dur: 6 + ((i * 11 + 3) % 8),
        delay: (i * 0.4) % 5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w,
            height: p.w,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: "#00d4ff",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Background Orbs ─── */
function FooterOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { color: "#00d4ff", x: "10%", y: "30%", size: 250 },
        { color: "#7c3aed", x: "50%", y: "60%", size: 200 },
        { color: "#f97316", x: "80%", y: "20%", size: 180 },
        { color: "#22c55e", x: "30%", y: "80%", size: 160 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px] opacity-10"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 40 + i * 10, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.85, 1],
            opacity: [0.08, 0.18, 0.06, 0.08],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Phoenix Logo ─── */
function PhoenixLogo() {
  return (
    <div className="relative inline-block">
      {/* Rotating ring */}
      <motion.div
        className="absolute -inset-3 rounded-full"
        style={{
          border: "1px solid #00d4ff20",
          borderTopColor: "#00d4ff",
          borderRightColor: "#00d4ff60",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {/* Second ring */}
      <motion.div
        className="absolute -inset-5 rounded-full"
        style={{
          border: "1px dashed #00d4ff15",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      {/* Glow */}
      <motion.div
        className="absolute -inset-2 rounded-full"
        style={{ backgroundColor: "#00d4ff10" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Orbiting dot */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[#00d4ff]"
        style={{ top: -6, left: "50%", filter: "drop-shadow(0 0 4px #00d4ff)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-1 h-1 rounded-full bg-[#00d4ff]" style={{ transform: "translateX(18px) translateY(6px)" }} />
      </motion.div>
      {/* Logo text */}
      <motion.span
        className="relative text-3xl font-bold text-[#00d4ff] drop-shadow-[0_0_15px_rgba(0,212,255,0.6)]"
        animate={{ textShadow: ["0 0 10px #00d4ff60", "0 0 25px #00d4ff80", "0 0 10px #00d4ff60"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Phoenix
      </motion.span>
    </div>
  );
}

/* ─── Animated Link Item ─── */
function AnimatedLink({
  href,
  icon,
  label,
  external,
  color,
  index,
}: {
  href: string;
  icon: string;
  label: string;
  external?: boolean;
  color?: string;
  index: number;
}) {
  const linkContent = (
    <motion.div
      className="group flex items-center gap-3 py-2 px-3 rounded-lg transition-all"
      whileHover={{ x: 8, backgroundColor: `${color || "#00d4ff"}08` }}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
    >
      {/* Icon */}
      <motion.div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color || "#00d4ff"}15` }}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color || "#00d4ff"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={icon} />
        </svg>
      </motion.div>
      {/* Label */}
      <span className="text-sm text-[#94a3b8] group-hover:text-white transition-colors">
        {label}
      </span>
      {/* Hover arrow */}
      {external && (
        <motion.svg
          className="w-3 h-3 ml-auto text-[#94a3b8] group-hover:text-[#00d4ff] transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </motion.svg>
      )}
    </motion.div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {linkContent}
      </a>
    );
  }
  return <Link href={href}>{linkContent}</Link>;
}

/* ─── Social Icon ─── */
function SocialIcon({
  href,
  icon,
  label,
  color,
  index,
}: {
  href: string;
  icon: string;
  label: string;
  color: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.2, y: -4 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all"
        style={{
          borderColor: `${color}30`,
          backgroundColor: `${color}10`,
        }}
        whileHover={{
          borderColor: color,
          backgroundColor: `${color}20`,
          boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}15`,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={color}
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        >
          <path d={icon} />
        </svg>
      </motion.div>
      {/* Pulsing ring on hover */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ border: `1px solid ${color}30` }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#64748b] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
}

/* ─── Glowing Divider ─── */
function FooterDivider() {
  return (
    <div className="relative h-px w-full my-0">
      <div className="absolute inset-0 bg-[#2a2a3e]" />
      <motion.div
        className="absolute inset-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00d4ff, #7c3aed, #f97316, transparent)" }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── Animated Grid Background ─── */
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#2a2a3e] overflow-hidden">
      {/* Background effects */}
      <FooterOrbs />
      <FooterParticles />
      <GridLines />

      {/* Top glowing divider */}
      <FooterDivider />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <PhoenixLogo />
            </motion.div>

            <motion.p
              className="text-sm font-medium text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Intelligent Disaster Rescue System
            </motion.p>

            <motion.p
              className="text-sm text-[#94a3b8] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              An AI-powered multi-modal disaster response platform integrating
              thermal imaging, acoustic analysis, environmental monitoring, and
              structural assessment for real-time rescue operations.
            </motion.p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link, i) => (
                <SocialIcon
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  color={link.color}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Quick Links
            </motion.h3>
            <ul className="space-y-1">
              {quickLinks.map((link, i) => (
                <li key={link.href}>
                  <AnimatedLink
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    color="#00d4ff"
                    index={i}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              Resources
            </motion.h3>
            <ul className="space-y-1">
              {resourceLinks.map((link, i) => (
                <li key={link.href}>
                  <AnimatedLink
                    href={link.href}
                    icon={link.icon}
                    label={link.label}
                    color="#7c3aed"
                    index={i}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Connect */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-white uppercase tracking-wider mb-5 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#f97316]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              Get in Touch
            </motion.h3>

            {/* Contact card */}
            <motion.div
              className="rounded-xl border border-[#2a2a3e] bg-[#111118]/50 p-4 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: "#f9731640" }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Email</div>
                    <div className="text-xs text-white font-mono">team@phoenix.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Location</div>
                    <div className="text-xs text-white">NABD360 Robotics Lab</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletter-style CTA */}
            <motion.div
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00d4ff10, #7c3aed10)",
                border: "1px solid #2a2a3e",
              }}
              whileHover={{ borderColor: "#00d4ff40" }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative">
                <div className="text-xs font-semibold text-white mb-1">Join the Mission</div>
                <div className="text-[10px] text-gray-400 mb-3">Stay updated with our latest breakthroughs</div>
                <motion.button
                  className="w-full py-2 rounded-lg text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px #00d4ff40" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe to Updates
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <FooterDivider />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center justify-center gap-3">
          <motion.p
            className="text-xs text-[#94a3b8]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {new Date().getFullYear()}{" "}
            <motion.span
              className="text-[#00d4ff] font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Phoenix
            </motion.span>{" "}
            Team. All rights reserved.
          </motion.p>

          {/* Designed & Built by */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs text-[#64748b] uppercase tracking-widest">Designed &amp; Built by</span>
            <div className="flex items-center gap-3">
              {/* Left sparkle */}
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#7c3aed"
                animate={{ rotate: [0, -180, -360], scale: [0.7, 1.3, 0.7], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
              </motion.svg>

              <motion.span
                className="relative font-bold text-2xl md:text-3xl tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                animate={{
                  textShadow: [
                    "0 0 10px #00d4ff50, 0 0 30px #00d4ff25, 0 0 60px #00d4ff10",
                    "0 0 15px #7c3aed60, 0 0 40px #7c3aed30, 0 0 80px #7c3aed15",
                    "0 0 10px #f9731650, 0 0 30px #f9731625, 0 0 60px #f9731610",
                    "0 0 10px #00d4ff50, 0 0 30px #00d4ff25, 0 0 60px #00d4ff10",
                  ],
                  color: ["#00d4ff", "#7c3aed", "#f97316", "#00d4ff"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                Hazem Nabil Zaky
              </motion.span>

              {/* Right sparkle */}
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#f97316"
                animate={{ rotate: [0, 180, 360], scale: [0.7, 1.3, 0.7], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
