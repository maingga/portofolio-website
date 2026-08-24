"use client";

import { useState, useCallback, memo } from "react";
import {
  Linkedin,
  Facebook,
  Instagram,
  X as TwitterX,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com/in/ahmad-nana-maingga-b4a82021b", icon: Linkedin },
  { name: "X (Twitter)", href: "https://x.com/MainggaF", icon: TwitterX },
  { name: "Facebook", href: "https://facebook.com/ga.nyonk.3", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/_maingg", icon: Instagram },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SocialButtonProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

// Menggunakan transisi CSS murni untuk performa maksimal tanpa overhead Framer Motion
const SocialButton = memo(({ name, href, icon: Icon }: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={name}
    className="p-3.5 rounded-2xl bg-[#030d03]/80 border border-emerald-900/50 text-emerald-400 hover:text-emerald-200 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all duration-200 shadow-md hover:-translate-y-0.5 active:scale-95"
  >
    <Icon className="w-5 h-5" aria-hidden="true" />
  </a>
));
SocialButton.displayName = "SocialButton";

type FormState = { name: string; email: string; message: string };
type StatusState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<StatusState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setStatus("idle");
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMsg("Please fill in all form fields.");
      setStatus("error");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  }, [form]);

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden bg-[#030a03] text-emerald-50">
      {/* Background Glows menggunakan CSS murni */}
      <div 
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none transform-gpu"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(3, 10, 3, 0) 70%)"
        }}
      />
      <div 
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[300px] h-[300px] pointer-events-none transform-gpu"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(3, 10, 3, 0) 70%)"
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-green-500 tracking-tight">
            Collaborate With Me
          </h2>
        </div>

        <div className="bg-[#071707]/70 backdrop-blur-md border border-emerald-800/30 shadow-2xl shadow-black/80 rounded-3xl p-6 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-emerald-400/90 uppercase tracking-wider ml-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Peter Parker"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#030d03]/80 border border-emerald-900/60 focus:border-emerald-400 text-emerald-100 rounded-2xl p-4 outline-none transition-colors duration-200 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-emerald-800/60"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-emerald-400/90 uppercase tracking-wider ml-1">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="peter@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#030d03]/80 border border-emerald-900/60 focus:border-emerald-400 text-emerald-100 rounded-2xl p-4 outline-none transition-colors duration-200 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-emerald-800/60"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-medium text-emerald-400/90 uppercase tracking-wider ml-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="How can I help you?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-[#030d03]/80 border border-emerald-900/60 focus:border-emerald-400 text-emerald-100 rounded-2xl p-4 outline-none transition-colors duration-200 focus:ring-4 focus:ring-emerald-500/10 resize-none placeholder:text-emerald-800/60"
              />
            </div>

            {/* Error Message dengan transisi CSS murni */}
            <div 
              className={`grid transition-all duration-200 ease-in-out overflow-hidden ${
                errorMsg ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              role="alert"
            >
              <div className="min-h-0">
                <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-950/40 border border-rose-900/60 rounded-xl p-3.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-400 hover:brightness-110 text-emerald-950 font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          {/* Success Message dengan transisi CSS murni */}
          <div 
            className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
              status === "success" ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
            role="status"
          >
            <div className="min-h-0">
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Message sent successfully! Thank you. ✨</span>
              </div>
            </div>
          </div>

          <div className="my-10 h-[1px] bg-gradient-to-r from-transparent via-emerald-800/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#030d03]/60 border border-emerald-900/40">
              <div className="relative flex items-center justify-center p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/50">
                <span className="absolute inline-flex h-full w-full rounded-xl bg-emerald-400/20 animate-ping opacity-75" aria-hidden="true" />
                <MapPin className="w-5 h-5 text-emerald-400 relative z-10" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500/80 block">Current Location</span>
                <span className="text-emerald-200 font-semibold text-sm">Kediri, Indonesia</span>
              </div>
            </div>

            <a
              href="mailto:nanamaingga12@gmail.com"
              className="flex items-center justify-between p-4 rounded-2xl bg-[#030d03]/60 border border-emerald-900/40 hover:border-emerald-700/40 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500/80 block">Direct Email</span>
                  <span className="text-emerald-200 font-semibold text-sm truncate block group-hover:text-emerald-400 transition-colors">
                    nanamaingga12@gmail.com
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex justify-center items-center gap-3">
            {SOCIAL_LINKS.map((item) => (
              <SocialButton key={item.name} name={item.name} href={item.href} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}