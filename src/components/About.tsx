"use client";

import { motion } from "framer-motion";

const AboutParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-green-300 text-lg leading-relaxed">{children}</p>
);

const About = () => {
  return (
    <motion.section
      id="about"
      className="min-h-[70vh] px-4 py-16 flex flex-col gap-6 bg-transparent text-green-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ fontFamily: "var(--font-inter)" }}
      aria-label="About Me Section"
    >
      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-green-400 glow-green"
        style={{ fontFamily: "var(--font-audiowide)" }}
      >
        👨‍💻 About Me
      </h2>

      <AboutParagraph>
        I&apos;m{" "}
        <span className="font-semibold text-lime-300">Ahmad Nana Maingga</span>,
        an Informatics Engineering student specializing in{" "}
        <span className="text-lime-400 font-semibold">Web Development</span>,
        <span className="text-lime-400 font-semibold">
          {" "}
          Mobile App Development
        </span>
        , and{" "}
        <span className="text-lime-400 font-semibold">
          Internet of Things (IoT)
        </span>
        . I’m deeply committed to building clean, efficient, and well-tested
        software solutions.
      </AboutParagraph>

      <AboutParagraph>
        I’ve worked on a variety of digital projects, including a sport center
        reservation system using a microservices architecture, a smart
        greenhouse monitoring and automation system based on ESP32, and several
        mobile apps built with Flutter and Firebase.
      </AboutParagraph>

      <AboutParagraph>
        In some of these projects, I also applied{" "}
        <span className="text-lime-400 font-semibold">
          Software Quality Assurance (SQA)
        </span>{" "}
        practices, such as automated testing, API documentation, and version
        control with tools like Git and CI/CD pipelines.
      </AboutParagraph>

      <AboutParagraph>
        My vision is to become a professional software engineer who not only
        masters technology but also delivers{" "}
        <span className="text-lime-400 font-semibold">
          meaningful, measurable, and reliable
        </span>{" "}
        digital solutions.
      </AboutParagraph>

      <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
    </motion.section>
  );
};

export default About;
