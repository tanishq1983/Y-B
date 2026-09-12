"use client";

import { motion } from "framer-motion";
import { Drama, Laugh, Sparkles, Zap } from "lucide-react";
import { MiniSectionTitle, SectionShell } from "@/components/BirthdayHero";

const cards = [
  {
    title: "Professional Menace",
    body: "Somehow you can turn literally anything into chaos.",
    icon: Zap,
    color: "bg-peach"
  },
  {
    title: "Certified Bestie",
    body: "Annoying? Yes. Replaceable? Absolutely not.",
    icon: Laugh,
    color: "bg-blush"
  },
  {
    title: "Main Character Energy",
    body: "You genuinely make ordinary moments memorable.",
    icon: Sparkles,
    color: "bg-lavender"
  },
  {
    title: "Questionable Decisions",
    body: "We don't talk about those.",
    icon: Drama,
    color: "bg-sage"
  }
];

export function BestieCards() {
  return (
    <SectionShell>
      <MiniSectionTitle title="THINGS THAT MAKE YOU... YOU" subtitle="A short academic study, peer-reviewed by exactly one bestie." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              className="relative overflow-hidden rounded-[1.2rem] border border-white/70 bg-paper p-6 shadow-scrapbook"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full ${card.color} text-ink shadow-sm`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="handwritten text-2xl font-black leading-tight text-ink">{card.title}</h3>
              <p className="mt-4 text-base leading-7 text-cocoa">{card.body}</p>
              <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-butter/45" />
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
