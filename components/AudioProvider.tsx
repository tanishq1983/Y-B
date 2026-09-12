"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { siteConfig } from "@/data/siteConfig";

type AudioContextValue = {
  isPlaying: boolean;
  hasStarted: boolean;
  volume: number;
  progress: number;
  currentTime: number;
  duration: number;
  startMusic: () => Promise<void>;
  toggleMusic: () => void;
  setVolume: (value: number) => void;
  setDucked: (value: boolean) => void;
  fadeOutMusic: (durationMs?: number) => Promise<void>;
};

const AudioContext = createContext<AudioContextValue | null>(null);

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolumeState] = useState(0.68);
  const [isDucked, setIsDucked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [endingFadeStarted, setEndingFadeStarted] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const effectiveVolume = useMemo(() => clamp(isDucked ? volume * 0.24 : volume), [isDucked, volume]);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(siteConfig.themeSong.src);
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const fadeTo = useCallback(
    (target: number, durationMs = 800) =>
      new Promise<void>((resolve) => {
        const audio = audioRef.current;
        if (!audio) {
          resolve();
          return;
        }
        clearFade();
        const start = audio.volume;
        const startedAt = performance.now();
        fadeRef.current = window.setInterval(() => {
          const elapsed = performance.now() - startedAt;
          const pct = clamp(elapsed / durationMs);
          audio.volume = clamp(start + (target - start) * pct);
          if (pct >= 1) {
            clearFade();
            resolve();
          }
        }, 40);
      }),
    [clearFade]
  );

  const startMusic = useCallback(async () => {
    const audio = ensureAudio();
    clearFade();
    audio.volume = 0;
    try {
      await audio.play();
      setIsPlaying(true);
      setHasStarted(true);
      await fadeTo(effectiveVolume, 1200);
    } catch {
      setIsPlaying(false);
    }
  }, [clearFade, effectiveVolume, ensureAudio, fadeTo]);

  const toggleMusic = useCallback(() => {
    const audio = ensureAudio();
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          fadeTo(effectiveVolume, 500);
        })
        .catch(() => setIsPlaying(false));
    } else {
      fadeTo(0, 400).then(() => {
        audio.pause();
        setIsPlaying(false);
      });
    }
  }, [effectiveVolume, ensureAudio, fadeTo]);

  const fadeOutMusic = useCallback(
    async (durationMs = 4200) => {
      const audio = audioRef.current;
      if (!audio) return;
      await fadeTo(0, durationMs);
      audio.pause();
      setIsPlaying(false);
    },
    [fadeTo]
  );

  const setVolume = useCallback(
    (value: number) => {
      const next = clamp(value);
      setVolumeState(next);
      const audio = audioRef.current;
      if (audio && !isDucked) audio.volume = next;
    },
    [isDucked]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      fadeTo(effectiveVolume, 600);
    }
  }, [effectiveVolume, fadeTo, isPlaying]);

  useEffect(() => {
    const audio = ensureAudio();
    const handleTime = () => {
      const safeDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
      setCurrentTime(audio.currentTime || 0);
      setDuration(safeDuration);
      setProgress(safeDuration ? audio.currentTime / safeDuration : 0);
      if (safeDuration && safeDuration - audio.currentTime < 5 && !endingFadeStarted) {
        setEndingFadeStarted(true);
        fadeTo(0, 4800);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(1);
    };
    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("loadedmetadata", handleTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTime);
      audio.removeEventListener("loadedmetadata", handleTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      clearFade();
    };
  }, [clearFade, endingFadeStarted, ensureAudio, fadeTo]);

  const value = useMemo(
    () => ({
      isPlaying,
      hasStarted,
      volume,
      progress,
      currentTime,
      duration,
      startMusic,
      toggleMusic,
      setVolume,
      setDucked: setIsDucked,
      fadeOutMusic
    }),
    [currentTime, duration, fadeOutMusic, hasStarted, isPlaying, progress, startMusic, toggleMusic, volume, setVolume]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useGlobalAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useGlobalAudio must be used inside AudioProvider");
  }
  return context;
}
