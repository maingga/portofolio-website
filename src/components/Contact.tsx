"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, X as TwitterX } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg("");

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setErrorMsg("Please fill in all fields.");
        return;
      }
      if (!isValidEmail(form.email)) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }

      setStatus("loading");

      try {
        await new Promise((res) => setTimeout(res, 1500));
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } catch {
        setStatus("error");
      }
    },
    [form],
  );

  return (
    <motion.section
      id="contact"
      className="max-w-3xl mx-auto px-6 py-16 text-green-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-400 mb-10 glow-green">
        📬 Contact Me
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="bg-[#0b1f0b] border border-green-700 text-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-green-500/60"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="bg-[#0b1f0b] border border-green-700 text-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-green-500/60"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="bg-[#0b1f0b] border border-green-700 text-green-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder:text-green-500/60"
          required
        />

        {errorMsg && (
          <p className="text-red-500 text-sm mt-[-0.5rem]">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className={`bg-green-700 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition-colors shadow-md backdrop-blur ${
            status === "loading" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-400 text-center glow-green">
          Your message has been sent successfully! ✨
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-500 text-center">
          Something went wrong. Please try again later.
        </p>
      )}

      <div className="mt-12 text-center text-green-400 space-y-2 text-sm">
        <p>📍 Kediri, Indonesia</p>
        <p>
          📞{" "}
          <a
            href="tel:+6287754532633"
            className="text-lime-300 hover:underline"
          >
            +62 877-5453-2633
          </a>
        </p>
        <p>
          📧{" "}
          <a
            href="mailto:nanamaingga12@gmail.com"
            className="text-lime-300 hover:underline"
          >
            nanamaingga12@gmail.com
          </a>
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-6 text-green-400">
        <a
          href="https://linkedin.com/in/ahmad-nana-maingga-b4a82021b"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="hover:text-lime-300 transition"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://x.com/MainggaF"
          target="_blank"
          rel="noreferrer"
          aria-label="TwitterX"
          className="hover:text-lime-300 transition"
        >
          <TwitterX className="w-6 h-6" />
        </a>
        <a
          href="https://facebook.com/ga.nyonk.3"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="hover:text-lime-300 transition"
        >
          <Facebook className="w-6 h-6" />
        </a>
        <a
          href="https://instagram.com/maingga_"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="hover:text-lime-300 transition"
        >
          <Instagram className="w-6 h-6" />
        </a>
      </div>

      <div className="mt-10 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
    </motion.section>
  );
}
