"use client";

import { motion } from "framer-motion";
import { FloatingGlyphs, SectionShell } from "@/components/Decorations";

const orbitWords = ["Chaos", "Laughs", "Memories", "Trust", "Inside Jokes", "Bestie"];

export function FriendshipMessage() {
  return (
    <SectionShell className="min-h-[70vh] overflow-hidden">
      <FloatingGlyphs count={16} glyphs={["✦", "✧", "♡", "★"]} />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center py-14 text-center">
        <div className="absolute inset-0 hidden sm:block" aria-hidden="true">
          {orbitWords.map((word, index) => (
            <motion.span
              key={word}
              className="absolute rounded-full border border-cocoa/10 bg-paper/80 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-cocoa shadow-sm"
              style={{ left: `${12 + (index % 3) * 34}%`, top: `${8 + Math.floor(index / 3) * 70}%` }}
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="handwritten text-3xl font-black leading-snug text-ink sm:text-5xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Some people come into your life and leave memories.
        </motion.p>
        <motion.p
          className="handwritten mt-8 text-3xl font-black leading-snug text-cocoa sm:text-5xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.25 }}
        >
          Some people become the memories.
        </motion.p>
        <motion.p
          className="mt-8 max-w-2xl text-xl font-bold leading-8 text-ink sm:text-2xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          You&apos;re definitely the second one.
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:hidden">
          {orbitWords.map((word) => (
            <span key={word} className="rounded-full bg-paper px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-cocoa shadow-sm">
              {word}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
