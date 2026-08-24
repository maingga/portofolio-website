"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

const PROJECTS: ProjectCardProps[] = [
  {
    title: "Sport Center Reservation System",
    description:
      "A web application for booking sports fields, featuring online reservations, payment integration, and user management.",
    image: "/projects/sport-center.webp",
    tech: ["Laravel", "Next.js", "MySQL", "Midtrans"],
    github: "https://github.com/maingga/si-reservasi-sport-center.git",
    demo: "",
  },
  {
    title: "Smart Greenhouse Automation",
    description:
      "An ESP32-based automated monitoring system with a real-time dashboard to control temperature, humidity, and lighting conditions.",
    image: "/projects/iot.webp",
    tech: ["ESP32", "DHT11", "LDR", "Blynk", "Telegram"],
    github: "https://github.com/maingga/smart-irrigation-blynk-telegram.git",
    demo: "",
  },
  {
    title: "Wedding Equipment Rental App",
    description:
      "A modern mobile app for managing wedding equipment rentals, built using Flutter with real-time authentication and backend powered by Firebase.",
    image: "/projects/wedding.webp",
    tech: ["Flutter", "Firebase", "Cloud Firestore"],
    github: "https://github.com/maingga/SI-sewa-pernikahan-web-mobile-UD-JTJ.git",
    demo: "",
  },
];

// Konfigurasi posisi deck untuk Desktop
const DECK_CONFIG = [
  {
    stacked: { x: "-4%", y: 0, rotate: -4, scale: 0.96, zIndex: 1 },
    spread: { x: "-108%", y: 4, rotate: -3, scale: 1, zIndex: 1 },
  },
  {
    stacked: { x: "0%", y: -6, rotate: 0, scale: 1, zIndex: 3 },
    spread: { x: "0%", y: -12, rotate: 0, scale: 1.03, zIndex: 3 },
  },
  {
    stacked: { x: "4%", y: 4, rotate: 4, scale: 0.96, zIndex: 2 },
    spread: { x: "108%", y: 4, rotate: 3, scale: 1, zIndex: 2 },
  },
] as const;

export default function Portfolio() {
  // Desktop States (Auto-Hover / Focus)
  const [isSpread, setIsSpread] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Mobile States
  const [mobileCards, setMobileCards] = useState(PROJECTS);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Handler untuk menggeser kartu di mobile secara efisien
  const handleMobileSwipe = useCallback(() => {
    setMobileCards((prev) => {
      const copy = [...prev];
      const moved = copy.shift();
      if (moved) copy.push(moved);
      return copy;
    });
    setMobileIndex((prev) => (prev + 1) % PROJECTS.length);
  }, []);

  // Handler untuk langsung melompat ke indeks proyek tertentu via dot indicator
  const handleSelectMobileCard = useCallback((targetIndex: number) => {
    const diff = (targetIndex - mobileIndex + PROJECTS.length) % PROJECTS.length;
    if (diff === 0) return;

    setMobileCards((prev) => {
      const copy = [...prev];
      for (let i = 0; i < diff; i++) {
        const moved = copy.shift();
        if (moved) copy.push(moved);
      }
      return copy;
    });
    setMobileIndex(targetIndex);
  }, [mobileIndex]);

  return (
    <section
      id="portfolio"
      className="min-h-screen px-6 sm:px-16 lg:px-24 py-20 bg-[#071207] text-white flex flex-col justify-center items-center overflow-hidden relative"
      aria-labelledby="portfolio-heading"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 max-w-xl px-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full inline-block mb-3">
            Featured Works
          </span>
          <h2
            id="portfolio-heading"
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-lime-300"
          >
            My Projects
          </h2>
          <p className="text-emerald-200/60 text-xs sm:text-sm mt-3">
            <span className="block sm:hidden">Swipe left/right or tap dots to explore.</span>
            <span className="hidden sm:inline">Hover over the card stack to explore the projects.</span>
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* 1. MOBILE VIEW: INTERACTIVE SWIPEABLE STACK              */}
        {/* ======================================================== */}
        <div className="flex sm:hidden flex-col items-center w-full">
          <div className="relative w-full max-w-[310px] h-[460px] flex justify-center items-center select-none">
            <AnimatePresence mode="popLayout">
              {mobileCards.map((project, index) => {
                const isTopCard = index === 0;

                return (
                  <motion.div
                    key={`mobile-${project.title}-${index}`}
                    className="absolute top-0 w-full cursor-grab active:cursor-grabbing touch-none will-change-transform"
                    style={{ zIndex: mobileCards.length - index }}
                    drag={isTopCard ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.9}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 80) {
                        handleMobileSwipe();
                      }
                    }}
                    animate={{
                      scale: 1 - index * 0.04,
                      y: index * 12,
                      rotate: isTopCard ? 0 : index % 2 === 0 ? 3 : -3,
                      opacity: index > 2 ? 0 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Interactive Mobile Indicator & Counter */}
          <div className="flex items-center gap-2 mt-6">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectMobileCard(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === mobileIndex ? "w-6 bg-emerald-400" : "w-1.5 bg-emerald-800/60 hover:bg-emerald-700"
                }`}
              />
            ))}
            <span className="text-xs text-emerald-400/70 ml-2 font-mono">
              {mobileIndex + 1} / {PROJECTS.length}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DESKTOP VIEW: AUTO-HOVER SPREAD DECK                  */}
        {/* ======================================================== */}
        <div
          className="hidden sm:flex relative w-full max-w-[380px] h-[490px] justify-center items-center select-none"
          onMouseEnter={() => setIsSpread(true)}
          onMouseLeave={() => {
            setIsSpread(false);
            setActiveCardIndex(null);
          }}
          onFocus={() => setIsSpread(true)}
          onBlur={() => {
            setIsSpread(false);
            setActiveCardIndex(null);
          }}
        >
          {PROJECTS.map((project, index) => {
            const config = DECK_CONFIG[index];
            const isCardActive = activeCardIndex === index;
            const targetPos = isSpread ? config.spread : config.stacked;

            return (
              <motion.div
                key={`desktop-${project.title}`}
                className="absolute top-0 w-full will-change-transform cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl"
                tabIndex={0}
                onMouseEnter={() => setActiveCardIndex(index)}
                onMouseLeave={() => setActiveCardIndex(null)}
                onFocus={() => {
                  setIsSpread(true);
                  setActiveCardIndex(index);
                }}
                animate={{
                  x: targetPos.x,
                  y: targetPos.y,
                  rotate: isCardActive && isSpread ? 0 : targetPos.rotate,
                  scale: isCardActive && isSpread ? 1.06 : targetPos.scale,
                  zIndex: isCardActive && isSpread ? 20 : targetPos.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 20,
                  mass: 0.7,
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}