"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Portfolio = () => {
  const projects = useMemo(
    () => [
      {
        title: "Sport Center Reservation System",
        description:
          "A web application for booking sports fields, featuring online reservations, payment integration, and user management.",
        image: "/projects/sport-center.webp",
        tech: ["Laravel", "Next.js", "MySQL", "Midtrans"],
        github: "https://github.com/ahmadnana/sport-center",
        demo: "",
      },
      {
        title: "Smart Greenhouse Automation",
        description:
          "An ESP32-based automated monitoring system with a real-time dashboard to control temperature, humidity, and lighting conditions.",
        image: "/projects/iot.webp",
        tech: ["ESP32", "DHT11", "LDR", "Blynk", "Telegram"],
        github: "https://github.com/ahmadnana/smart-greenhouse",
        demo: "",
      },
      {
        title: "Wedding Equipment Rental App",
        description:
          "A modern mobile app for managing wedding equipment rentals, built using Flutter with real-time authentication and backend powered by Firebase.",
        image: "/projects/wedding.webp",
        tech: ["Flutter", "Firebase", "Cloud Firestore"],
        github: "https://github.com/ahmadnana/portfolio",
        demo: "",
      },
    ],
    [],
  );

  return (
    <motion.section
      id="portfolio"
      className="min-h-[70vh] px-4 py-16 bg-[#0f1f0f] dark:bg-[#062106]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      aria-label="My project portfolio"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-400 glow-green mb-6">
        My Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </motion.section>
  );
};

export default Portfolio;
