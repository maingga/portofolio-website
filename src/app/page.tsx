"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
  loading: () => (
    <div className="text-center py-10 text-gray-500">Loading portfolio...</div>
  ),
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => (
    <div className="text-center py-10 text-gray-500">Loading contact...</div>
  ),
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => (
    <div className="text-center py-10 text-gray-500">Loading footer...</div>
  ),
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      <section id="hero" className="contain-paint will-change-transform">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      {/* ID disamakan dengan Navbar menjadi "projects" */}
      <section id="projects">
        <Portfolio />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}