import React from 'react';
import { motion } from 'framer-motion';

const ImageCarousel = ({ images, direction = "left", speed = 40 }) => {
  // Triple the images to ensure seamless infinite looping even on large screens
  const displayImages = [...images, ...images, ...images];

  return (
    <div className="relative w-full overflow-hidden py-12 md:py-20 bg-transparent isolation-auto">
      <motion.div
        className="flex gap-6 md:gap-10 items-center w-max"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          // Performance optimization: reduce animation tick rate for browsers
          // by using a very high quality animation frame.
        }}
        style={{
          willChange: "transform",
          transform: "translateZ(0)", // Force GPU acceleration
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        {displayImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="flex-shrink-0"
            style={{
              // Static rotate for performance - no dynamic calculation inside render
              transform: `rotate(${index % 2 === 0 ? (2 + (index % 3)) : -(2 + (index % 3))}deg) translateZ(0)`,
              willChange: "transform",
            }}
          >
            <div className="w-[180px] h-[240px] md:w-[280px] md:h-[380px] rounded-[2rem] overflow-hidden shadow-xl border-[6px] border-white bg-white">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async" // Decode off the main thread
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
