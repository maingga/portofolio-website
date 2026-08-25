"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

const PROJECTS: readonly ProjectCardProps[] = [
  {
    title: "Sport Center Reservation System",
    description:
      "A web application for booking sports fields, featuring online reservations, payment integration, and user management.",
    image: "/projects/sport-center.webp",
    tech: ["Laravel", "Next.js", "MySQL", "Midtrans"],
    github:
      "https://github.com/maingga/si-reservasi-sport-center.git",
  },
  {
    title: "Smart Greenhouse Automation",
    description:
      "An ESP32-based automated monitoring system with a real-time dashboard to control temperature, humidity, and lighting conditions.",
    image: "/projects/iot.webp",
    tech: ["ESP32", "DHT11", "LDR", "Blynk", "Telegram"],
    github:
      "https://github.com/maingga/smart-irrigation-blynk-telegram.git",
  },
  {
    title: "Wedding Equipment Rental App",
    description:
      "A modern mobile app for managing wedding equipment rentals, built using Flutter with real-time authentication and backend powered by Firebase.",
    image: "/projects/wedding.webp",
    tech: ["Flutter", "Firebase", "Cloud Firestore"],
    github:
      "https://github.com/maingga/SI-sewa-pernikahan-web-mobile-UD-JTJ.git",
  },
];

const DECK_CONFIG = [
  {
    x: "-102%",
    y: 4,
    rotate: -3,
    scale: 1,
    zIndex: 1,
  },
  {
    x: "0%",
    y: -10,
    rotate: 0,
    scale: 1.02,
    zIndex: 3,
  },
  {
    x: "102%",
    y: 4,
    rotate: 3,
    scale: 1,
    zIndex: 2,
  },
] as const;

export default function Portfolio() {
  const [isSpread, setIsSpread] = useState(false);

  const [mobileCards, setMobileCards] =
    useState<readonly ProjectCardProps[]>(PROJECTS);

  const [mobileIndex, setMobileIndex] = useState(0);

  /*
   * Mobile swipe
   */
  const handleMobileSwipe = useCallback(() => {
    setMobileCards((prev) => {
      if (prev.length <= 1) return prev;

      return [
        ...prev.slice(1),
        prev[0],
      ];
    });

    setMobileIndex((prev) => {
      return (prev + 1) % PROJECTS.length;
    });
  }, []);

  /*
   * Mobile indicator
   */
  const handleSelectMobileCard = useCallback(
    (targetIndex: number) => {
      const diff =
        (targetIndex -
          mobileIndex +
          PROJECTS.length) %
        PROJECTS.length;

      if (diff === 0) return;

      setMobileCards((prev) => {
        const result = [...prev];

        for (let i = 0; i < diff; i++) {
          const first = result.shift();

          if (first) {
            result.push(first);
          }
        }

        return result;
      });

      setMobileIndex(targetIndex);
    },
    [mobileIndex]
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-[#071207]
        px-4
        py-20
        text-white
        sm:px-6
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-500/10
          blur-[70px]
          sm:h-[400px]
          sm:w-[400px]
          sm:blur-[90px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-6xl
          flex-col
          items-center
        "
      >
        {/* =========================
            HEADER
            ========================= */}
        <div
          className="
            mb-10
            max-w-xl
            px-2
            text-center
          "
        >
          <span
            className="
              mb-3
              inline-block
              rounded-full
              border
              border-emerald-800/50
              bg-emerald-950/60
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-emerald-400
            "
          >
            Featured Works
          </span>

          <h2
            id="portfolio-heading"
            className="
              bg-gradient-to-r
              from-emerald-300
              via-green-400
              to-lime-300
              bg-clip-text
              py-1
              text-3xl
              font-extrabold
              leading-normal
              text-transparent
              sm:text-5xl
              sm:leading-tight
            "
          >
            My Projects
          </h2>

          <p
            className="
              mt-3
              text-xs
              text-emerald-200/60
              sm:text-sm
            "
          >
            <span className="block sm:hidden">
              Swipe left/right or tap dots to explore.
            </span>

            <span className="hidden sm:inline">
              Hover over the card stack to explore the projects.
            </span>
          </p>
        </div>

        {/* =========================
            MOBILE
            ========================= */}
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            sm:hidden
          "
        >
          <div
            className="
              relative
              flex
              h-[460px]
              w-full
              max-w-[310px]
              select-none
              items-center
              justify-center
            "
          >
            {mobileCards.map((project, index) => {
              const isTopCard = index === 0;

              /*
               * Only render visible cards.
               * This prevents unnecessary DOM/image work.
               */
              if (index > 2) {
                return null;
              }

              return (
                <motion.div
                  key={`mobile-${project.title}`}
                  className="
                    absolute
                    top-0
                    w-full
                    touch-none
                    cursor-grab
                    active:cursor-grabbing
                  "
                  style={{
                    zIndex: mobileCards.length - index,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.7}
                  onDragEnd={(_, info) => {
                    if (Math.abs(info.offset.x) > 70) {
                      handleMobileSwipe();
                    }
                  }}
                  animate={{
                    scale: 1 - index * 0.04,
                    y: index * 12,
                    rotate:
                      index === 0
                        ? 0
                        : index % 2 === 0
                          ? 3
                          : -3,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              );
            })}
          </div>

          {/* Indicators */}
          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >
            {PROJECTS.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() =>
                  handleSelectMobileCard(index)
                }
                aria-label={`Go to project ${index + 1}`}
                aria-current={
                  index === mobileIndex
                    ? "true"
                    : undefined
                }
                className={`
                  h-1.5
                  rounded-full
                  transition-[width,background-color]
                  duration-300
                  ${
                    index === mobileIndex
                      ? "w-6 bg-emerald-400"
                      : "w-1.5 bg-emerald-800/60"
                  }
                `}
              />
            ))}

            <span
              className="
                ml-2
                font-mono
                text-xs
                text-emerald-400/70
              "
            >
              {mobileIndex + 1} / {PROJECTS.length}
            </span>
          </div>
        </div>

        {/* =========================
            DESKTOP
            ========================= */}
        <div
          className="
            relative
            hidden
            h-[490px]
            w-full
            max-w-[380px]
            select-none
            items-center
            justify-center
            sm:flex
          "
          onMouseEnter={() => setIsSpread(true)}
          onMouseLeave={() => setIsSpread(false)}
        >
          {PROJECTS.map((project, index) => {
            const config = DECK_CONFIG[index];

            return (
              <div
                key={`desktop-${project.title}`}
                className="
                  absolute
                  top-0
                  w-full
                  cursor-pointer
                  transition-[transform]
                  duration-300
                  ease-out
                "
                style={{
                  zIndex: config.zIndex,
                  transform: isSpread
                    ? `translate(${config.x}, ${config.y}px) rotate(${config.rotate}deg) scale(${config.scale})`
                    : getStackTransform(index),
                }}
              >
                <ProjectCard {...project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop stacked position.
 *
 * CSS transform is used instead of Framer Motion
 * because these cards don't require physics or dragging.
 */
function getStackTransform(index: number): string {
  switch (index) {
    case 0:
      return "translate(-4%, 0) rotate(-4deg) scale(0.96)";

    case 1:
      return "translate(0, -6px) rotate(0deg) scale(1)";

    case 2:
      return "translate(4%, 4px) rotate(4deg) scale(0.96)";

    default:
      return "translate(0, 0) rotate(0deg) scale(1)";
  }
}