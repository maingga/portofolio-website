"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import TechCard from "./TechCard";

const Skills = () => {
  const techStack = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <motion.section
      id="skills"
      className="min-h-[70vh] px-4 py-16 bg-[#0a1a0a] text-green-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Tech Stack Section"
    >
      <header className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#22c55e] tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
          Tech Stack
        </h2>
        <p className="text-green-300 mt-2 text-base max-w-2xl mx-auto font-mono">
          These are the technologies I specialize in for web, mobile, and IoT
          development.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techStack.map((tech, index) => (
          <TechCard key={tech.name} tech={tech} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default memo(Skills);
