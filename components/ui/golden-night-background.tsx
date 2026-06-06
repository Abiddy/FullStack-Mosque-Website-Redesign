import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "@layouts/lib/utils";
import type { ReactNode } from "react";

const LIGHT_GOLD_COLORS = [
  "#ffffff",
  "#fffef8",
  "#fff9eb",
  "#fff3d4",
  "#ffe9a8",
  "#ffd970",
  "#f5c842",
  "#faf6ee",
];

type GoldenNightBackgroundProps = React.HTMLProps<HTMLDivElement> & {
  children: ReactNode;
};

export const GoldenNightBackground = ({
  className,
  children,
  ...props
}: GoldenNightBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden bg-[#fffef8] text-[#2c2c2c]",
        className
      )}
      {...props}
    >
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={LIGHT_GOLD_COLORS}
        speed={0.4}
        distortion={0.75}
        swirl={0.35}
        grainOverlay={0.02}
      />

      <div className="relative z-10 flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
};
