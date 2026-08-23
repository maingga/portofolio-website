"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full px-6 py-8 mt-16 border-t border-emerald-600/30 bg-[#0a0a0a] text-gray-400 backdrop-blur-sm relative z-10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left: Nama & Tahun */}
        <p className="text-center md:text-left font-mono text-emerald-400">
          © {currentYear}{" "}
          <span
            className="font-semibold tracking-wide font-audiowide"
            style={{ fontFamily: "var(--font-audiowide)" }}
          >
            Ahmad Nana Maingga
          </span>
          . All rights reserved.
        </p>

        {/* Right: Icon Sosial */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/maingga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/ahmad-nana-maingga-b4a82021b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-emerald-400 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:nanamaingga12@gmail.com"
            aria-label="Send Email"
            className="hover:text-emerald-400 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;