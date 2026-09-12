"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cake, Sparkles } from "lucide-react";
import { FloatingGlyphs, SectionShell } from "@/components/Decorations";
import { siteConfig } from "@/data/siteConfig";

export function BirthdayHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <FloatingGlyphs count={24} glyphs={["✦", "✿", "★", "✧", "❀"]} />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cream to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.86fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cocoa/10 bg-paper/75 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-cocoa shadow-sm backdrop-blur">
            <Cake className="h-4 w-4" />
            18 September ✨
          </div>
          <h1 className="handwritten mx-auto max-w-4xl text-5xl font-black leading-tight text-ink sm:text-7xl lg:mx-0 lg:text-8xl">
            HAPPY BIRTHDAY, YAGYAVI!
          </h1>
          <div className="mx-auto mt-7 max-w-2xl space-y-3 text-xl leading-8 text-cocoa sm:text-2xl lg:mx-0">
            <p>Today isn&apos;t just another day.</p>
            <p className="font-bold text-ink">It&apos;s the day the world got a little more chaotic.</p>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg"
          initial={{ opacity: 0, rotate: 4, y: 30 }}
          whileInView={{ opacity: 1, rotate: -2, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="tape left-1/2 top-0 z-20 -translate-x-1/2 -rotate-3" />
          <div className="relative rounded-[1.2rem] bg-paper p-4 pb-16 shadow-polaroid ring-1 ring-cocoa/10 sm:p-5 sm:pb-20">
            <div className="relative overflow-hidden rounded-xl bg-cream">
              <Image
                src={siteConfig.heroPhoto.src}
                alt="Yagyavi birthday hero photo"
                width={960}
                height={1280}
                priority
                sizes="(max-width: 768px) 88vw, 38vw"
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="handwritten absolute bottom-5 left-0 right-0 text-center text-xl font-bold text-cocoa sm:text-2xl">
              official birthday evidence
            </p>
          </div>
          <motion.div
            className="absolute -right-4 -top-5 rounded-full bg-blush px-4 py-3 text-sm font-black text-ink shadow-lg"
            animate={{ y: [0, -10, 0], rotate: [4, -3, 4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="mr-1 inline h-4 w-4" /> iconic
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function MiniSectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cocoa/70">{eyebrow}</p> : null}
      <h2 className="handwritten text-4xl font-black text-ink sm:text-6xl">{title}</h2>
      {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-cocoa sm:text-xl">{subtitle}</p> : null}
    </div>
  );
}

export { SectionShell };
