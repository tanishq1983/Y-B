"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Radio } from "lucide-react";
import { MiniSectionTitle, SectionShell } from "@/components/BirthdayHero";
import { useGlobalAudio } from "@/components/AudioProvider";
import { siteConfig, type VoiceNoteItem } from "@/data/siteConfig";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const voiceSrc = (note: VoiceNoteItem) => {
  if (!note.filename) return null;
  return note.filename.startsWith("/") ? note.filename : `/JOKES/${note.filename}`;
};

export function InsideJokeVault() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const revealMissingAudio = () => {
    setToast("Voice note not added yet. The lore is currently under emotional security.");
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <SectionShell className="bg-paper/40">
      <MiniSectionTitle
        eyebrow="classified friendship files"
        title="THE INSIDE JOKE VAULT"
        subtitle="Things that absolutely nobody else will understand."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {siteConfig.voiceNotes.map((note, index) => (
          <VoiceNotePlayer
            key={note.id}
            note={note}
            index={index}
            activeId={activeId}
            setActiveId={setActiveId}
            onMissingAudio={revealMissingAudio}
          />
        ))}
      </div>
      {toast ? (
        <motion.div
          className="fixed bottom-28 left-1/2 z-[85] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl bg-ink px-5 py-4 text-center text-sm font-bold text-cream shadow-scrapbook"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
        >
          {toast}
        </motion.div>
      ) : null}
    </SectionShell>
  );
}

function VoiceNotePlayer({
  note,
  index,
  activeId,
  setActiveId,
  onMissingAudio
}: {
  note: VoiceNoteItem;
  index: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  onMissingAudio: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const { setDucked } = useGlobalAudio();
  const active = activeId === note.id;
  const src = voiceSrc(note);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.preload = "metadata";
    audioRef.current = audio;
    const onTime = () => {
      setElapsed(audio.currentTime || 0);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };
    const onEnded = () => {
      setActiveId(null);
      setDucked(false);
      setElapsed(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [setActiveId, setDucked, src]);

  useEffect(() => {
    if (!audioRef.current || !src) return;
    if (active) {
      audioRef.current.play().then(() => setDucked(true)).catch(() => setActiveId(null));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setElapsed(0);
    }
  }, [active, setActiveId, setDucked, src]);

  const toggle = () => {
    if (!src) {
      onMissingAudio();
      return;
    }
    if (active) {
      setActiveId(null);
      setDucked(false);
    } else {
      setActiveId(note.id);
    }
  };

  return (
    <motion.article
      className={`relative overflow-hidden rounded-[1.2rem] border p-5 shadow-scrapbook transition ${
        active ? "border-blush bg-blush/35" : "border-white/70 bg-paper"
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cocoa">
            <Radio className="h-3.5 w-3.5" /> voice note
          </p>
          <h3 className="handwritten text-2xl font-black text-ink">{note.title}</h3>
          <p className="mt-2 text-sm leading-6 text-cocoa">{note.caption}</p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-cream shadow-md outline-none transition hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
          aria-label={active ? `Pause ${note.title}` : `Play ${note.title}`}
        >
          {active ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 pl-0.5" />}
        </button>
      </div>
      <div className="flex h-14 items-end gap-1 rounded-2xl bg-cream/85 px-3 py-3">
        {Array.from({ length: 28 }).map((_, barIndex) => (
          <motion.span
            key={barIndex}
            className="flex-1 rounded-full bg-cocoa/55"
            animate={active ? { height: [8, 18 + ((barIndex * 7) % 28), 10 + ((barIndex * 11) % 22)] } : { height: 8 + ((barIndex * 5) % 20) }}
            transition={{ duration: 0.75, repeat: active ? Infinity : 0, repeatType: "mirror", delay: barIndex * 0.015 }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-cocoa/70">
        <span>{active ? "Pause" : "Play"}</span>
        <span>{active ? formatTime(elapsed) : duration ? formatTime(duration) : note.durationLabel}</span>
      </div>
    </motion.article>
  );
}

