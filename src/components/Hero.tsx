"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// 1. CONSTANTS (Sesuai standar Single Source of Truth)
const ROLES: readonly string[] = [
  "Web Developer",
  "Mobile Developer",
  "IoT Developer",
  "Tech Explorer",
];

const TECH_STACK: readonly string[] = [
  "Next.js",
  "Tailwind",
  "Laravel",
  "Flutter",
  "ESP32",
];

const CONFIG = {
  CV_PATH: "/CV.pdf",
  CV_FILENAME: "CV_Ahmad_Nana_Maingga.pdf",
  TYPING_SPEED_FORWARD: 120,
  TYPING_SPEED_BACKWARD: 50,
  TYPING_PAUSE_MS: 1200,
  FLIP_INTERVAL_MS: 5000,
} as const;

const Hero = () => {
  const [index, setIndex] = useState<number>(0);
  const [subIndex, setSubIndex] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2. TYPING EFFECT LOGIC (Dibersihkan dari Race Conditions)
  useEffect(() => {
    if (index >= ROLES.length) return;

    const currentRole = ROLES[index];
    const isEndOfWord = !reverse && subIndex === currentRole.length;
    const isStartOfWord = reverse && subIndex === 0;

    const delay = reverse
      ? CONFIG.TYPING_SPEED_BACKWARD
      : CONFIG.TYPING_SPEED_FORWARD;

    typingTimeoutRef.current = setTimeout(() => {
      if (isEndOfWord) {
        setTimeout(() => setReverse(true), CONFIG.TYPING_PAUSE_MS);
      } else if (isStartOfWord) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setSubIndex((prev) => (reverse ? prev - 1 : prev + 1));
      }
    }, delay);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [subIndex, index, reverse]);

  // 3. FLIP EFFECT LOGIC
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, CONFIG.FLIP_INTERVAL_MS);

    return () => clearInterval(flipInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 min-h-[90vh] px-6 py-20 md:px-16 bg-[#0f0f0f] text-green-400 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,_#22c55e10_1px,_transparent_0)] [background-size:16px_16px] pointer-events-none" />

      {/* Left Column: Content */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Hi, I&apos;m{" "}
          <span
            className="glow-green tracking-wider"
            style={{ fontFamily: "var(--font-audiowide)" }}
          >
            Ahmad Nana Maingga
          </span>{" "}
          ⚡
        </h1>

        {/* Dynamic Typing Display */}
        <div className="h-8 flex items-center justify-center md:justify-start" aria-live="polite">
          <p className="text-lime-400 text-xl md:text-2xl font-mono">
            {ROLES[index]?.substring(0, subIndex)}
            <span className="animate-pulse" aria-hidden="true">|</span>
          </p>
        </div>

        <p className="text-green-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
          I craft modern and efficient web and mobile applications — with
          occasional integration of IoT and cloud technologies.
        </p>

        <p className="text-green-400/80 text-sm italic mt-2">
          Open for freelance or remote projects ✉️
        </p>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs font-mono uppercase mt-4">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="border border-green-400/50 text-green-300 px-2 py-1 rounded-md bg-green-800/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
          {/* PERBAIKAN SQA: Native Anchor untuk Download Payload */}
          <a
            href={CONFIG.CV_PATH}
            download={CONFIG.CV_FILENAME}
            rel="noopener noreferrer"
            aria-label="Download CV Ahmad Nana Maingga (PDF)"
            className="inline-block px-6 py-3 bg-[#101c10] border border-green-700 text-green-300 font-semibold rounded-md hover:bg-green-800/30 transition duration-200 shadow-md text-center"
          >
            📄 Download CV
          </a>

          <a
            href="#portfolio"
            className="inline-block px-6 py-3 border border-green-700 text-green-300 rounded-md hover:bg-green-800/20 transition duration-200 shadow-md text-center"
          >
            🚀 View Projects
          </a>
        </div>
      </motion.div>

      {/* Right Column: Avatar Flip */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-950/20 border border-green-500/20 p-5 sm:p-6 rounded-2xl flex flex-col items-center">
          <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] [perspective:1000px]">
            <motion.div
              className="w-full h-full relative rounded-full [transform-style:preserve-3d]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* SISI DEPAN */}
              <div className="absolute inset-0 rounded-full [backface-visibility:hidden] overflow-hidden border-4 border-green-500 shadow-lg">
                <Image
                  src="/profile.png"
                  alt="Ahmad Nana Cyberpunk Avatar"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 300px"
                  priority
                  className="object-cover"
                />
              </div>

            {/* SISI BELAKANG: Real Profile */}
            <div className="absolute inset-0 rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden border-4 border-green-600 shadow-lg">
              <Image
                src="/profile-real.png"
                alt="Ahmad Nana Real Profile"
                fill
                sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 300px"
                priority // <-- Tambahkan atribut ini di sini
                className="object-cover"
              />
            </div>              
            </motion.div>
          </div>

          <p className="text-xs text-green-400/80 font-mono mt-4">
            {isFlipped ? "📸 My: Profile" : "🤖 My: Avatar"}
          </p>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <a href="#about" aria-label="Scroll Down to About section">
          <ChevronDown className="text-green-500" size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;