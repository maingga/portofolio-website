"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

// Konfigurasi posisi deck agar pas di layar kecil maupun besar
const DECK_CONFIG = [
  {
    stacked: { x: "-4%", y: 0, rotate: -4, scale: 0.96, zIndex: 1 },
    spread: { x: "-102%", y: 6, rotate: -3, scale: 1, zIndex: 1 },
  },
  {
    stacked: { x: "0%", y: -6, rotate: 0, scale: 1, zIndex: 3 },
    spread: { x: "0%", y: -10, rotate: 0, scale: 1.02, zIndex: 3 },
  },
  {
    stacked: { x: "4%", y: 4, rotate: 4, scale: 0.96, zIndex: 2 },
    spread: { x: "102%", y: 6, rotate: 3, scale: 1, zIndex: 2 },
  },
] as const;

export default function Portfolio() {
  const [isSpread, setIsSpread] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(0); // Default ke indeks pertama

  // Toggle untuk interaksi tap/klik di perangkat mobile pada deck
  const handleToggleSpread = () => {
    setIsSpread((prev) => !prev);
  };

  const memoizedProjects = useMemo(() => PROJECTS, []);

  return (
    <section
      id="portfolio"
      className="min-h-screen px-4 sm:px-6 py-20 bg-[#071207] text-white flex flex-col justify-center items-center overflow-hidden relative"
      aria-labelledby="portfolio-heading"
    >
      {/* Static Background Glow (GPU Accelerated) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-10 max-w-xl px-2"
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
            Tap the stack or select a project below to explore.
          </p>
        </motion.div>

        {/* 🌟 QUICK TABS: Solusi agar user tahu & bisa langsung pilih project yang tertutup */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 z-20 px-2">
          {memoizedProjects.map((project, index) => (
            <button
              key={project.title}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCardIndex(index);
                setIsSpread(true); // Otomatis membuka kartu saat tab diklik
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-300 border font-medium ${
                activeCardIndex === index
                  ? "bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20 scale-105"
                  : "bg-emerald-950/50 text-emerald-300/80 border-emerald-800/40 hover:bg-emerald-900/60 hover:text-white"
              }`}
            >
              {project.title.split(" ")[0]} {/* Menampilkan kata pertama dari judul */}
            </button>
          ))}
        </div>

        {/* INTERACTIVE DECK CONTAINER */}
        <div
          className="relative w-full max-w-[310px] sm:max-w-[380px] h-[460px] sm:h-[490px] flex justify-center items-center cursor-pointer select-none"
          onMouseEnter={() => setIsSpread(true)}
          onMouseLeave={() => {
            setIsSpread(false);
          }}
          onClick={handleToggleSpread}
        >
          {memoizedProjects.map((project, index) => {
            const config = DECK_CONFIG[index];
            const isCardActive = activeCardIndex === index;
            const targetPos = isSpread ? config.spread : config.stacked;

            return (
              <motion.div
                key={project.title}
                className="absolute top-0 w-full will-change-transform"
                onMouseEnter={() => setActiveCardIndex(index)}
                animate={{
                  x: targetPos.x,
                  y: targetPos.y,
                  rotate: isCardActive ? 0 : targetPos.rotate,
                  scale: isCardActive ? 1.05 : targetPos.scale,
                  zIndex: isCardActive ? 20 : targetPos.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                  mass: 0.8,
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