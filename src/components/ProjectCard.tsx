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
      {/* ======================================
          IMAGE
      ====================================== */}

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
          sizes="(max-width: 640px) 320px, 380px"
          priority
          quality={65}
          className="
            object-cover
            transition-transform
            duration-300
            ease-out
            group-hover:scale-[1.02]
          "
        />

        {/* Image Overlay */}

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

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        {/* Project Information */}

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

        {/* ======================================
            BOTTOM CONTENT
        ====================================== */}

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

          {/* ==================================
              LINKS
          ================================== */}

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
            {/* GitHub */}

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

            {/* Live Demo */}

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