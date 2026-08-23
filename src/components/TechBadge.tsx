"use client";

import { memo } from "react";

type TechBadgeProps = {
  tech: string;
};

const TechBadge = ({ tech }: TechBadgeProps) => (
  <span className="bg-green-950/80 text-green-300 text-xs px-2.5 py-1 rounded-md border border-green-700/60 hover:bg-green-900 hover:text-lime-300 transition-colors select-none font-mono">
    {tech}
  </span>
);

export default memo(TechBadge);