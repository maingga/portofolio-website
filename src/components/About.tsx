import { memo, type ReactNode } from "react";

// Sub-komponen statis di-memoize untuk mencegah re-render jika parent memicu render ulang
const AboutParagraph = memo(({ children }: { children: ReactNode }) => (
  <p className="text-green-300 text-lg leading-relaxed">{children}</p>
));

AboutParagraph.displayName = "AboutParagraph";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-[70vh] px-4 py-16 flex flex-col gap-6 bg-transparent text-green-300"
      aria-label="About Me Section"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-green-400 glow-green font-[family-name:var(--font-audiowide)]">
        👨‍💻 About Me
      </h2>

      {/* Paragraf 1: Introduksi Profesi & Spesialisasi */}
      <AboutParagraph>
        I&apos;m{" "}
        <span className="font-semibold text-lime-300">Ahmad Nana Maingga</span>,{" "}
        a <span className="text-lime-400 font-semibold">Software Engineer</span> with a background in{" "}
        <span className="text-lime-300 font-semibold">Informatics Engineering</span>.{" "}
        I specialize in{" "}
        <span className="text-lime-400 font-semibold">Web Development</span>,{" "}
        <span className="text-lime-400 font-semibold">
          Mobile App Development
        </span>
        , and{" "}
        <span className="text-lime-400 font-semibold">
          Internet of Things (IoT)
        </span>
        , with a strong commitment to building clean, efficient, and well-tested software solutions.
      </AboutParagraph>

      {/* Paragraf 2: Pengalaman Proyek */}
      <AboutParagraph>
        Throughout my journey, I have engineered diverse digital solutions, including a{" "}
        sports center reservation system powered by microservices architecture, an{" "}
        ESP32-based smart greenhouse monitoring and automation system, and cross-platform{" "}
        mobile applications built with Flutter and Firebase.
      </AboutParagraph>

      {/* Paragraf 3: SQA & Engineering Practices */}
      <AboutParagraph>
        Across these projects, I consistently incorporate{" "}
        <span className="text-lime-400 font-semibold">
          Software Quality Assurance (SQA)
        </span>{" "}
        best practices—ranging from automated testing and clear API documentation{" "}
        to robust version control using Git and CI/CD pipelines.
      </AboutParagraph>

      {/* Paragraf 4: Nilai & Visi */}
      <AboutParagraph>
        My objective is to deliver digital solutions that are not only technically sound,{" "}
        but also{" "}
        <span className="text-lime-400 font-semibold">
          meaningful, measurable, and reliable
        </span>{" "}
        for end-users and businesses alike.
      </AboutParagraph>

      {/* Separator Divider Optimized with GPU Acceleration */}
      <div 
        aria-hidden="true" 
        className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-75 will-change-transform" 
      />
    </section>
  );
};

export default memo(About);