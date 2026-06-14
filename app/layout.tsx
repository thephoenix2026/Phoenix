import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import LoadingScreen from "@/components/layout/LoadingScreen";
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phoenix | Intelligent Disaster Rescue System",
  description:
    "AI-powered disaster response platform for real-time threat detection, intelligent evacuation routing, and coordinated rescue operations.",
  keywords: ["disaster response", "AI", "robotics", "rescue system", "thermal imaging", "deep learning"],
  openGraph: {
    title: "Phoenix | Intelligent Disaster Rescue System",
    description: "AI-powered disaster response robotic platform for real-time survivor detection and rescue operations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0a0a0f] text-[#e2e8f0] min-h-screen font-sans antialiased">
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
