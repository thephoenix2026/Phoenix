import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { MissionStatement } from "@/components/home/MissionStatement";
import { KeyAchievements } from "@/components/home/KeyAchievements";
import { QuickAccess } from "@/components/home/QuickAccess";
import TechStack from "@/components/home/TechStack";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";
import ResearchTimeline from "@/components/interactive/ResearchTimeline";

export default function Home() {
  return (
    <>
      <Hero />
      <MissionStatement />
      <ImpactStats />
      <TechStack />
      <HowItWorks />
      <KeyAchievements />
      <section className="py-24 px-4 bg-[#0a0a10] relative overflow-hidden">
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00d4ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#7c3aed]/5 rounded-full blur-[80px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              Development Journey
            </span>
          </h2>
          <p className="text-[#94a3b8] text-center mb-12">
            From concept to reality — our 9-month research and development
            timeline
          </p>
          <ResearchTimeline />
        </div>
      </section>
      <QuickAccess />
      <CTASection />
    </>
  );
}
