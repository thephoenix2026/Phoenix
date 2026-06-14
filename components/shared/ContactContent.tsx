"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import GridBackground from "@/components/shared/GridBackground";
import { useState } from "react";

const contactInfo = [
  { label: "Email", value: "team@phoenix.com", icon: "✉", link: "mailto:team@phoenix.com", color: "#00d4ff" },
  { label: "GitHub", value: "github.com/phoenix-rescue", icon: "💻", link: "https://github.com/phoenix-rescue", color: "#7c3aed" },
  { label: "LinkedIn", value: "linkedin.com/company/phoenix-rescue", icon: "💼", link: "https://linkedin.com/company/phoenix-rescue", color: "#0077b5" },
  { label: "Location", value: "University of Technology, Engineering Building", icon: "📍", link: "#", color: "#10b981" },
];

const teamContacts = [
  { name: "Ahmad Al-Rashid", role: "Team Lead", email: "ahmad@phoenix.com" },
  { name: "Fatima Hassan", role: "Hardware Lead", email: "fatima@phoenix.com" },
  { name: "Omar Khalil", role: "Software Lead", email: "omar@phoenix.com" },
];

const socials = [
  { name: "GitHub", icon: "💻", color: "#7c3aed" },
  { name: "LinkedIn", icon: "💼", color: "#0077b5" },
  { name: "Twitter/X", icon: "𝕏", color: "#e2e8f0" },
  { name: "YouTube", icon: "▶", color: "#ef4444" },
];

export default function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#111118] border border-[#2a2a3e] rounded-lg px-4 py-3 text-[#e2e8f0] placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none focus:ring-1 focus:ring-[#00d4ff]/20 transition-all duration-300";

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative flex items-center justify-center py-32 overflow-hidden">
        <GridBackground />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#00a0cc] bg-clip-text text-transparent">
              Contact Us
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Get in touch with the Phoenix team
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form - 3 cols */}
            <div className="lg:col-span-3">
              <SectionHeader
                title="Send a Message"
                subtitle="We'd love to hear from you"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-12"
              >
                <GlowCard className="p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                        <span className="text-3xl">✓</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[#94a3b8] text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Your name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[#94a3b8] text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className={inputClass}
                          placeholder="you@example.com"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[#94a3b8] text-sm font-medium mb-2">
                          Subject
                        </label>
                        <select
                          className={inputClass}
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="media">Media</option>
                          <option value="technical">Technical Support</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#94a3b8] text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          className={`${inputClass} min-h-[140px] resize-y`}
                          placeholder="Your message..."
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#00d4ff]/15 text-[#00d4ff] rounded-lg border border-[#00d4ff]/30 hover:bg-[#00d4ff]/25 transition-all duration-300 font-medium text-sm shadow-[0_0_20px_#00d4ff22] hover:shadow-[0_0_30px_#00d4ff44]"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </GlowCard>
              </motion.div>
            </div>

            {/* Contact Info - 2 cols */}
            <div className="lg:col-span-2">
              <SectionHeader
                title="Contact Info"
                subtitle="Other ways to reach us"
              />
              <div className="mt-12 space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlowCard className="p-5" glowColor={item.color}>
                      <a href={item.link} className="flex items-center gap-4">
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center text-xl shrink-0"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#94a3b8] text-sm">{item.label}</p>
                          <p className="text-white text-sm font-medium truncate">{item.value}</p>
                        </div>
                      </a>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Contacts */}
      <section className="relative py-24 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Team Contacts"
            subtitle="Reach out to specific team members"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamContacts.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlowCard className="p-6 text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#00d4ff]/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#00d4ff]">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h4 className="text-white font-bold mb-1">{member.name}</h4>
                  <p className="text-[#00d4ff] text-sm mb-3">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-400 text-sm hover:text-[#00d4ff] transition-colors"
                  >
                    {member.email}
                  </a>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title="Follow Us"
            subtitle="Stay connected on social media"
            align="center"
          />
          <div className="mt-12 flex items-center justify-center gap-4">
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                style={{
                  backgroundColor: `${social.color}10`,
                  border: `1px solid ${social.color}30`,
                  color: social.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 25px ${social.color}44`;
                  e.currentTarget.style.borderColor = `${social.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = `${social.color}30`;
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
