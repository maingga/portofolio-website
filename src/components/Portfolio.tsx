"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import ProjectCard, {
  ProjectCardProps,
} from "./ProjectCard";

/*
 * ==========================================
 * PROJECT DATA
 * ==========================================
 */

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

/*
 * ==========================================
 * CONSTANTS
 * ==========================================
 */

const SWIPE_DISTANCE_THRESHOLD = 90;
const SWIPE_VELOCITY_THRESHOLD = 450;
const SWIPE_TARGET_X = 430;

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

/*
 * ==========================================
 * COMPONENT
 * ==========================================
 */

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  /*
   * ==========================================
   * STATE
   * ==========================================
   */

  const [mobileIndex, setMobileIndex] = useState(0);

  const [isSwiping, setIsSwiping] = useState(false);

  /*
   * 1  = swipe LEFT  → NEXT
   * -1 = swipe RIGHT → PREVIOUS
   * 0  = idle
   */
  const [swipeDirection, setSwipeDirection] =
    useState<-1 | 0 | 1>(0);

  const [isSpread, setIsSpread] = useState(false);

  /*
   * ==========================================
   * REFS
   * ==========================================
   *
   * State digunakan untuk rendering.
   *
   * Ref digunakan sebagai lock synchronous
   * supaya startSwipe tidak dapat dijalankan
   * dua kali sebelum React melakukan re-render.
   */

  const swipeLockRef = useRef(false);

  /*
   * ==========================================
   * MOTION VALUE
   * ==========================================
   *
   * Posisi card selama drag menggunakan
   * MotionValue agar perubahan posisi tidak
   * menyebabkan React re-render setiap frame.
   */

  const dragX = useMotionValue(0);

  /*
   * ==========================================
   * DRAG ROTATION
   * ==========================================
   */

  const dragRotate = useTransform(
    dragX,
    [-320, 0, 320],
    [-6, 0, 6]
  );

  /*
   * ==========================================
   * DRAG OPACITY
   * ==========================================
   *
   * Card tetap terlihat selama sebagian besar
   * gesture dan baru fade ketika hampir keluar.
   */

  const dragOpacity = useTransform(
    dragX,
    [
      -SWIPE_TARGET_X,
      -280,
      0,
      280,
      SWIPE_TARGET_X,
    ],
    [0, 1, 1, 1, 0]
  );

  /*
   * ==========================================
   * PRELOAD PROJECT IMAGES
   * ==========================================
   *
   * Hanya 3 image sehingga preload masih
   * reasonable untuk carousel portfolio ini.
   */

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    PROJECTS.forEach(({ image }) => {
      const img = new window.Image();

      img.decoding = "async";
      img.src = image;

      images.push(img);
    });

    return () => {
      images.length = 0;
    };
  }, []);

  /*
   * ==========================================
   * MOBILE CARDS
   * ==========================================
   */

  const mobileCards = useMemo(() => {
    const length = PROJECTS.length;

    const previousIndex =
      (mobileIndex - 1 + length) % length;

    const nextIndex =
      (mobileIndex + 1) % length;

    return {
      current: PROJECTS[mobileIndex],
      previous: PROJECTS[previousIndex],
      next: PROJECTS[nextIndex],
    };
  }, [mobileIndex]);

  /*
   * ==========================================
   * STACK TRANSITION
   * ==========================================
   */

  const stackTransition = reduceMotion
    ? {
        duration: 0,
      }
    : {
        type: "spring" as const,
        stiffness: 240,
        damping: 28,
        mass: 0.8,
      };

  /*
   * ==========================================
   * COMPLETE SWIPE
   * ==========================================
   */

  const completeSwipe = useCallback(
    (direction: -1 | 1) => {
      setMobileIndex((current) => {
        if (direction === 1) {
          /*
           * LEFT → NEXT
           */
          return (
            (current + 1) %
            PROJECTS.length
          );
        }

        /*
         * RIGHT → PREVIOUS
         */
        return (
          (current - 1 + PROJECTS.length) %
          PROJECTS.length
        );
      });

      /*
       * Reset card position sebelum
       * render berikutnya.
       */
      dragX.set(0);

      setSwipeDirection(0);
      setIsSwiping(false);

      /*
       * Lepaskan synchronous lock.
       */
      swipeLockRef.current = false;
    },
    [dragX]
  );

  /*
   * ==========================================
   * START SWIPE
   * ==========================================
   */

  const startSwipe = useCallback(
    async (direction: -1 | 1) => {
      /*
       * Jangan izinkan swipe kedua ketika
       * animasi sebelumnya masih berjalan.
       *
       * Menggunakan ref agar lock bersifat
       * synchronous.
       */
      if (swipeLockRef.current) {
        return;
      }

      swipeLockRef.current = true;

      setIsSwiping(true);
      setSwipeDirection(direction);

      /*
       * LEFT → keluar kiri
       * RIGHT → keluar kanan
       */
      const targetX =
        direction === 1
          ? -SWIPE_TARGET_X
          : SWIPE_TARGET_X;

      /*
       * Transition khusus untuk card keluar.
       */
      const transition = reduceMotion
        ? {
            duration: 0,
          }
        : {
            type: "spring" as const,
            stiffness: 420,
            damping: 34,
            mass: 0.65,
          };

      try {
        await animate(
          dragX,
          targetX,
          transition
        );

        completeSwipe(direction);
      } catch {
        /*
         * Safety fallback apabila animation
         * dibatalkan/error.
         */
        dragX.set(0);
        setSwipeDirection(0);
        setIsSwiping(false);
        swipeLockRef.current = false;
      }
    },
    [
      completeSwipe,
      dragX,
      reduceMotion,
    ]
  );

  /*
   * ==========================================
   * NEXT
   * ==========================================
   */

  const nextProject = useCallback(() => {
    startSwipe(1);
  }, [startSwipe]);

  /*
   * ==========================================
   * PREVIOUS
   * ==========================================
   */

  const previousProject = useCallback(() => {
    startSwipe(-1);
  }, [startSwipe]);

  /*
   * ==========================================
   * DRAG END
   * ==========================================
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
      /*
       * Jangan memproses drag jika sedang
       * dalam programmatic swipe.
       */
      if (swipeLockRef.current) {
        return;
      }

      const distance = info.offset.x;
      const velocity = info.velocity.x;

      /*
       * ======================================
       * SWIPE DECISION
       * ======================================
       */

      const shouldSwipe =
        Math.abs(distance) >=
          SWIPE_DISTANCE_THRESHOLD ||
        Math.abs(velocity) >=
          SWIPE_VELOCITY_THRESHOLD;

      /*
       * ======================================
       * NOT ENOUGH SWIPE
       * ======================================
       *
       * Kembalikan card ke tengah.
       */

      if (!shouldSwipe) {
        const transition = reduceMotion
          ? {
              duration: 0,
            }
          : {
              type: "spring" as const,
              stiffness: 500,
              damping: 38,
              mass: 0.6,
            };

        animate(
          dragX,
          0,
          transition
        );

        return;
      }

      /*
       * ======================================
       * LEFT → NEXT
       * ======================================
       */

      if (
        distance < 0 ||
        velocity < 0
      ) {
        startSwipe(1);
        return;
      }

      /*
       * ======================================
       * RIGHT → PREVIOUS
       * ======================================
       */

      startSwipe(-1);
    },
    [
      dragX,
      reduceMotion,
      startSwipe,
    ]
  );

  /*
   * ==========================================
   * INDICATOR CLICK
   * ==========================================
   */

  const handleIndicatorClick =
    useCallback(
      (index: number) => {
        if (
          swipeLockRef.current ||
          index === mobileIndex
        ) {
          return;
        }

        /*
         * Pastikan posisi card bersih.
         */
        dragX.set(0);

        setSwipeDirection(0);
        setMobileIndex(index);
      },
      [dragX, mobileIndex]
    );

  /*
   * ==========================================
   * KEYBOARD
   * ==========================================
   */

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent<HTMLElement>
    ) => {
      if (swipeLockRef.current) {
        return;
      }

      /*
       * ArrowLeft → NEXT
       */
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        startSwipe(1);
      }

      /*
       * ArrowRight → PREVIOUS
       */
      if (event.key === "ArrowRight") {
        event.preventDefault();
        startSwipe(-1);
      }
    },
    [startSwipe]
  );

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

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
            {/* ==================================
                PREVIOUS CARD
            ================================== */}

            <motion.div
              key={`previous-${mobileCards.previous.title}`}
              className="
                absolute
                top-0
                w-full
                will-change-transform
              "
              style={{
                zIndex:
                  swipeDirection === -1
                    ? 4
                    : 1,
              }}
              initial={{
                x: "-4%",
                y: 12,
                rotate: -3,
                scale: 0.96,
              }}
              animate={{
                x:
                  swipeDirection === -1
                    ? 0
                    : "-4%",

                y:
                  swipeDirection === -1
                    ? 0
                    : 12,

                rotate:
                  swipeDirection === -1
                    ? 0
                    : -3,

                scale:
                  swipeDirection === -1
                    ? 1
                    : 0.96,

                opacity: 1,
              }}
              transition={stackTransition}
            >
              <MemoProjectCard
                {...mobileCards.previous}
              />
            </motion.div>

            {/* ==================================
                NEXT CARD
            ================================== */}

            <motion.div
              key={`next-${mobileCards.next.title}`}
              className="
                absolute
                top-0
                w-full
                will-change-transform
              "
              style={{
                zIndex:
                  swipeDirection === 1
                    ? 4
                    : 2,
              }}
              initial={{
                x: "4%",
                y: 12,
                rotate: 3,
                scale: 0.96,
              }}
              animate={{
                x:
                  swipeDirection === 1
                    ? 0
                    : "4%",

                y:
                  swipeDirection === 1
                    ? 0
                    : 12,

                rotate:
                  swipeDirection === 1
                    ? 0
                    : 3,

                scale:
                  swipeDirection === 1
                    ? 1
                    : 0.96,

                opacity: 1,
              }}
              transition={stackTransition}
            >
              <MemoProjectCard
                {...mobileCards.next}
              />
            </motion.div>

            {/* ==================================
                CURRENT CARD
            ================================== */}

            <motion.div
              key={`current-${mobileCards.current.title}`}
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
                zIndex: 5,
                x: dragX,
                rotate: dragRotate,
                opacity: dragOpacity,
              }}
              drag={
                !swipeLockRef.current
                  ? "x"
                  : false
              }
              dragConstraints={{
                left: -SWIPE_TARGET_X,
                right: SWIPE_TARGET_X,
              }}
              dragElastic={0.08}
              dragMomentum={false}
              dragDirectionLock
              onDragEnd={handleDragEnd}
            >
              <MemoProjectCard
                {...mobileCards.current}
              />
            </motion.div>
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
            {/* PREVIOUS */}

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

            {/* NEXT */}

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
                          type: "spring" as const,
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