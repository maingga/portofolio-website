"use client";

import { memo, useId } from "react";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { Github, ExternalLink } from "lucide-react";

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tech: readonly string[];
  github: string;
  demo?: string;
};

// 1x1 pixel SVG blur placeholder
const DEFAULT_BLUR_DATA =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%230b1b0e'/%3E%3C/svg%3E";

const ProjectCard = ({
  title,
  description,
  image,
  tech,
  github,
  demo,
}: ProjectCardProps) => {
  const titleId = useId();
  const hasDemo = Boolean(demo?.trim());

  return (
    <article
      aria-labelledby={titleId}
      className="bg-[#0b1b0e]/95 backdrop-blur-md rounded-2xl border border-emerald-500/20 hover:border-emerald-400/60 shadow-xl shadow-black/60 overflow-hidden flex flex-col h-[460px] sm:h-[470px] select-none transition-colors duration-300 group"
    >
      {/* Banner / Image */}
      <div className="relative w-full h-40 sm:h-44 overflow-hidden border-b border-emerald-900/40">
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA}
          loading="lazy"
          quality={70}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b0e] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            id={titleId}
            className="text-base sm:text-lg font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors line-clamp-1"
          >
            {title}
          </h3>

          <p className="text-emerald-100/70 text-xs mt-2 line-clamp-3 leading-relaxed font-light">
            {description}
          </p>
        </div>

        <div>
          {/* Tech Stack List */}
          <ul
            className="flex flex-wrap gap-1.5 list-none p-0 mt-3"
            aria-label="Tech Stack"
          >
            {tech.map((t) => (
              <li key={t}>
                <TechBadge tech={t} />
              </li>
            ))}
          </ul>

          {/* Action Links */}
          <div className="mt-3 sm:mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${title} (opens in a new tab)`}
              className="text-emerald-400 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded px-2 py-1 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40"
              onClick={(e) => e.stopPropagation()} // Mencegah card deck tertutup saat link diklik
            >
              <Github size={13} aria-hidden="true" />
              <span>Repository</span>
            </a>

            {hasDemo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${title} (opens in a new tab)`}
                className="text-lime-400 hover:text-white flex items-center gap-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-lime-400 rounded px-2 py-1 bg-lime-950/40 hover:bg-lime-900/50 border border-lime-800/40"
                onClick={(e) => e.stopPropagation()} // Mencegah card deck tertutup saat link diklik
              >
                <ExternalLink size={13} aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProjectCard);