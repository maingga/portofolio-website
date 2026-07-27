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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (index === roles.length) return;

    timeoutRef.current = setTimeout(
      () => {
        setSubIndex((prev) => (reverse ? prev - 1 : prev + 1));

        if (!reverse && subIndex === roles[index].length) {
          setTimeout(() => setReverse(true), 1000);
        } else if (reverse && subIndex === 0) {
          setReverse(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      },
      reverse ? 40 : 100,
    );

    return () => clearTimeout(timeoutRef.current!);
  }, [subIndex, index, reverse]);

  return (
    <>
      {/* SEO: JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ahmad Nana Maingga",
            url: "https://portfolio.maingga.com",
            jobTitle: "Fullstack Developer",
            sameAs: [
              "https://github.com/maingga",
              "https://linkedin.com/in/ahmad-nana-maingga-b4a82021b",
            ],
          }),
        }}
      />

      <motion.section
        id="hero"
        className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 min-h-[90vh] px-6 py-20 md:px-16 bg-[#0f0f0f] text-green-400 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-label="Hero Section"
      >
        {/* Line atas neon */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0 animate-pulse"></div>

        {/* Mesh background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,_#22c55e10_1px,_transparent_0)] [background-size:16px_16px] pointer-events-none" />

        {/* Kiri: teks */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-6 relative z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
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

          <p className="text-lime-400 text-xl md:text-2xl font-mono h-8">
            {`${roles[index].substring(0, subIndex)}|`}
          </p>

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
                  className="border border-green-400 text-green-300 px-2 py-1 rounded-md bg-green-800/10 hover:bg-green-600/10 transition"
                >
                  {tech}
                </span>
              ),
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <Link
              href="/CV.pdf"
              download
              className="inline-block px-6 py-3 bg-[#101c10] border border-green-700 text-green-300 font-semibold rounded-md hover:bg-green-800/30 hover:border-green-500 hover:text-lime-200 transition duration-300 backdrop-blur-md shadow-md"
            >
              📄 Download CV
            </Link>

            <a
              href="#portfolio"
              className="inline-block px-6 py-3 border border-green-700 text-green-300 rounded-md hover:bg-green-800/20 hover:text-lime-200 hover:border-green-500 transition duration-300 backdrop-blur-md shadow-md"
            >
              🚀 View Projects
            </a>
          </div>
        </motion.div>

        {/* Kanan: Foto */}
        <motion.div
          className="flex-1 flex justify-center relative z-10"
          whileHover={{
            rotate: [0, 1.5, -1.5, 0],
            transition: { duration: 0.6 },
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-green-400/5 border border-green-500/20 p-6 rounded-2xl shadow-[0_0_20px_#15803d50]">
            <Image
              src="/profile.png"
              alt="Ahmad Nana Cyberpunk Profile"
              width={300}
              height={300}
              priority
              className="rounded-full object-cover border-4 border-green-600 shadow-md"
            />
          </div>
        </motion.div>

        {/* Scroll down */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#about" aria-label="Scroll Down">
            <ChevronDown className="text-green-500" size={32} />
          </a>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
