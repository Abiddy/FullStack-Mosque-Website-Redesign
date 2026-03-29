import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";

const DEFAULT_IMAGES = ["/1.png", "/2.png","/3.png", "/4.png", "/w1.jpg", "/w2.jpg", "/w3.jpg", "/w4.jpg", "/w5.jpg", "/images/banner1.png"];

type Props = {
  images?: string[];
  /** Time each image stays visible before switching (ms). */
  intervalMs?: number;
  className?: string;
  /** Deeper frame + shadow when sitting on terracotta section background. */
  variant?: "default" | "onTerracotta";
};

/**
 * Pointed-arch “moon” frame with a fast-cycling slideshow, film grain, and light color washes.
 */
export default function HeroArchSlideshow({
  images = DEFAULT_IMAGES,
  intervalMs = 600,
  className = "",
  variant = "default",
}: Props) {
  const onTerracotta = variant === "onTerracotta";
  const safeId = useId().replace(/:/g, "");
  const clipPathId = `hero-arch-${safeId}`;
  const [index, setIndex] = useState(0);

  const list = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    if (list.length <= 1) return;

    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? Math.max(intervalMs * 8, 2400) : intervalMs;

    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, ms);
    return () => window.clearInterval(t);
  }, [list.length, intervalMs]);

  const src = list[index] ?? list[0];

  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] ${className}`}>
      <svg width={0} height={0} className="absolute" aria-hidden>
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.26 Q 0.5,-0.02 1,0.26 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm ${
          onTerracotta
            ? "drop-shadow-[0_20px_48px_rgba(0,0,0,0.42)]"
            : "drop-shadow-[0_14px_36px_rgba(44,36,28,0.14)]"
        }`}
        style={{ clipPath: `url(#${clipPathId})` }}
      >
        <div
          className={
            onTerracotta
              ? "absolute inset-0 bg-[color-mix(in_srgb,var(--terracotta)_90%,#120a08)]"
              : "absolute inset-0 bg-[var(--sand-hero)]"
          }
          aria-hidden
        />

        {src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 280px, 360px"
            className="object-cover object-center contrast-[1.06] saturate-[0.82] brightness-[1.04] scale-[1.03]"
            priority
          />
        ) : null}

        {/* Light tints */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-b from-[color-mix(in_srgb,var(--terracotta)_22%,transparent)] via-[color-mix(in_srgb,#7a9eb8_18%,transparent)] to-[color-mix(in_srgb,var(--sandy-muted)_25%,transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.16] bg-[#c4a090]"
          aria-hidden
        />

        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay contrast-125"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />

        <div
          className={
            onTerracotta
              ? "pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
              : "pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color-mix(in_srgb,var(--ink)_10%,transparent)]"
          }
          aria-hidden
        />
      </div>
    </div>
  );
}
