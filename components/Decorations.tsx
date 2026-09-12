"use client";

import { motion } from "framer-motion";

type Particle = {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
  glyph: string;
  rotate: number;
};

export function makeParticles(count: number, glyphs = ["✦", "✧", "✿", "♡", "★"]) {
  return Array.from({ length: count }, (_, id) => {
    const seed = Math.sin((id + 1) * 12.9898) * 43758.5453;
    const rand = seed - Math.floor(seed);
    const seedTwo = Math.sin((id + 4) * 78.233) * 24634.6345;
    const randTwo = seedTwo - Math.floor(seedTwo);
    return {
      id,
      left: Math.round(rand * 100),
      delay: randTwo * 2.6,
      size: 16 + Math.round(randTwo * 18),
      duration: 5 + rand * 5,
      glyph: glyphs[id % glyphs.length],
      rotate: -24 + randTwo * 48
    };
  });
}

export function FloatingGlyphs({
  count = 18,
  className = "",
  glyphs
}: {
  count?: number;
  className?: string;
  glyphs?: string[];
}) {
  const particles = makeParticles(count, glyphs);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute text-cocoa/35 drop-shadow-sm"
          style={{
            left: `${particle.left}%`,
            top: `${(particle.id * 17) % 96}%`,
            fontSize: particle.size
          }}
          animate={{
            y: [0, -16, 0],
            rotate: [particle.rotate, -particle.rotate, particle.rotate],
            opacity: [0.2, 0.65, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        >
          {particle.glyph}
        </motion.span>
      ))}
    </div>
  );
}

export function ConfettiBurst({ active, large = false }: { active: boolean; large?: boolean }) {
  if (!active) return null;
  const particles = makeParticles(large ? 72 : 38, ["✦", "✧", "✿", "★", "✩", "•"]);
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute font-bold"
          style={{
            left: `${particle.left}%`,
            top: "-8%",
            color: ["#f7c8cf", "#d8c5ee", "#f7d2b8", "#c9d8c5", "#6f584a"][particle.id % 5],
            fontSize: large ? particle.size + 6 : particle.size
          }}
          initial={{ y: -40, rotate: 0, opacity: 0 }}
          animate={{ y: "112vh", rotate: 360 + particle.rotate, opacity: [0, 1, 1, 0] }}
          transition={{ duration: large ? 5.2 : 3.2, delay: particle.delay / 5, ease: "easeOut" }}
        >
          {particle.glyph}
        </motion.span>
      ))}
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className = ""
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
