import { motion, useInView } from "framer-motion";
import React, { useRef, type ReactNode } from "react";

type TextFadeProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down";
  stagger?: number;
  as?: "div" | "section" | "header";
};

const childVariants = (offset: number) => ({
  hidden: { opacity: 0, y: offset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
});

const TextFade = ({
  children,
  className = "",
  direction = "up",
  stagger = 0.15,
  as = "div",
}: TextFadeProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const offset = direction === "up" ? 18 : -18;
  const Component = motion[as];

  const items = React.Children.toArray(children);

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={childVariants(offset)}>
          {child}
        </motion.div>
      ))}
    </Component>
  );
};

export default TextFade;
