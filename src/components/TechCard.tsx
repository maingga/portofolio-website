"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type TechCardProps = {
  tech: { name: string; icon: string };
};

// Variant ringan untuk anak
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const TechCard = ({ tech }: TechCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <div
        className="flex flex-col items-center justify-center text-center
          bg-[#062006] border border-green-500/30 rounded-2xl p-4
          hover:border-green-400 hover:bg-green-900/20
          transition-all duration-200 cursor-pointer select-none h-full"
      >
        <Image
          src={tech.icon}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          className="mb-2 h-11 w-11 object-contain"
          aria-hidden="true"
        />
        <p className="text-sm font-semibold text-green-300 font-mono">
          {tech.name}
        </p>
      </div>
    </motion.div>
  );
};

export default memo(TechCard);