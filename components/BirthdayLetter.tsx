"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";
import { MiniSectionTitle, SectionShell } from "@/components/BirthdayHero";
import { siteConfig } from "@/data/siteConfig";

const boldLines = new Set([
  "HAPPYYYY BIRTHDAYYYYY!!!",
  "thoda kam drama bhi kar lena.",
  "Drama ke bina Yagyavi, Yagyavi thodi na hai.",
  "One month down.",
  "Hopefully, bohot saari memories baaki hain.",
  "HAPPY BIRTHDAY, YAGYAVI!",
  "Stay the same idiot you are.",
  "— Your Bestie"
]);

export function BirthdayLetter() {
  const [open, setOpen] = useState(false);
  const lines = siteConfig.letter.split("\n\n");

  return (
    <SectionShell className="bg-gradient-to-b from-paper/40 via-blush/20 to-transparent">
      <MiniSectionTitle title="BIRTHDAY LETTER" subtitle="A tiny paper artifact with dangerously high sincerity levels." />
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="relative min-h-[18rem] overflow-hidden rounded-[1.4rem] border border-white/70 bg-peach/45 p-6 shadow-polaroid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="absolute inset-x-8 top-8 h-32 origin-top rounded-t-[1rem] bg-blush/80 shadow-md" style={{ clipPath: "polygon(0 0, 50% 72%, 100% 0)" }} />
          <motion.div
            className="absolute inset-x-6 bottom-8 top-16 rounded-b-[1rem] bg-paper shadow-scrapbook"
            animate={open ? { y: -18, rotateX: 0 } : { y: 28, rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative z-10 flex min-h-[15rem] flex-col items-center justify-center text-center">
            {!open ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="handwritten text-3xl font-black text-ink">You have a letter...</p>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 font-black text-cream shadow-md outline-none transition hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
                >
                  <MailOpen className="h-5 w-5" />
                  Open Letter
                </button>
              </motion.div>
            ) : null}
          </div>
        </motion.div>

        <AnimatePresence>
          {open ? (
            <motion.article
              className="paper-edge relative -mt-14 rounded-[1.2rem] border border-white/80 p-5 shadow-polaroid sm:p-9"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7 }}
            >
              <span className="tape -top-3 left-8 rotate-[-7deg]" />
              <div className="space-y-5 text-[1.02rem] leading-8 text-ink sm:text-lg sm:leading-9">
                {lines.map((line, index) => (
                  <motion.p
                    key={`${line}-${index}`}
                    className={`${index === 0 || line === "HAPPY BIRTHDAY, YAGYAVI!" ? "handwritten text-3xl font-black text-cocoa sm:text-4xl" : ""} ${boldLines.has(line) ? "font-black" : ""}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.035, 0.8) }}
                  >
                    {line === "Okay, first of all… ONE MONTH." ? (
                      <>Okay, first of all… <strong>ONE MONTH.</strong></>
                    ) : line === "Aur obviously… hamare inside jokes." ? (
                      <>Aur obviously… <strong>hamare inside jokes.</strong></>
                    ) : (
                      line
                    )}
                  </motion.p>
                ))}
              </div>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
