"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tech: string[];
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
  return (
    <motion.div
      className="bg-[#0a1a0a] dark:bg-[#062106] rounded-xl shadow-[0_0_10px_#15803d66] hover:shadow-[0_0_15px_#22c55eaa] transition-shadow overflow-hidden flex flex-col focus:outline-none focus:ring-4 focus:ring-green-500"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      tabIndex={0}
      role="group"
      aria-labelledby={`project-title-${title}`}
    >
      <div className="relative w-full h-48 overflow-hidden border-b border-green-700 group">
        <Image
          src={image}
          alt={`Screenshot dari ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/projects/placeholder.webp"
          loading="lazy"
          quality={70}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3
          id={`project-title-${title}`}
          className="text-xl font-extrabold text-green-400 glow-green"
        >
          {title}
        </h3>
        <p className="text-green-300 text-sm mt-2 flex-1 leading-relaxed">
          {description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository dari ${title}`}
            className="text-green-400 hover:text-lime-300 hover:underline flex items-center gap-1 text-sm font-semibold"
          >
            <Github size={16} /> GitHub
          </Link>
          {demo?.trim() && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demo live dari ${title}`}
              className="text-green-400 hover:text-lime-300 hover:underline flex items-center gap-1 text-sm font-semibold"
            >
              <ExternalLink size={16} /> Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProjectCard);
