"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

type Tech = {
  name: string;
  icon: string;
};

const TechCard = ({ tech, index }: { tech: Tech; index: number }) => {
  return (
    <Tooltip.Root delayDuration={100}>
      <Tooltip.Trigger asChild>
        <motion.div
          className="flex flex-col items-center justify-center text-center
            bg-[#062006] border border-green-500/70 rounded-2xl
            p-4 shadow-[0_0_12px_#22c55e88] hover:shadow-[0_0_20px_#22c55eff]
            cursor-pointer
            transition-shadow duration-300
            text-green-300
            hover:text-green-400"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.06,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          viewport={{ once: true }}
          role="img"
          aria-label={`${tech.name} technology logo and name`}
        >
          <Image
            src={tech.icon}
            alt={`${tech.name} logo`}
            title={tech.name}
            width={48}
            height={48}
            loading="lazy"
            className="mb-2 filter drop-shadow-[0_0_4px_rgba(34,197,94,0.8)]"
            priority={false}
          />
          <p className="text-sm font-semibold tracking-wide">{tech.name}</p>
        </motion.div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={5}
          className="bg-black text-green-400 text-sm px-3 py-1 rounded border border-green-500 shadow-[0_0_10px_#22c55e] select-none z-[999]"
        >
          {tech.name}
          <Tooltip.Arrow className="fill-black" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default memo(TechCard);
