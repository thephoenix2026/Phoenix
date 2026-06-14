"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Supervisors", href: "/supervisors" },
  { label: "Architecture", href: "/architecture" },
  { label: "Robot", href: "/robot" },
  { label: "AI Models", href: "/ai-models" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Research", href: "/research" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/* ─── Cursor Glow (tracks mouse position via ref) ─── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX - 130}px`;
      el.style.top = `${e.clientY - 130}px`;
      if (!visibleRef.current) {
        visibleRef.current = true;
        el.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visibleRef.current = false;
      el.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-[70] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        width: 260,
        height: 260,
        background: "radial-gradient(circle, #00d4ff12, #7c3aed08, transparent 70%)",
        filter: "blur(30px)",
        willChange: "left, top",
      }}
    />
  );
}

/* ─── Holographic Sweep ─── */
function HolographicSweep() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-0 h-full"
        style={{
          width: "30%",
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.04), rgba(124,58,237,0.06), rgba(249,115,22,0.04), transparent)",
          filter: "blur(20px)",
        }}
        animate={{ left: ["-30%", "130%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
      />
    </div>
  );
}

/* ─── Floating Particles with Connecting Lines ─── */
function NavParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        w: 1.5 + (((i * 7 + 3) % 5) / 5) * 2,
        left: (i * 31 + 7) % 100,
        top: 10 + ((i * 43 + 17) % 80),
        dur: 4 + ((i * 7) % 5),
        delay: (i * 0.4) % 3,
        yRange: 6 + ((i * 3) % 8),
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
            backgroundColor: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#f97316",
          }}
          animate={{
            y: [-p.yRange, p.yRange, -p.yRange],
            x: [-3, 3, -3],
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.4, 0.8],
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

/* ─── Animated Energy Ring behind Logo ─── */
function EnergyRing() {
  return (
    <motion.div
      className="absolute -inset-3 rounded-full border border-[#00d4ff]/20"
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
        borderColor: [
          "rgba(0,212,255,0.2)",
          "rgba(124,58,237,0.3)",
          "rgba(249,115,22,0.2)",
          "rgba(0,212,255,0.2)",
        ],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 3, repeat: Infinity },
        borderColor: { duration: 4, repeat: Infinity },
      }}
    />
  );
}

/* ─── Heartbeat Glow ─── */
function HeartbeatGlow() {
  return (
    <motion.div
      className="absolute -inset-4 rounded-full"
      style={{
        background: "radial-gradient(circle, #00d4ff15, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.15, 1, 1.1, 1],
        opacity: [0.3, 0.7, 0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Animated Logo ─── */
function NavLogo() {
  return (
    <Link href="/" className="flex-shrink-0 relative group">
      {/* Glow behind logo */}
      <motion.div
        className="absolute -inset-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, #00d4ff20, #7c3aed10, transparent)",
        }}
      />
      <div className="relative flex items-center gap-2.5 py-1">
        {/* Phoenix icon container */}
        <motion.div
          className="relative w-10 h-10 flex items-center justify-center"
          animate={{
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <HeartbeatGlow />
          <EnergyRing />

          {/* Phoenix SVG — detailed with flapping wings */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="relative z-10"
          >
            {/* Head */}
            <motion.circle
              cx="14"
              cy="8"
              r="3"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="1.2"
              animate={{
                r: [3, 3.3, 3],
                stroke: ["#00d4ff", "#7c3aed", "#00d4ff"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Left eye */}
            <motion.circle
              cx="12.5"
              cy="7.5"
              r="0.7"
              fill="#00d4ff"
              animate={{
                r: [0.7, 1, 0.7],
                fill: ["#00d4ff", "#f97316", "#00d4ff"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Right eye */}
            <motion.circle
              cx="15.5"
              cy="7.5"
              r="0.7"
              fill="#00d4ff"
              animate={{
                r: [0.7, 1, 0.7],
                fill: ["#00d4ff", "#f97316", "#00d4ff"],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            {/* Beak */}
            <motion.path
              d="M13 9.5 L14 11 L15 9.5"
              stroke="#f97316"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              animate={{ d: ["M13 9.5 L14 11 L15 9.5", "M13 9.5 L14 11.5 L15 9.5", "M13 9.5 L14 11 L15 9.5"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            {/* Body */}
            <motion.path
              d="M14 11 C12 13 10 17 9 20 L14 18 L19 20 C18 17 16 13 14 11Z"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="1"
              animate={{
                stroke: ["#00d4ff", "#7c3aed", "#00d4ff"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Left wing — flapping */}
            <motion.path
              d="M10 14 C7 11 4 10 2 12 C4 13 7 15 9 17"
              stroke="#00d4ff"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M10 14 C7 11 4 10 2 12 C4 13 7 15 9 17",
                  "M10 14 C7 10 3 8 1 10 C3 12 7 15 9 17",
                  "M10 14 C7 11 4 10 2 12 C4 13 7 15 9 17",
                ],
                stroke: ["#00d4ff", "#f97316", "#00d4ff"],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right wing — flapping */}
            <motion.path
              d="M18 14 C21 11 24 10 26 12 C24 13 21 15 19 17"
              stroke="#00d4ff"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              animate={{
                d: [
                  "M18 14 C21 11 24 10 26 12 C24 13 21 15 19 17",
                  "M18 14 C21 10 25 8 27 10 C25 12 21 15 19 17",
                  "M18 14 C21 11 24 10 26 12 C24 13 21 15 19 17",
                ],
                stroke: ["#00d4ff", "#f97316", "#00d4ff"],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />

            {/* Tail feathers */}
            <motion.path
              d="M9 20 L6 24 M14 18 L14 25 M19 20 L22 24"
              stroke="#f97316"
              strokeWidth="0.7"
              strokeLinecap="round"
              animate={{
                stroke: ["#f97316", "#00d4ff", "#f97316"],
                y1: [0, -1, 0],
                y2: [0, 2, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Fire particles from head */}
            <motion.circle
              cx="14"
              cy="4"
              r="0.5"
              fill="#f97316"
              animate={{
                cy: [4, 1, -1],
                r: [0.5, 0.8, 0],
                opacity: [0.8, 0.5, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="12.5"
              cy="5"
              r="0.4"
              fill="#f97316"
              animate={{
                cy: [5, 2, 0],
                r: [0.4, 0.6, 0],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
            />
            <motion.circle
              cx="15.5"
              cy="5"
              r="0.4"
              fill="#7c3aed"
              animate={{
                cy: [5, 2, 0],
                r: [0.4, 0.7, 0],
                opacity: [0.7, 0.4, 0],
              }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.8 }}
            />
          </svg>

          {/* Orbiting dot */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              filter: "drop-shadow(0 0 4px #00d4ff)",
              backgroundColor: "#00d4ff",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
              style={{ transform: "translateX(16px)" }}
            />
          </motion.div>

          {/* Second orbiting dot (opposite) */}
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-[#7c3aed]"
            style={{
              filter: "drop-shadow(0 0 3px #7c3aed)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-1 h-1 rounded-full bg-[#7c3aed]"
              style={{ transform: "translateX(18px)" }}
            />
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="flex flex-col">
          <motion.span
            className="text-xl font-bold leading-tight"
            animate={{
              color: ["#00d4ff", "#7c3aed", "#00d4ff"],
              textShadow: [
                "0 0 8px #00d4ff40, 0 0 20px #00d4ff20",
                "0 0 12px #7c3aed50, 0 0 24px #7c3aed30",
                "0 0 8px #00d4ff40, 0 0 20px #00d4ff20",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Phoenix
          </motion.span>
          <motion.span
            className="text-[9px] font-mono tracking-[0.25em] uppercase leading-none"
            animate={{
              color: ["#94a3b8", "#00d4ff", "#94a3b8"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            NABD360
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Enhanced Nav Link ─── */
function NavLink({
  link,
  isActive,
}: {
  link: { label: string; href: string };
  isActive: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group overflow-hidden",
        isActive
          ? "text-[#00d4ff]"
          : "text-[#94a3b8] hover:text-white",
      )}
    >
      {/* Hover morphing pill glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={false}
        animate={
          isActive
            ? {
                background: [
                  "linear-gradient(135deg, #00d4ff08, #00d4ff04)",
                  "linear-gradient(135deg, #00d4ff06, #00d4ff08)",
                  "linear-gradient(135deg, #00d4ff08, #00d4ff04)",
                ],
                boxShadow: [
                  "inset 0 0 20px #00d4ff08",
                  "inset 0 0 30px #00d4ff12",
                  "inset 0 0 20px #00d4ff08",
                ],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Hover ripple on mouse enter */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <span className="relative z-10">{link.label}</span>

      {/* Active indicator — morphing blob */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.div
            className="h-0.5 rounded-full"
            style={{
              width: "70%",
              backgroundImage: "linear-gradient(90deg, #00d4ff, #7c3aed, #00d4ff)",
              backgroundSize: "200% 100%",
              boxShadow: "0 0 10px #00d4ff80, 0 0 20px #00d4ff40, 0 0 30px #7c3aed20",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
              boxShadow: [
                "0 0 10px #00d4ff80, 0 0 20px #00d4ff40, 0 0 30px #7c3aed20",
                "0 0 15px #7c3aed80, 0 0 25px #7c3aed40, 0 0 35px #00d4ff20",
                "0 0 10px #00d4ff80, 0 0 20px #00d4ff40, 0 0 30px #7c3aed20",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* Breathing dot for active */}
      {isActive && (
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#f97316]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              "0 0 4px #f97316",
              "0 0 10px #f97316",
              "0 0 4px #f97316",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </Link>
  );
}

/* ─── Mobile Menu Item ─── */
function MobileMenuItem({
  link,
  isActive,
  index,
  onClick,
}: {
  link: { label: string; href: string };
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, rotateY: 15 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 350,
        damping: 28,
      }}
      style={{ perspective: "600px" }}
    >
      <Link
        href={link.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group",
          isActive
            ? "text-[#00d4ff] border border-[#00d4ff]/20"
            : "text-[#94a3b8] hover:text-white border border-transparent",
        )}
      >
        {/* Background glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, #00d4ff10, #7c3aed08, #00d4ff05)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Sound wave lines behind text */}
        <div className="relative z-10 flex items-center gap-3 flex-1">
          {isActive && (
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3].map((j) => (
                <motion.div
                  key={j}
                  className="w-0.5 rounded-full bg-[#00d4ff]"
                  animate={{
                    height: [4, 10 + j * 2, 4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: j * 0.1,
                  }}
                />
              ))}
            </div>
          )}
          <span>{link.label}</span>
        </div>

        {/* Active pulse dot */}
        {isActive && (
          <motion.div
            className="relative z-10"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#00d4ff]"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Hover arrow */}
        <motion.div
          className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-current"
          >
            <path
              d="M4.5 2.5L8 6L4.5 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ─── Hamburger Button with Energy Rings ─── */
function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors rounded-lg"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.9 }}
    >
      {/* Energy rings around button */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-lg border border-[#00d4ff]/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: [0, 0.5, 0], rotate: 360 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-lg border border-[#7c3aed]/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.4, opacity: [0, 0.3, 0], rotate: -360 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Glow behind */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={
          isOpen
            ? {
                background: [
                  "radial-gradient(circle, #00d4ff10, transparent)",
                  "radial-gradient(circle, #7c3aed10, transparent)",
                  "radial-gradient(circle, #00d4ff10, transparent)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="flex flex-col gap-1.5 w-5 relative z-10">
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 6, backgroundColor: "#00d4ff" }
              : { rotate: 0, y: 0 }
          }
          className="block h-0.5 w-full bg-current origin-center rounded-full"
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        />
        <motion.span
          animate={
            isOpen
              ? { opacity: 0, scaleX: 0, x: 10 }
              : { opacity: 1, scaleX: 1, x: 0 }
          }
          className="block h-0.5 w-full bg-current rounded-full"
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: -6, backgroundColor: "#00d4ff" }
              : { rotate: 0, y: 0 }
          }
          className="block h-0.5 w-full bg-current origin-center rounded-full"
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        />
      </div>
    </motion.button>
  );
}

/* ─── Scroll Progress with Glowing Tip ─── */
function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-[#1a1a2e]/80">
      {/* Track background shimmer */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.05), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Progress fill */}
      <motion.div
        className="h-full relative overflow-hidden"
          style={{
            width: `${progress}%`,
            backgroundImage:
              "linear-gradient(90deg, #00d4ff, #7c3aed, #f97316, #00d4ff)",
            backgroundSize: "300% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "300% 50%", "0% 50%"],
          }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        {/* Shimmer on progress */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Glowing tip */}
      {progress > 1 && (
        <motion.div
          className="absolute top-0 h-[3px] w-8 rounded-full"
          style={{
            left: `calc(${progress}% - 16px)`,
            background:
              "radial-gradient(circle, #00d4ff, transparent)",
            filter: "blur(3px)",
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            filter: ["blur(2px)", "blur(4px)", "blur(2px)"],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Floating particles along progress */}
      {progress > 5 && (
        <>
          <motion.div
            className="absolute top-0 w-1 h-1 rounded-full bg-[#00d4ff]"
            style={{ left: `${progress * 0.3}%` }}
            animate={{
              y: [-2, 2, -2],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-0 w-0.5 h-0.5 rounded-full bg-[#7c3aed]"
            style={{ left: `${progress * 0.6}%` }}
            animate={{
              y: [-1, 3, -1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <CursorGlow />
      <ScrollProgress progress={scrollProgress} />

      {/* ─── Main Navbar ─── */}
      <nav
        className={cn(
          "fixed top-[3px] left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#0a0a0f]/85 backdrop-blur-2xl border-b border-[#2a2a3e]/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-[#0a0a0f]/60 backdrop-blur-xl border-b border-[#2a2a3e]/40",
        )}
      >
        {/* Animated bottom border glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            backgroundImage: isScrolled
              ? "linear-gradient(90deg, transparent, #00d4ff40, #7c3aed40, #00d4ff40, transparent)"
              : "none",
            backgroundSize: "200% 100%",
          }}
          animate={
            isScrolled
              ? { backgroundPosition: ["0% 0%", "200% 0%"] }
              : {}
          }
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)",
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <HolographicSweep />
        <NavParticles />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLogo />

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <NavLink
                    key={link.href}
                    link={link}
                    isActive={isActive}
                  />
                );
              })}
            </div>

            <HamburgerButton isOpen={isOpen} onClick={handleClose} />
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="md:hidden overflow-hidden border-t border-[#2a2a3e]/60 bg-[#0a0a0f]/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-4 space-y-1 relative">
                {/* Background orbs */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-[#00d4ff]/5 rounded-full blur-[60px]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-[#7c3aed]/5 rounded-full blur-[50px]"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#f97316]/3 rounded-full blur-[40px]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {NAV_LINKS.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <MobileMenuItem
                      key={link.href}
                      link={link}
                      isActive={isActive}
                      index={index}
                      onClick={handleClose}
                    />
                  );
                })}
              </div>

              {/* Bottom energy line */}
              <div className="px-4 pb-4">
                <div className="relative h-px bg-[#2a2a3e]/40">
                  <motion.div
                    className="absolute inset-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #00d4ff40, #7c3aed40, transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
