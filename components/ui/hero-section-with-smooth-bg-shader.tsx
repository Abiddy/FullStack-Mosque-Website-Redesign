import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const LIGHT_HERO_COLORS = [
  "#ffffff",
  "#fffef8",
  "#fff9eb",
  "#fff3d4",
  "#ffe9a8",
  "#ffd970",
];

/** Default multi-color palette from the shader prompt */
export const PROMPT_HERO_COLORS = [
  "#72b9bb",
  "#b5d9d9",
  "#ffd1bd",
  "#ffebe0",
  "#8cc5b8",
  "#dbf4a4",
];

/** Soft green / mint / sage — distinct from hero teal palette */
export const ASK_SECTION_COLORS = [
  "#86efac",
  "#a7f3d0",
  "#bbf7d0",
  "#d9f99d",
  "#6ee7b7",
  "#ccfbf1",
];

type ShaderOptions = {
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  veilOpacity?: string;
};

export type HeroShaderBackgroundProps = React.HTMLProps<HTMLElement> & {
  children: ReactNode;
} & ShaderOptions;

export function HeroShaderBackground({
  children,
  className,
  colors = PROMPT_HERO_COLORS,
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  veilOpacity = "bg-white/25",
  ...props
}: HeroShaderBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden bg-[#fffef8] text-[#2c2c2c]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                veilOpacity
              )}
            />
          </>
        )}
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col">{children}</div>
    </section>
  );
}

/** Fills a positioned parent — for tall section panels (not full viewport) */
export function ShaderPanelBackground({
  className,
  colors = ASK_SECTION_COLORS,
  distortion = 0.85,
  swirl = 0.55,
  speed = 0.38,
  offsetX = 0.12,
  veilOpacity = "bg-white/22",
}: ShaderOptions & { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 540 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setDimensions({
        width: Math.max(el.clientWidth, 1),
        height: Math.max(el.clientHeight, 1),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden bg-[#fffef8]", className)}
      aria-hidden
    >
      {mounted && (
        <>
          <MeshGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={colors}
            distortion={distortion}
            swirl={swirl}
            grainMixer={0}
            grainOverlay={0}
            speed={speed}
            offsetX={offsetX}
          />
          <div
            className={cn("pointer-events-none absolute inset-0", veilOpacity)}
          />
        </>
      )}
    </div>
  );
}

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  colors?: string[];
  distortion?: number;
  swirl?: number;
  speed?: number;
  offsetX?: number;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  maxWidth?: string;
  veilOpacity?: string;
  fontFamily?: string;
  fontWeight?: number;
}

export function HeroSection({
  title = "Intelligent AI Agents for",
  highlightText = "Smart Brands",
  description = "Transform your brand and evolve it through AI-driven brand guidelines and always up-to-date core components.",
  buttonText = "Join Waitlist",
  onButtonClick,
  colors = LIGHT_HERO_COLORS,
  distortion = 0.75,
  swirl = 0.4,
  speed = 0.35,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-6xl",
  veilOpacity = "bg-white/45",
  fontFamily = "Satoshi, sans-serif",
  fontWeight = 500,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleButtonClick = () => {
    onButtonClick?.();
  };

  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fffef8]",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                veilOpacity
              )}
            />
          </>
        )}
      </div>

      <div className={cn("relative z-10 mx-auto w-full px-6", maxWidth)}>
        <div className="text-center">
          <h1
            className={cn(
              "mb-6 text-balance text-4xl font-bold leading-tight text-[#2c2c2c] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]",
              titleClassName
            )}
            style={{ fontFamily, fontWeight }}
          >
            {title} <span className="text-primary">{highlightText}</span>
          </h1>
          <p
            className={cn(
              "mx-auto mb-10 max-w-2xl px-4 text-pretty text-lg leading-relaxed text-[#444141] sm:text-xl",
              descriptionClassName
            )}
          >
            {description}
          </p>
          <button
            type="button"
            onClick={handleButtonClick}
            className={cn(
              "rounded-full border-4 border-card bg-[rgba(63,63,63,1)] px-6 py-4 text-sm text-white transition-colors hover:bg-[rgba(63,63,63,0.9)] sm:px-8 sm:py-6 sm:text-base",
              buttonClassName
            )}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
