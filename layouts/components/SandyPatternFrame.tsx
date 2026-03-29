import React from "react";
import { cn } from "@layouts/lib/utils";

export type SandyPatternFrameProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};

const roundedClass: Record<NonNullable<SandyPatternFrameProps["rounded"]>, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

/** Light sandy card — no pattern strips (section dividers handle that). */
export default function SandyPatternFrame({
  children,
  className,
  innerClassName,
  rounded = "2xl",
}: SandyPatternFrameProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-[color-mix(in_srgb,var(--ink)_10%,transparent)] bg-white/55 shadow-sm backdrop-blur-sm",
        roundedClass[rounded],
        className
      )}
    >
      <div className={cn("min-h-0 flex-1 text-[var(--ink)]", innerClassName)}>{children}</div>
    </div>
  );
}
