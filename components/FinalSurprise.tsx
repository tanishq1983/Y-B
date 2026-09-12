"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";
import { ConfettiBurst, FloatingGlyphs, makeParticles, SectionShell } from "@/components/Decorations";
import { useGlobalAudio } from "@/components/AudioProvider";
import { siteConfig } from "@/data/siteConfig";

const featured = siteConfig.photos.filter((photo) => photo.featured).slice(0, 3);
const balloons = makeParticles(12, ["●"]);

export function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);
  const { fadeOutMusic } = useGlobalAudio();

  const reveal = () => {
    setRevealed(true);
    window.setTimeout(() => fadeOutMusic(5200), 6200);
  };

  return (
    <SectionShell className={`min-h-screen overflow-hidden transition-colors duration-1000 ${revealed ? "bg-paper/75" : ""}`}>
      <FloatingGlyphs count={revealed ? 28 : 12} glyphs={["✦", "✧", "★", "✩", "❀"]} />
      <ConfettiBurst active={revealed} large />
      {revealed ? (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
          {balloons.map((balloon, index) => (
            <motion.span
              key={balloon.id}
              className="absolute bottom-[-6rem] h-12 w-9 rounded-full shadow-md"
              style={{ left: `${balloon.left}%`, backgroundColor: ["#f7c8cf", "#d8c5ee", "#f7d2b8", "#c9d8c5"][index % 4] }}
              animate={{ y: "-115vh", x: [0, index % 2 ? 24 : -24, 0], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 7 + (index % 4), delay: index * 0.18, ease: "easeOut" }}
            />
          ))}
          {featured.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="absolute top-[15%] w-28 rounded-xl bg-paper p-2 pb-7 shadow-polaroid sm:w-36"
              style={{ left: `${10 + index * 32}%` }}
              initial={{ opacity: 0, y: 80, rotate: -8 + index * 7 }}
              animate={{ opacity: [0, 1, 1, 0.85], y: [-20, 180, 90], rotate: [-8 + index * 7, 10 - index * 3] }}
              transition={{ duration: 8, delay: index * 0.45, repeat: Infinity, repeatType: "reverse" }}
            >
              <Image src={photo.src} alt="Floating Yagyavi memory" width={photo.width} height={photo.height} className="h-auto w-full rounded-lg object-contain" />
            </motion.div>
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[76vh] max-w-4xl flex-col items-center justify-center text-center">
        <motion.p
          className="handwritten text-3xl font-black text-cocoa sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Wait...
        </motion.p>
        <motion.h2
          className="handwritten mt-4 text-5xl font-black leading-tight text-ink sm:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15 }}
        >
          There&apos;s one more thing.
        </motion.h2>
        {!revealed ? (
          <motion.button
            type="button"
            onClick={reveal}
            className="mt-10 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-black text-cream shadow-scrapbook outline-none transition hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
            whileTap={{ scale: 0.97 }}
          >
            <PartyPopper className="h-5 w-5" />
            ONE LAST SURPRISE
          </motion.button>
        ) : (
          <motion.div
            className="mt-10 rounded-[1.2rem] border border-white/70 bg-paper/86 p-6 shadow-polaroid backdrop-blur sm:p-9"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-cocoa" />
            <h3 className="handwritten text-4xl font-black text-ink sm:text-6xl">HAPPY BIRTHDAY, YAGYAVI!</h3>
            <p className="mt-6 text-lg leading-8 text-cocoa sm:text-2xl">Here&apos;s to another year of memories, chaos and questionable decisions.</p>
            <p className="mt-3 text-lg font-bold leading-8 text-ink sm:text-2xl">Stay exactly the way you are.</p>
            <p className="handwritten mt-7 text-2xl font-black leading-snug text-cocoa sm:text-4xl">
              One month down.
              <br />A lot more memories to go.
            </p>
          </motion.div>
        )}
      </div>
    </SectionShell>
  );
}
