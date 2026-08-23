"use client";

import { motion } from "framer-motion";
import TechCard from "./TechCard";

const TECH_STACK = [
  { name: "HTML", icon: "/tech/html5.svg" },
  { name: "CSS", icon: "/tech/css.svg" },
  { name: "JavaScript", icon: "/tech/javascript.svg" },
  { name: "TypeScript", icon: "/tech/typescript.svg" },
  { name: "React", icon: "/tech/react.svg" },
  { name: "Next.js", icon: "/tech/nextdotjs.svg" },
  { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  { name: "Laravel", icon: "/tech/laravel.svg" },
  { name: "Flutter", icon: "/tech/flutter.svg" },
  { name: "Firebase", icon: "/tech/firebase.svg" },
  { name: "MySQL", icon: "/tech/mysql.svg" },
  { name: "ESP32", icon: "/tech/espressif.svg" },
] as const;

// Variasi animasi ringkas di level parent
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05, // Menjalankan animasi anak secara bergantian tanpa banyak listener
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="min-h-[60vh] px-6 py-16 bg-[#0a1a0a] text-green-400">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#22c55e] tracking-wider">
            Tech Stack
          </h2>
          <p className="text-green-300 mt-2 text-base max-w-2xl mx-auto font-mono">
            These are the technologies I specialize in for web, mobile, and IoT development.
          </p>
        </header>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {TECH_STACK.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}