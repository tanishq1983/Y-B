"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { MiniSectionTitle, SectionShell } from "@/components/BirthdayHero";
import { siteConfig, type PhotoItem } from "@/data/siteConfig";

export function PhotoArchive() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <SectionShell id="archives" className="bg-gradient-to-b from-transparent via-paper/45 to-transparent">
      <MiniSectionTitle
        eyebrow="The evidence folder"
        title="THE YAGYAVI ARCHIVES"
        subtitle="A highly official scrapbook collection of cuteness, chaos, and photos that probably deserve captions longer than this."
      />

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {siteConfig.photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative mb-5 block w-full break-inside-avoid rounded-[1.1rem] bg-paper p-3 pb-12 text-left shadow-scrapbook ring-1 ring-cocoa/10 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blush"
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            initial={{ opacity: 0, y: 30, rotate: photo.rotation - 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.04 }}
            whileHover={{ y: -8, rotate: photo.rotation * 0.45 }}
          >
            <span className="tape left-1/2 top-1 z-10 h-6 w-20 -translate-x-1/2 rotate-2 opacity-70" />
            <span className="relative block overflow-hidden rounded-xl bg-cream">
              <Image
                src={photo.src}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw"
                className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.025]"
                loading={index < 3 ? "eager" : "lazy"}
                priority={index === 0}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallbackImg = document.createElement('img');
                    fallbackImg.src = photo.src;
                    fallbackImg.alt = photo.caption;
                    fallbackImg.style.cssText = 'width:100%;height:auto;object-fit:contain;';
                    parent.appendChild(fallbackImg);
                  }
                }}
              />
              <span className="absolute right-3 top-3 rounded-full bg-paper/85 p-2 text-cocoa opacity-0 shadow transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </span>
            <span className="handwritten absolute bottom-3 left-4 right-4 line-clamp-2 text-sm font-bold leading-5 text-cocoa sm:text-base">
              {photo.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <PhotoLightbox selectedIndex={selectedIndex} onClose={() => setSelectedIndex(null)} onChange={setSelectedIndex} />
    </SectionShell>
  );
}

function PhotoLightbox({
  selectedIndex,
  onClose,
  onChange
}: {
  selectedIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const selected = selectedIndex === null ? null : siteConfig.photos[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((selectedIndex + 1) % siteConfig.photos.length);
      if (event.key === "ArrowLeft") onChange((selectedIndex - 1 + siteConfig.photos.length) % siteConfig.photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange, onClose, selectedIndex]);

  if (!selected) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/72 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
      >
        <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close lightbox" />
        <motion.div
          className="relative z-10 grid max-h-[92vh] w-full max-w-5xl gap-4 rounded-[1.4rem] bg-paper p-3 shadow-polaroid ring-1 ring-white/60 sm:p-5"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative flex max-h-[72vh] items-center justify-center overflow-hidden rounded-xl bg-cream">
            <Image
              src={selected.src}
              alt={selected.caption}
              width={selected.width}
              height={selected.height}
              sizes="94vw"
              className="max-h-[72vh] w-auto max-w-full object-contain"
              priority
            />
          </div>
          <p className="handwritten px-1 text-center text-lg font-bold text-cocoa sm:text-2xl">{selected.caption}</p>
          <LightboxButton label="Previous photo" className="left-3 sm:left-5" onClick={() => onChange((selectedIndex! - 1 + siteConfig.photos.length) % siteConfig.photos.length)}>
            <ChevronLeft className="h-5 w-5" />
          </LightboxButton>
          <LightboxButton label="Next photo" className="right-3 sm:right-5" onClick={() => onChange((selectedIndex! + 1) % siteConfig.photos.length)}>
            <ChevronRight className="h-5 w-5" />
          </LightboxButton>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream shadow-lg outline-none transition hover:bg-cocoa focus-visible:ring-4 focus-visible:ring-blush"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LightboxButton({ children, className, label, onClick }: { children: React.ReactNode; className: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/92 text-ink shadow-lg outline-none transition hover:bg-blush focus-visible:ring-4 focus-visible:ring-blush ${className}`}
      aria-label={label}
    >
      {children}
    </button>
  );
}
