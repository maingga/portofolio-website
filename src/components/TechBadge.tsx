"use client";

type TechBadgeProps = {
  tech: string;
};

const TechBadge = ({ tech }: TechBadgeProps) => (
  <span className="bg-green-900 text-green-400 text-xs px-2 py-1 rounded-md border border-green-600 hover:bg-green-700 hover:text-lime-300 transition select-none glow-green">
    {tech}
  </span>
);

export default TechBadge;
