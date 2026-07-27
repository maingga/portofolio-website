"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const sectionIds = ["hero", "about", "skills", "portfolio", "contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const activeId = useScrollSpy(sectionIds, 80);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setShowTopButton(currentY > 300);

      if (currentY > lastY && currentY > 80) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderNavLinks = useCallback(
    (isMobile = false) =>
      sectionIds.map((id) => {
        const label = id.charAt(0).toUpperCase() + id.slice(1);
        const isActive = activeId === id;

        return (
          <li key={id}>
            <Link
              href={`#${id}`}
              onClick={() => isMobile && setMenuOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "relative px-3 py-2 block transition-colors duration-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                isActive
                  ? "text-emerald-400 font-semibold bg-emerald-100/5 dark:bg-zinc-800"
                  : "text-gray-300 hover:text-emerald-400 dark:text-gray-400 dark:hover:text-emerald-400",
              )}
            >
              {label}
              {isActive && !isMobile && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-1/2 -bottom-1 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          </li>
        );
      }),
    [activeId],
  );

  return (
    <>
      {/* Overlay Blur */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header
        className={clsx(
          "fixed top-0 w-full z-50 transition-transform duration-300 bg-[#0f0f0f]/70 backdrop-blur-md shadow-sm",
          scrollDir === "down" ? "-translate-y-full" : "translate-y-0",
        )}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-400"
            style={{ fontFamily: "var(--font-audiowide)" }}
          >
            <span className="glitch" data-text="Maingga">
              Maingga
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {renderNavLinks()}
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-200 z-50"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#0f0f0f] shadow px-6 pb-6 pt-2 z-50 relative"
            >
              <ul className="flex flex-col gap-4 text-base font-medium">
                {renderNavLinks(true)}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Back to Top */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-50 p-3 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-400 transition"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
