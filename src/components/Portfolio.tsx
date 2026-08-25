"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const DESKTOP_CONFIG = [
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

/*
 * Only the data-heavy card itself is memoized.
 *
 * This prevents unnecessary ProjectCard renders when
 * the parent state changes but the project itself doesn't.
 */
const MemoProjectCard = memo(ProjectCard);

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  const [mobileIndex, setMobileIndex] =
    useState(0);

  const [isSwiping, setIsSwiping] =
    useState(false);

  const [swipeDirection, setSwipeDirection] =
    useState<-1 | 0 | 1>(0);

  const [isSpread, setIsSpread] =
    useState(false);

  /*
   * Only calculate the visible mobile cards.
   *
   * With 3 projects this is already tiny,
   * but this approach also scales better if
   * the portfolio grows later.
   */
  const mobileCards = useMemo(() => {
    const length = PROJECTS.length;

    return [
      PROJECTS[mobileIndex],
      PROJECTS[(mobileIndex + 1) % length],
      PROJECTS[(mobileIndex + 2) % length],
    ];
  }, [mobileIndex]);

  /*
   * Move to next project.
   */
  const nextProject = useCallback(() => {
    if (isSwiping) return;

    setSwipeDirection(1);
    setIsSwiping(true);
  }, [isSwiping]);

  /*
   * Move to previous project.
   */
  const previousProject = useCallback(() => {
    if (isSwiping) return;

    setSwipeDirection(-1);
    setIsSwiping(true);
  }, [isSwiping]);

  /*
   * Finish swipe animation.
   *
   * This is called from Framer Motion's
   * animation completion instead of setTimeout.
   */
  const finishSwipe = useCallback(() => {
    if (swipeDirection === 1) {
      setMobileIndex(
        (current) =>
          (current + 1) % PROJECTS.length
      );
    }

    if (swipeDirection === -1) {
      setMobileIndex(
        (current) =>
          (current - 1 + PROJECTS.length) %
          PROJECTS.length
      );
    }

    setSwipeDirection(0);
    setIsSwiping(false);
  }, [swipeDirection]);

  /*
   * Swipe detection.
   *
   * Distance OR velocity can trigger the swipe.
   */
  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      }
    ) => {
      if (isSwiping) return;

      const distance = info.offset.x;
      const velocity = info.velocity.x;

      const distanceThreshold = 85;
      const velocityThreshold = 450;

      const passedThreshold =
        Math.abs(distance) >
          distanceThreshold ||
        Math.abs(velocity) >
          velocityThreshold;

      if (!passedThreshold) return;

      if (distance < 0 || velocity < 0) {
        nextProject();
      } else {
        previousProject();
      }
    },
    [
      isSwiping,
      nextProject,
      previousProject,
    ]
  );

  /*
   * Indicator navigation.
   *
   * For 3 projects, directly changing the index
   * is cheaper than running multiple animations.
   */
  const handleIndicatorClick = useCallback(
    (index: number) => {
      if (isSwiping || index === mobileIndex) {
        return;
      }

      setMobileIndex(index);
    },
    [isSwiping, mobileIndex]
  );

  /*
   * Keyboard support.
   *
   * This handler is attached only to the portfolio
   * section instead of window, reducing global listeners.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (!isSwiping) {
          setMobileIndex(
            (current) =>
              (current - 1 + PROJECTS.length) %
              PROJECTS.length
          );
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (!isSwiping) {
          setMobileIndex(
            (current) =>
              (current + 1) % PROJECTS.length
          );
        }
      }
    },
    [isSwiping]
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
        outline-none
        sm:px-6
      "
    >
      {/* =========================
          BACKGROUND
      ========================= */}

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
              Swipe left or right to explore.
            </span>

            <span className="hidden sm:inline">
              Hover over the card stack to explore
              the projects.
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
              max-w-[320px]
              items-center
              justify-center
              select-none
              [touch-action:pan-y]
            "
            aria-live="polite"
            aria-atomic="true"
          >
            {mobileCards.map(
              (project, index) => {
                const isTopCard = index === 0;

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
                      will-change-transform
                    "
                    style={{
                      zIndex: 10 - index,
                    }}
                    drag={
                      isTopCard &&
                      !isSwiping
                        ? "x"
                        : false
                    }
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}
                    dragElastic={0.22}
                    dragMomentum={false}
                    dragDirectionLock
                    onDragEnd={
                      isTopCard
                        ? handleDragEnd
                        : undefined
                    }
                    animate={{
                      x:
                        isTopCard &&
                        swipeDirection !== 0
                          ? swipeDirection * 500
                          : 0,

                      y: isTopCard
                        ? 0
                        : index * 12,

                      scale:
                        isTopCard
                          ? 1
                          : 1 - index * 0.04,

                      rotate:
                        isTopCard
                          ? swipeDirection === 1
                            ? 9
                            : swipeDirection === -1
                              ? -9
                              : 0
                          : index % 2 === 0
                            ? 3
                            : -3,

                      opacity:
                        isTopCard &&
                        swipeDirection !== 0
                          ? 0
                          : 1,
                    }}
                    transition={
                      reduceMotion
                        ? {
                            duration: 0,
                          }
                        : {
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                            mass: 0.75,
                          }
                    }
                    onAnimationComplete={
                      isTopCard &&
                      swipeDirection !== 0
                        ? finishSwipe
                        : undefined
                    }
                  >
                    <MemoProjectCard
                      {...project}
                    />
                  </motion.div>
                );
              }
            )}
          </div>

          {/* =========================
              INDICATOR
          ========================= */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >
            {PROJECTS.map(
              (project, index) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() =>
                    handleIndicatorClick(
                      index
                    )
                  }
                  disabled={isSwiping}
                  aria-label={`Go to project ${index + 1}: ${project.title}`}
                  aria-current={
                    index === mobileIndex
                      ? "true"
                      : undefined
                  }
                  className={`
                    h-1.5
                    rounded-full
                    transition-[width,background-color]
                    duration-200
                    disabled:cursor-not-allowed
                    ${
                      index === mobileIndex
                        ? "w-6 bg-emerald-400"
                        : "w-1.5 bg-emerald-800/60"
                    }
                  `}
                />
              )
            )}

            <span
              className="
                ml-2
                font-mono
                text-xs
                text-emerald-400/70
              "
            >
              {String(
                mobileIndex + 1
              ).padStart(2, "0")}{" "}
              /{" "}
              {String(
                PROJECTS.length
              ).padStart(2, "0")}
            </span>
          </div>

          {/* =========================
              MOBILE CONTROLS
          ========================= */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={previousProject}
              disabled={isSwiping}
              aria-label="Previous project"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-emerald-900/60
                bg-emerald-950/40
                text-sm
                text-emerald-300
                transition
                hover:border-emerald-600/70
                hover:bg-emerald-900/50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextProject}
              disabled={isSwiping}
              aria-label="Next project"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-emerald-900/60
                bg-emerald-950/40
                text-sm
                text-emerald-300
                transition
                hover:border-emerald-600/70
                hover:bg-emerald-900/50
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              →
            </button>
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
          onMouseEnter={() =>
            setIsSpread(true)
          }
          onMouseLeave={() =>
            setIsSpread(false)
          }
        >
          {PROJECTS.map(
            (project, index) => {
              const config =
                DESKTOP_CONFIG[index];

              return (
                <motion.div
                  key={`desktop-${project.title}`}
                  className="
                    absolute
                    top-0
                    w-full
                    will-change-transform
                  "
                  style={{
                    zIndex: config.zIndex,
                  }}
                  animate={
                    isSpread
                      ? {
                          x: config.x,
                          y: config.y,
                          rotate:
                            config.rotate,
                          scale:
                            config.scale,
                        }
                      : {
                          x:
                            index === 0
                              ? "-4%"
                              : index === 2
                                ? "4%"
                                : "0%",
                          y:
                            index === 0
                              ? 0
                              : index === 1
                                ? -6
                                : 4,
                          rotate:
                            index === 0
                              ? -4
                              : index === 2
                                ? 4
                                : 0,
                          scale:
                            index === 1
                              ? 1
                              : 0.96,
                        }
                  }
                  transition={
                    reduceMotion
                      ? {
                          duration: 0,
                        }
                      : {
                          type: "spring",
                          stiffness: 280,
                          damping: 26,
                          mass: 0.8,
                        }
                  }
                >
                  <MemoProjectCard
                    {...project}
                  />
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}