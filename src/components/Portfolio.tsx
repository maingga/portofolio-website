"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import ProjectCard, {
  ProjectCardProps,
} from "./ProjectCard";

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

const MemoProjectCard = memo(ProjectCard);

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  const [mobileIndex, setMobileIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] =
    useState<-1 | 0 | 1>(0);
  const [isSpread, setIsSpread] = useState(false);

  /*
   * ==========================================
   * MOBILE CARDS
   * ==========================================
   *
   * We only render the current card and the
   * next two cards.
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
   * ==========================================
   * FINISH SWIPE
   * ==========================================
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
   * ==========================================
   * NEXT PROJECT
   * ==========================================
   */
  const nextProject = useCallback(() => {
    if (isSwiping) return;

    setSwipeDirection(1);
    setIsSwiping(true);
  }, [isSwiping]);

  /*
   * ==========================================
   * PREVIOUS PROJECT
   * ==========================================
   */
  const previousProject = useCallback(() => {
    if (isSwiping) return;

    setSwipeDirection(-1);
    setIsSwiping(true);
  }, [isSwiping]);

  /*
   * ==========================================
   * DRAG END
   * ==========================================
   *
   * The card follows the finger during the drag.
   * Only after release do we decide whether
   * the card should leave or return.
   */
  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: {
        offset: {
          x: number;
          y: number;
        };
        velocity: {
          x: number;
          y: number;
        };
      }
    ) => {
      if (isSwiping) return;

      const distance = info.offset.x;
      const velocity = info.velocity.x;

      const distanceThreshold = 90;
      const velocityThreshold = 500;

      const shouldSwipe =
        Math.abs(distance) >=
          distanceThreshold ||
        Math.abs(velocity) >=
          velocityThreshold;

      /*
       * Not enough movement:
       * Framer Motion will naturally animate
       * the card back to the center.
       */
      if (!shouldSwipe) {
        return;
      }

      /*
       * Negative X = swipe left = next.
       * Positive X = swipe right = previous.
       */
      if (distance < 0 || velocity < 0) {
        setSwipeDirection(1);
        setIsSwiping(true);
      } else {
        setSwipeDirection(-1);
        setIsSwiping(true);
      }
    },
    [isSwiping]
  );

  /*
   * ==========================================
   * INDICATOR
   * ==========================================
   */
  const handleIndicatorClick = useCallback(
    (index: number) => {
      if (
        isSwiping ||
        index === mobileIndex
      ) {
        return;
      }

      setMobileIndex(index);
    },
    [isSwiping, mobileIndex]
  );

  /*
   * ==========================================
   * KEYBOARD
   * ==========================================
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (isSwiping) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setMobileIndex(
          (current) =>
            (current - 1 + PROJECTS.length) %
            PROJECTS.length
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setMobileIndex(
          (current) =>
            (current + 1) % PROJECTS.length
        );
      }
    },
    [isSwiping]
  );

  /*
   * ==========================================
   * MOBILE SWIPE TRANSITION
   * ==========================================
   *
   * Tween is intentionally used here instead
   * of an aggressive spring.
   *
   * This makes the card feel like it has
   * momentum instead of snapping.
   */
  const swipeTransition = reduceMotion
    ? {
        duration: 0,
      }
    : {
        type: "tween" as const,
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  /*
   * ==========================================
   * MOBILE STACK TRANSITION
   * ==========================================
   */
  const stackTransition = reduceMotion
    ? {
        duration: 0,
      }
    : {
        type: "spring" as const,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      };

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
      {/* ======================================
          BACKGROUND
      ====================================== */}

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
        {/* ======================================
            HEADER
        ====================================== */}

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

        {/* ======================================
            MOBILE
        ====================================== */}

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
                const isTopCard =
                  index === 0;

                /*
                 * ==================================
                 * TOP CARD
                 * ==================================
                 *
                 * Before swipe:
                 * x = 0
                 *
                 * During drag:
                 * Framer Motion controls x.
                 *
                 * After threshold:
                 * animate x to +/- 450px.
                 */
                const topCardAnimation =
                  isTopCard
                    ? {
                        x:
                          swipeDirection === 1
                            ? -450
                            : swipeDirection === -1
                              ? 450
                              : 0,

                        y: 0,

                        rotate:
                          swipeDirection === 1
                            ? -8
                            : swipeDirection === -1
                              ? 8
                              : 0,

                        scale: 1,

                        opacity:
                          swipeDirection !== 0
                            ? 0
                            : 1,
                      }
                    : {
                        /*
                         * When the front card leaves,
                         * the second card smoothly moves
                         * into the front position.
                         */
                        x: 0,

                        y:
                          isSwiping && index === 1
                            ? 0
                            : index * 12,

                        rotate:
                          isSwiping &&
                          index === 1
                            ? 0
                            : index % 2 === 0
                              ? 3
                              : -3,

                        scale:
                          isSwiping &&
                          index === 1
                            ? 1
                            : 1 -
                              index * 0.04,

                        opacity: 1,
                      };

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
                      zIndex:
                        10 - index,
                    }}
                    /*
                     * Only the top card can be dragged.
                     */
                    drag={
                      isTopCard &&
                      !isSwiping
                        ? "x"
                        : false
                    }
                    /*
                     * Allow the user to actually
                     * move the card.
                     *
                     * This is one of the biggest
                     * differences from the old version.
                     */
                    dragConstraints={{
                      left: -380,
                      right: 380,
                    }}
                    /*
                     * Small elastic effect when
                     * reaching the edge.
                     */
                    dragElastic={0.12}
                    /*
                     * Prevent momentum from continuing
                     * after the finger is released.
                     */
                    dragMomentum={false}
                    /*
                     * Lock movement to horizontal axis.
                     */
                    dragDirectionLock
                    /*
                     * Animate from the CURRENT drag
                     * position rather than making
                     * the card suddenly jump.
                     */
                    animate={topCardAnimation}
                    transition={
                      isTopCard &&
                      swipeDirection !== 0
                        ? swipeTransition
                        : stackTransition
                    }
                    onDragEnd={
                      isTopCard
                        ? handleDragEnd
                        : undefined
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

          {/* ======================================
              INDICATOR
          ====================================== */}

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
                  aria-label={`Go to project ${
                    index + 1
                  }: ${project.title}`}
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

          {/* ======================================
              MOBILE CONTROLS
          ====================================== */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
            "
          >
            {/* LEFT → NEXT */}
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
              ←
            </button>

            {/* RIGHT → PREVIOUS */}
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
              →
            </button>
          </div>
        </div>

        {/* ======================================
            DESKTOP
        ====================================== */}

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
                    zIndex:
                      config.zIndex,
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