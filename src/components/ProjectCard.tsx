"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tech: readonly string[];
  github: string;
  demo?: string;
};

const ProjectCard = ({
  title,
  description,
  image,
  tech,
  github,
  demo,
}: ProjectCardProps) => {
  // Buat ID yang valid untuk HTML (bebas spasi)
  const titleId = `project-title-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <motion.div
      className="bg-[#0a1a0a] dark:bg-[#062106] rounded-xl shadow-[0_0_10px_#15803d66] hover:shadow-[0_0_15px_#22c55eaa] transition-shadow overflow-hidden flex flex-col border border-green-900/30"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      role="region"
      aria-labelledby={titleId}
    >
      <div className="relative w-full h-48 overflow-hidden border-b border-green-700/60 group">
        <Image
          src={image}
          alt={`Screenshot tampilan ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/projects/placeholder.webp"
          loading="lazy"
          quality={70}
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 id={titleId} className="text-xl font-extrabold text-green-400 glow-green">
          {title}
        </h3>
        <p className="text-green-300/90 text-sm mt-2 flex-1 leading-relaxed">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        <div className="mt-5 flex gap-4 pt-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repository GitHub untuk ${title}`}
            className="text-green-400 hover:text-lime-300 hover:underline flex items-center gap-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <Github size={16} /> GitHub
          </a>

          {demo?.trim() && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demo langsung untuk ${title}`}
              className="text-green-400 hover:text-lime-300 hover:underline flex items-center gap-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProjectCard);