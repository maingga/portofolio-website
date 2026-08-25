"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Linkedin,
  Facebook,
  Instagram,
  X as TwitterX,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

/* =========================================================
   CONSTANTS
========================================================= */

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ahmad-nana-maingga-b4a82021b",
    icon: Linkedin,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/MainggaF",
    icon: TwitterX,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/ga.nyonk.3",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/_maingg",
    icon: Instagram,
  },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================================================
   TYPES
========================================================= */

interface SocialButtonProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

type StatusState = "idle" | "loading" | "success" | "error";

/* =========================================================
   SOCIAL BUTTON
========================================================= */

function SocialButton({
  name,
  href,
  icon: Icon,
}: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit my ${name} profile`}
      className="
        group
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        overflow-visible
        rounded-2xl
        border
        border-emerald-900/60
        bg-[#030d03]
        text-emerald-400
        shadow-md
        shadow-black/30

        transition-[transform,border-color,background-color,color,box-shadow]
        duration-200
        ease-out

        hover:-translate-y-1
        hover:border-emerald-500/70
        hover:bg-emerald-950/70
        hover:text-emerald-200
        hover:shadow-lg
        hover:shadow-emerald-950/40

        active:translate-y-0
        active:scale-95

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-400
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#071707]

        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      {/* Hover glow */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          bg-emerald-400/10
          opacity-0
          transition-opacity
          duration-200
          group-hover:opacity-100
          motion-reduce:transition-none
        "
      />

      {/* Icon */}
      <Icon
        className="
          relative
          z-10
          h-5
          w-5
          transition-transform
          duration-200
          ease-out
          group-hover:scale-110
          motion-reduce:transform-none
          motion-reduce:transition-none
        "
        aria-hidden="true"
      />

      {/* Tooltip */}
      <span
        role="tooltip"
        className="
          pointer-events-none
          absolute
          -top-10
          left-1/2
          z-20
          -translate-x-1/2
          translate-y-1
          whitespace-nowrap
          rounded-lg
          border
          border-emerald-800/60
          bg-[#020902]
          px-2.5
          py-1.5
          text-[11px]
          font-medium
          text-emerald-300
          opacity-0
          shadow-lg
          shadow-black/40

          transition-[opacity,transform]
          duration-200

          group-hover:translate-y-0
          group-hover:opacity-100

          motion-reduce:transition-none
        "
      >
        {name}
      </span>
    </a>
  );
}

/* =========================================================
   CONTACT COMPONENT
========================================================= */

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<StatusState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animation hanya berjalan sekali.
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     INPUT HANDLER
  ======================================================= */

  const handleChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrorMsg("");
      setStatus("idle");
    },
    []
  );

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedName = form.name.trim();
      const trimmedEmail = form.email.trim();
      const trimmedMessage = form.message.trim();

      setErrorMsg("");

      /* Required fields */

      if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        setErrorMsg("Please fill in all form fields.");
        setStatus("error");
        return;
      }

      /* Email validation */

      if (!EMAIL_REGEX.test(trimmedEmail)) {
        setErrorMsg("Please enter a valid email address.");
        setStatus("error");
        return;
      }

      /*
       * Simulated submit.
       *
       * Ganti bagian ini dengan API/email service
       * ketika backend sudah tersedia.
       */

      setStatus("loading");
    },
    [form]
  );

  /* =======================================================
     SIMULATED SUBMIT
  ======================================================= */

  useEffect(() => {
    if (status !== "loading") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [status]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="
        relative
        overflow-hidden
        bg-[#030a03]
        px-4
        py-24
        text-emerald-50
        sm:px-6
      "
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/4
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-500/5
          blur-[50px]
          motion-safe:animate-contact-glow
          sm:h-[360px]
          sm:w-[360px]
          sm:blur-[60px]
        "
      />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-4xl
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className={`
            mb-14
            text-center
            transition-[opacity,transform]
            duration-700
            ease-out
            motion-reduce:transition-none
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }
          `}
        >
          <span
            className="
              mb-4
              inline-block
              rounded-full
              border
              border-emerald-700/50
              bg-emerald-950/80
              px-4
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-widest
              text-emerald-400
              shadow-sm
            "
          >
            Get In Touch
          </span>

          <h2
            id="contact-heading"
            className="
              bg-gradient-to-r
              from-emerald-200
              via-emerald-400
              to-green-500
              bg-clip-text
              text-3xl
              font-black
              tracking-tight
              text-transparent
              sm:text-5xl
            "
          >
            Collaborate With Me
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-relaxed
              text-emerald-300/70
            "
          >
            Have a project, idea, or opportunity?
            Feel free to reach out and let&apos;s
            build something great together.
          </p>
        </div>

        {/* =================================================
            CONTACT CARD
        ================================================= */}

        <div
          className={`
            rounded-3xl
            border
            border-emerald-800/40
            bg-[#071707]
            p-6
            shadow-2xl
            shadow-black/80
            transition-[opacity,transform]
            duration-700
            delay-150
            ease-out
            motion-reduce:transition-none
            sm:p-12
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }
          `}
        >
          {/* ===============================================
              FORM
          =============================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            {/* ---------------------------------------------
                NAME + EMAIL
            --------------------------------------------- */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
              "
            >
              {/* NAME */}

              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="
                    ml-1
                    block
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-emerald-400/90
                  "
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Peter Parker"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-emerald-900/60
                    bg-[#030d03]
                    p-4
                    text-emerald-100
                    outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    placeholder:text-emerald-800/60
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>

              {/* EMAIL */}

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="
                    ml-1
                    block
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    text-emerald-400/90
                  "
                >
                  Your Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="peter@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-emerald-900/60
                    bg-[#030d03]
                    p-4
                    text-emerald-100
                    outline-none
                    transition-[border-color,box-shadow]
                    duration-200
                    placeholder:text-emerald-800/60
                    focus:border-emerald-400
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                />
              </div>
            </div>

            {/* =============================================
                MESSAGE
            ============================================= */}

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="
                  ml-1
                  block
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-emerald-400/90
                "
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="How can I help you?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-emerald-900/60
                  bg-[#030d03]
                  p-4
                  text-emerald-100
                  outline-none
                  transition-[border-color,box-shadow]
                  duration-200
                  placeholder:text-emerald-800/60
                  focus:border-emerald-400
                  focus:ring-4
                  focus:ring-emerald-500/10
                "
              />
            </div>

            {/* =============================================
                ERROR
            ============================================= */}

            {errorMsg && (
              <div
                role="alert"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-rose-900/60
                  bg-rose-950/40
                  p-3.5
                  text-sm
                  text-rose-400
                "
              >
                <AlertCircle
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>{errorMsg}</span>
              </div>
            )}

            {/* =============================================
                SUBMIT BUTTON
            ============================================= */}

            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                via-green-500
                to-emerald-400
                py-4
                font-bold
                text-emerald-950
                shadow-lg
                shadow-emerald-950/60
                transition-[filter,transform,opacity]
                duration-200
                hover:brightness-110
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-300
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#071707]
              "
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    className="
                      h-5
                      w-5
                      animate-spin
                    "
                    aria-hidden="true"
                  />

                  <span>
                    Sending Message...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Send Message
                  </span>

                  <Send
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-200
                      group-hover:translate-x-1
                      group-hover:-translate-y-0.5
                    "
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </form>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {status === "success" && (
            <div
              role="status"
              aria-live="polite"
              className="
                mt-6
                flex
                origin-top
                animate-contact-success
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-emerald-500/40
                bg-emerald-950/60
                p-4
                text-sm
                font-medium
                text-emerald-300
              "
            >
              <CheckCircle2
                className="
                  h-5
                  w-5
                  shrink-0
                  text-emerald-400
                "
                aria-hidden="true"
              />

              <span>
                Message sent successfully!
                Thank you. ✨
              </span>
            </div>
          )}

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              my-10
              h-px
              bg-gradient-to-r
              from-transparent
              via-emerald-800/40
              to-transparent
            "
          />

          {/* =================================================
              LOCATION + EMAIL
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
            "
          >
            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-emerald-900/40
                bg-[#030d03]
                p-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-800/50
                  bg-emerald-950/80
                  p-3
                "
              >
                <MapPin
                  className="
                    h-5
                    w-5
                    text-emerald-400
                  "
                  aria-hidden="true"
                />
              </div>

              <div>
                <span
                  className="
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-500/80
                  "
                >
                  Current Location
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-emerald-200
                  "
                >
                  Kediri, Indonesia
                </span>
              </div>
            </div>

            {/* EMAIL */}

            <a
              href="mailto:nanamaingga12@gmail.com"
              aria-label="Send email to Ahmad Nana Maingga"
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-emerald-900/40
                bg-[#030d03]
                p-4
                transition-[border-color]
                duration-200
                hover:border-emerald-700/40
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#071707]
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-4
                "
              >
                <div
                  className="
                    rounded-xl
                    border
                    border-emerald-800/50
                    bg-emerald-950/80
                    p-3
                    text-emerald-400
                  "
                >
                  <Mail
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <span
                    className="
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-500/80
                    "
                  >
                    Direct Email
                  </span>

                  <span
                    className="
                      block
                      truncate
                      text-sm
                      font-semibold
                      text-emerald-200
                      transition-colors
                      duration-200
                      group-hover:text-emerald-400
                    "
                  >
                    nanamaingga12@gmail.com
                  </span>
                </div>
              </div>

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  shrink-0
                  text-emerald-500
                  opacity-0
                  transition-[opacity,transform]
                  duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:opacity-100
                "
                aria-hidden="true"
              />
            </a>
          </div>

          {/* =================================================
              SOCIAL LINKS
          ================================================= */}

          <nav
            aria-label="Social media links"
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-3
            "
          >
            {SOCIAL_LINKS.map((item, index) => (
              <div
                key={item.name}
                className={`
                  transition-[opacity,transform]
                  duration-500
                  ease-out
                  motion-reduce:transition-none
                  ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: isVisible
                    ? `${500 + index * 70}ms`
                    : "0ms",
                }}
              >
                <SocialButton
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                />
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}