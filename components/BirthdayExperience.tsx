"use client";

import { useRef, useState } from "react";
import { AudioProvider, useGlobalAudio } from "@/components/AudioProvider";
import { BestieCards } from "@/components/BestieCards";
import { BestieStats } from "@/components/BestieStats";
import { BirthdayHero } from "@/components/BirthdayHero";
import { BirthdayLetter } from "@/components/BirthdayLetter";
import { EasterEggs } from "@/components/EasterEggs";
import { FinalSurprise } from "@/components/FinalSurprise";
import { FriendshipMessage } from "@/components/FriendshipMessage";
import { InsideJokeVault } from "@/components/InsideJokeVault";
import { MusicPlayer } from "@/components/MusicPlayer";
import { OpeningScreen } from "@/components/OpeningScreen";
import { PhotoArchive } from "@/components/PhotoArchive";

export function BirthdayExperience() {
  return (
    <AudioProvider>
      <BirthdayPage />
    </AudioProvider>
  );
}

function BirthdayPage() {
  const [opened, setOpened] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { startMusic } = useGlobalAudio();

  const handleOpen = async () => {
    await startMusic();
    setOpened(true);
    window.setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream bg-paper">
      <OpeningScreen opened={opened} onOpen={handleOpen} />
      <div ref={mainRef} className={opened ? "relative z-10" : "pointer-events-none relative z-0"}>
        <BirthdayHero />
        <PhotoArchive />
        <BestieCards />
        <InsideJokeVault />
        <BestieStats />
        <BirthdayLetter />
        <FriendshipMessage />
        <FinalSurprise />
      </div>
      <EasterEggs />
      <MusicPlayer />
    </main>
  );
}
