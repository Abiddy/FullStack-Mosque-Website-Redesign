import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const ImageCarousel = ({ images }) => {
  const containerRef = useRef(null);
  
  // Memoize images to prevent unnecessary re-renders
  const displayImages = useMemo(() => images, [images]);

  // Scroll-based animation logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Optimized spring settings for smooth but responsive movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  // Opacity: cards fade in as they spread
  const opacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-24 md:py-64 bg-white isolation-auto"
      style={{ contain: 'paint' }}
    >
      <div className="flex justify-center items-center min-h-[250px] md:min-h-[500px] w-full relative">
        <motion.div
          className="relative flex items-center justify-center w-full"
          style={{
            opacity: opacity,
            willChange: 'opacity',
          }}
        >
          {displayImages.map((src, index) => {
            const midPoint = (displayImages.length - 1) / 2;
            const distance = index - midPoint;
            
            // Mobile-responsive spread distance
            // On mobile, we spread them less so they don't go off-screen too much
            const spreadDistance = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 320;

            const x = useTransform(
              smoothProgress, 
              [0.1, 0.25, 0.4, 0.6],
              [0, distance * (spreadDistance * 0.6), distance * (spreadDistance * 0.85), distance * spreadDistance]
            );
            
            const rotation = index % 2 === 0 ? (2 + (index % 3)) : -(2 + (index % 3));

            return (
              <motion.div
                key={`${src}-${index}`}
                className="absolute flex-shrink-0"
                style={{
                  x: x,
                  rotate: rotation,
                  willChange: "transform",
                  zIndex: displayImages.length - index,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Mobile-responsive card sizes */}
                <div className="w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] md:w-[280px] md:h-[380px] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl border-[4px] md:border-[6px] border-white bg-white relative">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 120px, 280px"
                    className="object-cover"
                    priority={index < 3}
                    loading={index >= 3 ? "lazy" : undefined}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCarousel;
