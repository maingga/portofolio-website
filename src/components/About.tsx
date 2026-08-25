"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const ABOUT_PARAGRAPHS: ReactNode[] = [
  <>
    I&apos;m{" "}
    <span className="font-semibold text-lime-300">
      Ahmad Nana Maingga
    </span>
    , a{" "}
    <span className="font-semibold text-lime-400">
      Software Engineer
    </span>{" "}
    with a background in{" "}
    <span className="font-semibold text-lime-300">
      Informatics Engineering
    </span>
    . I specialize in{" "}
    <span className="font-semibold text-lime-400">
      Web Development
    </span>
    ,{" "}
    <span className="font-semibold text-lime-400">
      Mobile App Development
    </span>
    , and{" "}
    <span className="font-semibold text-lime-400">
      Internet of Things (IoT)
    </span>
    , with a strong commitment to building clean,
    efficient, and well-tested software solutions.
  </>,

  <>
    Throughout my journey, I have engineered diverse
    digital solutions, including a sports center
    reservation system powered by microservices
    architecture, an ESP32-based smart greenhouse
    monitoring and automation system, and cross-platform
    mobile applications built with Flutter and Firebase.
  </>,

  <>
    Across these projects, I consistently incorporate{" "}
    <span className="font-semibold text-lime-400">
      Software Quality Assurance (SQA)
    </span>{" "}
    best practices—ranging from automated testing and
    clear API documentation to robust version control
    using Git and CI/CD pipelines.
  </>,

  <>
    My objective is to deliver digital solutions that
    are not only technically sound, but also{" "}
    <span className="font-semibold text-lime-400">
      meaningful, measurable, and reliable
    </span>{" "}
    for end-users and businesses alike.
  </>,
];

function AboutParagraph({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p
      className="
        cursor-default
        text-lg
        leading-relaxed
        text-green-300
        transition-transform
        duration-300
        ease-out
        hover:translate-x-1.5
        hover:text-green-200
      "
    >
      {children}
    </p>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Me Section"
      className={`
        flex
        min-h-[70vh]
        flex-col
        gap-6
        bg-transparent
        px-4
        py-16
        text-green-300
        transition-[opacity,transform]
        duration-700
        ease-out
        md:px-16
        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
      `}
    >
      <h2
        className="
          font-[family-name:var(--font-audiowide)]
          text-3xl
          font-extrabold
          tracking-tight
          text-green-400
          glow-green
          md:text-4xl
        "
      >
        👨‍💻 About Me
      </h2>

      {ABOUT_PARAGRAPHS.map((content, index) => (
        <AboutParagraph key={index}>
          {content}
        </AboutParagraph>
      ))}

      <div
        aria-hidden="true"
        className="
          mt-8
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-green-500
          to-transparent
          opacity-75
        "
      />
    </section>
  );
}