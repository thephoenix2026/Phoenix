"use client";

import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Floating particles canvas ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number; color: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#00d4ff", "#7c3aed", "#f97316", "#10b981", "#ef4444"];
    particles.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "80";
        ctx.fill();

        // connections
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color + Math.round((1 - d / 120) * 40).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ─── Sound wave animation ─── */
function SoundWave() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden opacity-30">
      <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 30 }, (_, i) => (
          <motion.rect
            key={i}
            x={i * 40}
            rx={2}
            fill="#00d4ff"
            initial={{ height: 10, y: 35 }}
            animate={{ height: [10, 40 + Math.random() * 30, 10], y: [35, 20, 35] }}
            transition={{ duration: 1 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
            width={30}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Typewriter ─── */
function Typewriter({ texts, speed = 80 }: { texts: string[]; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(charIdx + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(charIdx - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((textIdx + 1) % texts.length);
    }
    setDisplayed(current.substring(0, charIdx));
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-[#00d4ff]"
      >
        |
      </motion.span>
    </span>
  );
}

/* ─── Confetti ─── */
function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<{ x: number; y: number; color: string; rot: number; delay: number }[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ["#00d4ff", "#7c3aed", "#f97316", "#10b981", "#ef4444", "#eab308", "#ec4899"];
      setPieces(
        Array.from({ length: 80 }, () => ({
          x: 50 + (Math.random() - 0.5) * 40,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * 720,
          delay: Math.random() * 0.5,
        }))
      );
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: `${p.x}vw`, y: "-5vh", rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: p.rot, opacity: [1, 1, 0] }}
          transition={{ duration: 2 + Math.random() * 2, delay: p.delay, ease: "easeIn" }}
          className="absolute w-3 h-1.5 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

/* ─── Floating orbs ─── */
function FloatingOrbs() {
  const orbs = [
    { color: "#00d4ff", size: 300, x: "10%", y: "20%", dur: 20 },
    { color: "#7c3aed", size: 250, x: "80%", y: "60%", dur: 25 },
    { color: "#f97316", size: 200, x: "60%", y: "10%", dur: 22 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{ width: o.size, height: o.size, left: o.x, top: o.y, backgroundColor: o.color + "10" }}
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── 3D Tilt card ─── */
function TiltCard({ children, className = "", glowColor = "#00d4ff" }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setGlowPos({ x: 50, y: 50 }); }}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className={`relative transition-transform duration-200 ${className}`}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}20 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Animated input ─── */
function AnimatedInput({
  label, type = "text", value, onChange, required = true, placeholder,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.85 : 1,
          color: focused ? "#00d4ff" : "#94a3b8",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 origin-left pointer-events-none text-sm font-medium z-10"
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={focused ? placeholder : ""}
        className="w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-4 pt-5 pb-2 text-[#e2e8f0] focus:border-[#00d4ff] focus:outline-none transition-all duration-300"
      />
      {/* animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function AnimatedTextarea({
  label, value, onChange, required = true, placeholder, maxLength = 500,
}: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.85 : 1,
          color: focused ? "#00d4ff" : "#94a3b8",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 origin-left pointer-events-none text-sm font-medium z-10"
      >
        {label}
      </motion.label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={focused ? placeholder : ""}
        maxLength={maxLength}
        className="w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-4 pt-5 pb-2 text-[#e2e8f0] min-h-[140px] resize-y focus:border-[#00d4ff] focus:outline-none transition-all duration-300"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
      {/* character counter */}
      <div className="flex justify-end mt-1">
        <motion.span
          className="text-[10px] font-mono"
          animate={{ color: value.length > maxLength * 0.9 ? "#ef4444" : "#475569" }}
        >
          {value.length}/{maxLength}
        </motion.span>
      </div>
    </div>
  );
}

/* ─── Animated select ─── */
function AnimatedSelect({
  label, value, onChange, options, required = true,
}: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? -28 : 0,
          scale: active ? 0.85 : 1,
          color: focused ? "#00d4ff" : "#94a3b8",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3.5 origin-left pointer-events-none text-sm font-medium z-10"
      >
        {label}
      </motion.label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-4 pt-5 pb-2 text-[#e2e8f0] focus:border-[#00d4ff] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
      >
        <option value="" disabled hidden></option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {/* dropdown arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <motion.svg animate={{ rotate: focused ? 180 : 0 }} width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 4l4 4 4-4" stroke="#94a3b8" strokeWidth="2" fill="none" />
        </motion.svg>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

/* ─── Main ─── */
const contactInfo = [
  { label: "Email", value: "team@phoenix.com", icon: "✉", link: "mailto:team@phoenix.com", color: "#00d4ff" },
  { label: "GitHub", value: "github.com/phoenix-rescue", icon: "💻", link: "https://github.com/phoenix-rescue", color: "#7c3aed" },
  { label: "LinkedIn", value: "linkedin.com/company/phoenix-rescue", icon: "💼", link: "https://linkedin.com/company/phoenix-rescue", color: "#0077b5" },
  { label: "Location", value: "University of Technology, Engineering Building", icon: "📍", link: "#", color: "#10b981" },
];

const teamContacts = [
  { name: "Hazem Nabil Zaky", role: "Team Lead & AI Developer", email: "hazem@phoenix.com", color: "#00d4ff" },
  { name: "Mahmoud Dahy", role: "Mechanical Design Lead", email: "mahmoud@phoenix.com", color: "#7c3aed" },
  { name: "Dr. Magda Ibrahim", role: "Academic Supervisor", email: "magda@university.edu", color: "#f97316" },
];

const socials = [
  { name: "GitHub", icon: "💻", color: "#7c3aed" },
  { name: "LinkedIn", icon: "💼", color: "#0077b5" },
  { name: "Twitter/X", icon: "𝕏", color: "#e2e8f0" },
  { name: "YouTube", icon: "▶", color: "#ef4444" },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <ParticleCanvas />
      <FloatingOrbs />
      <Confetti active={submitted} />

      {/* Hero */}
      <section className="relative flex items-center justify-center py-36 overflow-hidden">
        <GridBackground />
        <SoundWave />
        <div className="relative z-10 text-center px-4">
          {/* floating rings */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-[#00d4ff]/10"
                animate={{ scale: [1, 1.3 + i * 0.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, delay: i * 1.3, repeat: Infinity }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 flex items-center justify-center mb-8 border border-[#00d4ff]/30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span className="text-4xl">📡</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#f97316] bg-clip-text text-transparent">
              Contact Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto h-8"
          >
            <Typewriter
              texts={[
                "Get in touch with the Phoenix team",
                "Building the future of disaster rescue",
                "AI-powered robots saving lives",
                "Ready to collaborate with you",
              ]}
            />
          </motion.p>

          {/* live status dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#10b981]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[10px] text-[#10b981] font-mono">ONLINE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30">
              <span className="text-[10px] text-[#00d4ff] font-mono">AVG. RESPONSE: 2H</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form - 3 cols */}
            <div className="lg:col-span-3">
              <SectionHeader title="Send a Message" subtitle="We'd love to hear from you" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <GlowCard className="p-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#10b981]/10 flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.span
                            className="text-4xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                          >
                            ✓
                          </motion.span>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400 mb-6">We&apos;ll get back to you within 24 hours.</p>
                        <motion.button
                          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                          className="px-6 py-2 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm hover:bg-[#00d4ff]/20 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Send Another Message
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AnimatedInput label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
                        <AnimatedInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
                        <AnimatedSelect
                          label="Subject"
                          value={form.subject}
                          onChange={(v) => setForm({ ...form, subject: v })}
                          options={[
                            { value: "general", label: "General Inquiry" },
                            { value: "collaboration", label: "Collaboration" },
                            { value: "media", label: "Media" },
                            { value: "technical", label: "Technical Support" },
                          ]}
                        />
                        <AnimatedTextarea label="Message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} placeholder="Your message..." />

                        <motion.button
                          type="submit"
                          disabled={sending}
                          className="relative w-full py-3.5 rounded-lg font-medium text-sm overflow-hidden border border-[#00d4ff]/30 text-[#00d4ff] disabled:opacity-60"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          style={{
                            background: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(124,58,237,0.15) 100%)",
                          }}
                        >
                          {/* pulse ring */}
                          <motion.div
                            className="absolute inset-0 rounded-lg border-2 border-[#00d4ff]/40"
                            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          {/* shimmer */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {sending ? (
                              <>
                                <motion.div
                                  className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <span>Send Message</span>
                                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                  →
                                </motion.span>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </GlowCard>
              </motion.div>
            </div>

            {/* Contact Info - 2 cols */}
            <div className="lg:col-span-2">
              <SectionHeader title="Contact Info" subtitle="Other ways to reach us" />
              <div className="mt-12 space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 30, rotateY: -10 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <TiltCard glowColor={item.color}>
                      <GlowCard className="p-5" glowColor={item.color}>
                        <a href={item.link} className="flex items-center gap-4">
                          <motion.div
                            className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                            style={{ backgroundColor: `${item.color}15` }}
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div className="min-w-0">
                            <p className="text-[#94a3b8] text-sm">{item.label}</p>
                            <p className="text-white text-sm font-medium truncate">{item.value}</p>
                          </div>
                        </a>
                      </GlowCard>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>

              {/* live status card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6"
              >
                <GlowCard className="p-5" glowColor="#10b981">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-[#10b981]"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-[#10b981] font-bold font-mono">SYSTEM STATUS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "UPTIME", value: "99.97%", color: "#10b981" },
                      { label: "RESPONSE", value: "<2hr", color: "#00d4ff" },
                      { label: "PROJECTS", value: "12+", color: "#7c3aed" },
                      { label: "MEMBERS", value: "8", color: "#f97316" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-[8px] text-[#475569] font-mono">{s.label}</p>
                        <p className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Contacts */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Team Contacts" subtitle="Reach out to specific team members" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamContacts.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              >
                <TiltCard glowColor={member.color}>
                  <GlowCard className="p-6 text-center h-full" glowColor={member.color}>
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center relative"
                      style={{ backgroundColor: `${member.color}15` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* orbiting ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-dashed"
                        style={{ borderColor: `${member.color}30` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-2xl font-bold" style={{ color: member.color }}>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </motion.div>
                    <h4 className="text-white font-bold mb-1">{member.name}</h4>
                    <p className="text-sm mb-3" style={{ color: member.color }}>{member.role}</p>
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {member.email}
                      <span className="text-xs">↗</span>
                    </motion.a>
                  </GlowCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader title="Follow Us" subtitle="Stay connected on social media" align="center" />
          <div className="mt-12 flex items-center justify-center gap-5">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                initial={{ opacity: 0, y: 20, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${social.color}10`,
                  border: `1px solid ${social.color}30`,
                  color: social.color,
                }}
              >
                {/* hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
                  style={{ boxShadow: `0 0 30px ${social.color}40, inset 0 0 20px ${social.color}10` }}
                />
                <span className="relative z-10">{social.icon}</span>
                {/* tooltip */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#1a1a2e] text-[9px] text-white font-mono whitespace-nowrap opacity-0 pointer-events-none"
                  whileHover={{ opacity: 1 }}
                >
                  {social.name}
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-[#475569] text-sm font-mono"
          >
            Built with passion by the Phoenix Rescue Team
          </motion.p>
        </div>
      </section>
    </main>
  );
}
