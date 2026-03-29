import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

import PrayerTimesMinimal from "@layouts/components/PrayerTimesMinimal";

/** Surah Al-Baqarah, ayah 2 (common English rendering). */
const BAQARAH_2_2 =
  "This is the Book about which there is no doubt, a guidance for those conscious of Allah.";

/** Keep in sync with `.hero-ayah-word` stagger + duration in globals.css */
const WORD_STAGGER_S = 0.14;
const WORD_FADE_DURATION_S = 0.58;
/** Extra stagger units after “doubt,” so the clause break reads with a slightly longer pause. */
const EXTRA_STAGGER_AFTER_DOUBT = 1.65;

function BaqarahAyahWordFade() {
  const words = BAQARAH_2_2.split(" ");
  const doubtIdx = words.findIndex((w) => w === "doubt," || /^doubt[,;]?$/i.test(w));

  const delayIndex = (i: number) =>
    doubtIdx >= 0 && i > doubtIdx ? i + EXTRA_STAGGER_AFTER_DOUBT : i;

  const lastWordStart = delayIndex(words.length - 1) * WORD_STAGGER_S;
  const citationDelayS = lastWordStart + WORD_FADE_DURATION_S + 0.2;

  return (
    <div className="mb-6 sm:mb-8 md:mb-12 max-w-3xl">
      <p
        className="font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light italic text-[var(--ink)] leading-[1.45] sm:leading-[1.35] md:leading-[1.3]"
        aria-label={BAQARAH_2_2}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="hero-ayah-word"
            style={{ "--w": delayIndex(i) } as CSSProperties}
          >
            {word}
          </span>
        ))}
      </p>
      <span
        className="hero-ayah-cite mt-4 sm:mt-6 md:mt-8 block text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-[var(--terracotta)]"
        style={{ "--cite-d": `${citationDelayS}s` } as CSSProperties}
      >
        — Surah Al-Baqarah (2:2)
      </span>
    </div>
  );
}

const Hero = () => {
  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col bg-[var(--sand-hero)]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center text-[var(--ink)] px-8 md:px-10 lg:px-20 pt-28 md:pt-32 lg:pt-24 relative z-10">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
          <div className="text-left">
            <BaqarahAyahWordFade />

            <div className="mt-6 sm:mt-8 md:mt-12 flex flex-row flex-nowrap gap-2 sm:gap-4 md:gap-6 w-full">
              <Link
                href="#announcements"
                className="group relative min-w-0 flex-1 px-3 sm:px-8 md:px-10 py-3 md:py-4 bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta-hover)] transition-all duration-300 rounded-sm overflow-hidden shadow-md shadow-stone-900/10 text-center flex items-center justify-center"
              >
                <span className="relative z-10 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] md:text-xs font-bold text-center leading-tight">
                  Announcements ↓
                </span>
              </Link>
              <Link
                href="#donate"
                className="group relative min-w-0 flex-1 px-3 sm:px-8 md:px-10 py-3 md:py-4 bg-transparent border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] text-[var(--ink)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta)] transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <div className="relative w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0">
                  <Image src="/images/heart-3.png" alt="heart" fill className="object-contain opacity-80 group-hover:opacity-100" />
                </div>
                <span className="relative z-10 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] md:text-xs font-bold leading-tight">
                  Support Us •
                </span>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full flex justify-center lg:justify-end mt-5 sm:mt-6 md:mt-8 lg:mt-0"
          >
            <PrayerTimesMinimal />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
