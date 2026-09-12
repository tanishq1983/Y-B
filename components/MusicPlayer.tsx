"use client";

import { motion } from "framer-motion";
import { Pause, Play, Volume2 } from "lucide-react";
import { useGlobalAudio } from "@/components/AudioProvider";
import { siteConfig } from "@/data/siteConfig";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

export function MusicPlayer() {
  const { isPlaying, hasStarted, progress, volume, setVolume, toggleMusic, currentTime, duration } =
    useGlobalAudio();

  return (
    <motion.aside
      className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-[1.4rem] border border-white/70 bg-paper/88 p-3 shadow-scrapbook backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5 sm:w-[25rem] sm:translate-x-0"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: hasStarted ? 1 : 0, y: hasStarted ? 0 : 36 }}
      transition={{ duration: 0.55 }}
      aria-label="Global music player"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMusic}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-cream shadow-md outline-none transition hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
          aria-label={isPlaying ? "Pause Honeypie" : "Play Honeypie"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-ink">{siteConfig.themeSong.title}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cocoa/12">
            <motion.div className="h-full rounded-full bg-blush" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[0.68rem] font-semibold text-cocoa/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <label className="hidden items-center gap-2 text-cocoa sm:flex" aria-label="Volume">
          <Volume2 className="h-4 w-4" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-2 w-20 accent-cocoa"
          />
        </label>
      </div>
    </motion.aside>
  );
}
