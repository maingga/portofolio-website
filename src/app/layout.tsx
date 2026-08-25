// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter, Audiowide } from "next/font/google";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portofolio Maingga",
  description: "Web & Mobile Developer | IoT Enthusiast",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`dark ${inter.variable} ${audiowide.variable}`}>
      <body
        className="min-h-screen bg-[#0a0a0a] text-white flex flex-col"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <TooltipProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}