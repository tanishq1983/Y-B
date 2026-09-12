"use client";

import { motion } from "framer-motion";
import { MiniSectionTitle, SectionShell } from "@/components/BirthdayHero";
import { siteConfig } from "@/data/siteConfig";

export function BestieStats() {
  return (
    <SectionShell>
      <MiniSectionTitle title="BESTIE STATISTICS" subtitle="The numbers are fake. The accuracy is emotionally undeniable." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {siteConfig.stats.map((stat, index) => (
          <motion.article
            key={stat.label}
            className="rounded-[1.2rem] border border-white/70 bg-paper p-5 shadow-scrapbook"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="mb-4 flex items-end justify-between gap-4">
              <h3 className="text-base font-black text-ink">{stat.label}</h3>
              <motion.p
                className="handwritten text-3xl font-black text-cocoa"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.2 }}
              >
                {stat.display}
              </motion.p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-cocoa/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blush via-peach to-lavender"
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.value}%` }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 1.1, delay: index * 0.08, ease: "easeOut" }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
