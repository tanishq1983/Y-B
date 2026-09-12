"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const spots = [
  "left-[6%] top-[18%]",
  "right-[8%] top-[34%]",
  "left-[10%] top-[62%]",
  "right-[12%] top-[76%]",
  "left-1/2 top-[48%]"
];

export function EasterEggs() {
  const [message, setMessage] = useState<string | null>(null);

  const show = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2400);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[55]">
        {spots.map((spot, index) => (
          <button
            key={spot}
            type="button"
            onClick={() => show(siteConfig.easterEggs[index])}
            className={`pointer-events-auto absolute ${spot} rounded-full p-2 text-cocoa/35 transition hover:scale-125 hover:text-cocoa focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush`}
            aria-label="Hidden birthday easter egg"
          >
            <Star className="h-4 w-4 fill-current" />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => show(siteConfig.easterEggs[5])}
        className="fixed right-3 top-3 z-[56] rounded-full border border-cocoa/15 bg-paper/70 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-cocoa/55 shadow-sm backdrop-blur transition hover:bg-blush/80 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush"
      >
        DO NOT CLICK
      </button>
      <AnimatePresence>
        {message ? (
          <motion.div
            className="fixed left-1/2 top-6 z-[95] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-ink px-5 py-4 text-center text-sm font-black text-cream shadow-polaroid sm:text-base"
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
