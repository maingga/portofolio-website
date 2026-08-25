"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

// Constants
const ROLES = [
  "Web Developer",
  "Mobile Developer",
  "IoT Developer",
  "Tech Explorer",
] as const;

const TECH_STACK = [
  "Next.js",
  "Tailwind",
  "Laravel",
  "Flutter",
  "ESP32",
] as const;

const CONFIG = {
  CV_PATH: "/CV.pdf",
  CV_FILENAME: "CV_Ahmad_Nana_Maingga.pdf",
  TYPING_SPEED_FORWARD: 120,
  TYPING_SPEED_BACKWARD: 50,
  TYPING_PAUSE_MS: 1200,
  FLIP_INTERVAL_MS: 5000,
} as const;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [loadRealProfile, setLoadRealProfile] = useState(false);

  const activeRole = ROLES[roleIndex];

  /*
   * Typing effect
   */
useEffect(() => {
  const isFinishedTyping =
    !isDeleting && subIndex === activeRole.length;

  const isFinishedDeleting =
    isDeleting && subIndex === 0;

  let delay: number = isDeleting
    ? CONFIG.TYPING_SPEED_BACKWARD
    : CONFIG.TYPING_SPEED_FORWARD;

  if (isFinishedTyping) {
    delay = CONFIG.TYPING_PAUSE_MS;
  }

  const timer = window.setTimeout(() => {
    if (isFinishedTyping) {
      setIsDeleting(true);
      return;
    }

    if (isFinishedDeleting) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    setSubIndex((prev) =>
      isDeleting ? prev - 1 : prev + 1
    );
  }, delay);

  return () => window.clearTimeout(timer);
}, [activeRole, subIndex, isDeleting]);

  /*
   * Flip avatar.
   *
   * The real profile image is only loaded after the first
   * flip is required, so it doesn't compete with the LCP image.
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setLoadRealProfile(true);
      setIsFlipped((prev) => !prev);
    }, CONFIG.FLIP_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="
        relative
        flex
        min-h-[90vh]
        flex-col-reverse
        items-center
        justify-between
        gap-10
        overflow-hidden
        bg-[#0f0f0f]
        px-6
        py-20
        text-green-400
        md:flex-row
        md:px-16
      "
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-[radial-gradient(circle_at_1px_1px,_#22c55e10_1px,_transparent_0)]
          [background-size:16px_16px]
        "
      />

      {/* =========================
          LEFT CONTENT
          ========================= */}
      <div
        className="
          relative
          z-10
          flex-1
          space-y-6
          text-center
          md:text-left
        "
      >
        <h1
          className="
            text-4xl
            font-extrabold
            leading-tight
            md:text-5xl
          "
        >
          Hi, I&apos;s{" "}
          <span
            className="
              glow-green
              tracking-wider
            "
            style={{
              fontFamily: "var(--font-audiowide)",
            }}
          >
            Ahmad Nana Maingga
          </span>{" "}
          ⚡
        </h1>

        {/* Typing Role */}
        <div
          className="
            flex
            h-8
            min-h-[32px]
            items-center
            justify-center
            md:justify-start
          "
        >
          <p
            className="
              font-mono
              text-xl
              text-lime-400
              md:text-2xl
            "
            aria-label={`Role: ${activeRole}`}
          >
            <span aria-hidden="true">
              {activeRole.substring(0, subIndex)}
              <span
                className="animate-pulse"
                aria-hidden="true"
              >
                |
              </span>
            </span>
          </p>
        </div>

        {/* Description */}
        <p
          className="
            mx-auto
            max-w-xl
            text-lg
            leading-relaxed
            text-green-300
            md:mx-0
            md:text-xl
          "
        >
          I craft modern and efficient web and mobile
          applications — with occasional integration of IoT
          and cloud technologies.
        </p>

        {/* Availability */}
        <p
          className="
            mt-2
            text-sm
            italic
            text-green-400/80
          "
        >
          Open for freelance or remote projects ✉️
        </p>

        {/* Tech Stack */}
        <div
          className="
            mt-4
            flex
            flex-wrap
            justify-center
            gap-2
            font-mono
            text-xs
            uppercase
            md:justify-start
          "
          aria-label="Technology stack"
        >
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="
                rounded-md
                border
                border-green-400/50
                bg-green-800/10
                px-2
                py-1
                text-green-300
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-6
            flex
            flex-col
            justify-center
            gap-4
            sm:flex-row
            md:justify-start
          "
        >
          <a
            href={CONFIG.CV_PATH}
            download={CONFIG.CV_FILENAME}
            rel="noopener noreferrer"
            aria-label="Download CV Ahmad Nana Maingga PDF"
            className="
              inline-block
              rounded-md
              border
              border-green-700
              bg-[#101c10]
              px-6
              py-3
              text-center
              font-semibold
              text-green-300
              shadow-md
              transition-colors
              duration-200
              hover:bg-green-800/30
            "
          >
            📄 Download CV
          </a>

          <a
            href="#portfolio"
            className="
              inline-block
              rounded-md
              border
              border-green-700
              px-6
              py-3
              text-center
              text-green-300
              shadow-md
              transition-colors
              duration-200
              hover:bg-green-800/20
            "
          >
            🚀 View Projects
          </a>
        </div>
      </div>

      {/* =========================
          RIGHT AVATAR
          ========================= */}
      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            rounded-2xl
            border
            border-green-500/20
            bg-green-950/20
            p-5
            sm:p-6
          "
        >
          {/* Avatar perspective */}
          <div
            className="
              h-[220px]
              w-[220px]
              [perspective:1000px]
              sm:h-[280px]
              sm:w-[280px]
              md:h-[300px]
              md:w-[300px]
            "
          >
            <div
              className={`
                relative
                h-full
                w-full
                rounded-full
                transition-transform
                duration-700
                ease-in-out
                [transform-style:preserve-3d]
                ${
                  isFlipped
                    ? "[transform:rotateY(180deg)]"
                    : "[transform:rotateY(0deg)]"
                }
              `}
            >
              {/* =========================
                  FRONT — LCP IMAGE
                  ========================= */}
              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-full
                  border-4
                  border-green-500
                  shadow-lg
                  [backface-visibility:hidden]
                "
              >
                <Image
                  src="/profile.webp"
                  alt="Ahmad Nana Cyberpunk Avatar"
                  width={300}
                  height={300}
                  priority
                  fetchPriority="high"
                  sizes="
                    (max-width: 640px) 220px,
                    (max-width: 768px) 280px,
                    300px
                  "
                  className="h-full w-full object-cover"
                />
              </div>

              {/* =========================
                  BACK — LAZY IMAGE
                  ========================= */}
              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-full
                  border-4
                  border-green-600
                  shadow-lg
                  [backface-visibility:hidden]
                  [transform:rotateY(180deg)]
                "
              >
                {loadRealProfile && (
                  <Image
                    src="/profile-real.webp"
                    alt="Ahmad Nana Real Profile"
                    width={300}
                    height={300}
                    loading="lazy"
                    sizes="
                      (max-width: 640px) 220px,
                      (max-width: 768px) 280px,
                      300px
                    "
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Avatar label */}
          <p
            className="
              mt-4
              font-mono
              text-xs
              text-green-400/80
            "
            aria-live="polite"
          >
            {isFlipped
              ? "📸 My: Profile"
              : "🤖 My: Avatar"}
          </p>
        </div>
      </div>

      {/* =========================
          SCROLL INDICATOR
          ========================= */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          z-10
          -translate-x-1/2
          animate-bounce
        "
      >
        <a
          href="#about"
          aria-label="Scroll Down to About section"
        >
          <ChevronDown
            className="text-green-500"
            size={32}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}