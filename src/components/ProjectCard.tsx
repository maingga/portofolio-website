"use client";

import { memo, useId } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import TechBadge from "./TechBadge";

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tech: readonly string[];
  github: string;
  demo?: string;
};

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
      className="
        group
        flex
        h-[460px]
        select-none
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-emerald-500/20
        bg-[#09150b]
        shadow-lg
        shadow-black/40
        transition-colors
        duration-200
        hover:border-emerald-400/60
        sm:h-[470px]
      "
    >
      {/* Image */}
      <div
        className="
          relative
          h-40
          w-full
          overflow-hidden
          border-b
          border-emerald-900/40
          bg-emerald-950
          sm:h-44
        "
      >
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          loading="lazy"
          quality={65}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA}
          className="
            object-cover
            transition-transform
            duration-300
            ease-out
            group-hover:scale-[1.02]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#09150b]
            via-transparent
            to-transparent
            opacity-80
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3
            id={titleId}
            className="
              line-clamp-1
              text-base
              font-bold
              text-emerald-300
              transition-colors
              group-hover:text-emerald-200
              sm:text-lg
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2
              line-clamp-3
              text-xs
              font-light
              leading-relaxed
              text-emerald-100/70
            "
          >
            {description}
          </p>
        </div>

        <div>
          {/* Tech Stack */}
          <ul
            className="
              mt-3
              flex
              list-none
              flex-wrap
              gap-1.5
              p-0
            "
            aria-label="Tech Stack"
          >
            {tech.map((item) => (
              <li key={item}>
                <TechBadge tech={item} />
              </li>
            ))}
          </ul>

          {/* Links */}
          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              border-t
              border-emerald-900/40
              pt-3
              sm:mt-4
            "
          >
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${title} (opens in a new tab)`}
              className="
                flex
                items-center
                gap-1.5
                rounded
                border
                border-emerald-800/40
                bg-emerald-950/40
                px-2
                py-1
                text-xs
                font-medium
                text-emerald-400
                transition-colors
                hover:bg-emerald-900/50
                hover:text-white
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-400
              "
            >
              <Github
                size={13}
                aria-hidden="true"
              />
              <span>Repository</span>
            </a>

            {hasDemo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${title} (opens in a new tab)`}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded
                  border
                  border-lime-800/40
                  bg-lime-950/40
                  px-2
                  py-1
                  text-xs
                  font-medium
                  text-lime-400
                  transition-colors
                  hover:bg-lime-900/50
                  hover:text-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-lime-400
                "
              >
                <ExternalLink
                  size={13}
                  aria-hidden="true"
                />
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