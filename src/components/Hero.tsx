"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const roles = [
  "Web Developer",
  "Mobile Developer",
  "IoT Developer",
  "Tech Explorer",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing Effect Optimization
  useEffect(() => {
    if (index === roles.length) return;

    timeoutRef.current = setTimeout(
      () => {
        setSubIndex((prev) => (reverse ? prev - 1 : prev + 1));

        if (!reverse && subIndex === roles[index].length) {
          setTimeout(() => setReverse(true), 1200);
        } else if (reverse && subIndex === 0) {
          setReverse(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      },
      reverse ? 50 : 120
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [subIndex, index, reverse]);

  // Flip Automatic Effect
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 5000);

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

      {/* Left Column: Text */}
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

        {/* Dynamic Typing Display with fixed width/height container to prevent CLS */}
        <div className="h-8 flex items-center justify-center md:justify-start">
          <p className="text-lime-400 text-xl md:text-2xl font-mono">
            {roles[index].substring(0, subIndex)}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p className="text-green-300 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
          I craft modern and efficient web and mobile applications — with
          occasional integration of IoT and cloud technologies.
        </p>

        <p className="text-green-400/80 text-sm italic mt-2">
          Open for freelance or remote projects ✉️
        </p>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs font-mono uppercase mt-4">
          {["Next.js", "Tailwind", "Laravel", "Flutter", "ESP32"].map(
            (tech) => (
              <span
                key={tech}
                className="border border-green-400/50 text-green-300 px-2 py-1 rounded-md bg-green-800/10"
              >
                {tech}
              </span>
            )
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
          <Link
            href="/CV.pdf"
            download
            className="inline-block px-6 py-3 bg-[#101c10] border border-green-700 text-green-300 font-semibold rounded-md hover:bg-green-800/30 transition duration-200 shadow-md"
          >
            📄 Download CV
          </Link>

          <a
            href="#portfolio"
            className="inline-block px-6 py-3 border border-green-700 text-green-300 rounded-md hover:bg-green-800/20 transition duration-200 shadow-md"
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
              {/* SISI DEPAN: Cyberpunk Avatar (Di-priority) */}
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

              {/* SISI BELAKANG: Real Profile (Tanpa priority / lazy loading) */}
              <div className="absolute inset-0 rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden border-4 border-green-600 shadow-lg">
                <Image
                  src="/profile-real.png"
                  alt="Ahmad Nana Real Profile"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 300px"
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
        <a href="#about" aria-label="Scroll Down">
          <ChevronDown className="text-green-500" size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;