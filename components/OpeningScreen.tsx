"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { ConfettiBurst, FloatingGlyphs } from "@/components/Decorations";

export function OpeningScreen({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (opened) {
      setBurst(true);
      const timer = window.setTimeout(() => setBurst(false), 2800);
      return () => window.clearTimeout(timer);
    }
  }, [opened]);

  return (
    <>
      <ConfettiBurst active={burst} />
      <AnimatePresence>
        {!opened && (
          <motion.section
            className="fixed inset-0 z-[70] flex min-h-screen items-center justify-center overflow-hidden bg-cream bg-paper px-5 text-center"
            exit={{ opacity: 0, y: -80, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingGlyphs count={24} />
            <motion.div
              className="relative max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-paper shadow-scrapbook ring-1 ring-cocoa/10">
                <Gift className="h-7 w-7 text-cocoa" />
              </div>
              <motion.p
                className="handwritten mb-4 text-2xl text-cocoa sm:text-3xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                A little something for you...
              </motion.p>
              <motion.h1
                className="handwritten text-6xl font-bold tracking-normal text-ink sm:text-8xl"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.75 }}
              >
                YAGYAVI ♡
              </motion.h1>
              <motion.p
                className="mx-auto mt-5 max-w-xl text-lg leading-8 text-cocoa sm:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                Because one birthday message wasn&apos;t enough.
              </motion.p>
              <motion.button
                type="button"
                onClick={onOpen}
                className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-bold text-cream shadow-scrapbook outline-none transition hover:-translate-y-0.5 hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
              >
                <Sparkles className="h-5 w-5" />
                Open Your Surprise
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
