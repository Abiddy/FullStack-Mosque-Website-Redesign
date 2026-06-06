import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CARDS = [
  {
    label: "Community",
    text: "Quran, tafseer, and seerah programs for all ages",
    image: "/w1.jpg",
  },
  {
    label: "Education",
    text: "A welcoming home for worship and fellowship",
    image: "/w2.jpg",
  },
  {
    label: "Youth",
    text: "Programs that nurture the next generation",
    image: "/w3.jpg",
  },
  {
    label: "Events",
    text: "Gatherings that bring our community together",
    image: "/w4.jpg",
  },
  {
    label: "Service",
    text: "Supporting families across the South Bay",
    image: "/w5.jpg",
  },
];

const ease = [0.32, 0.72, 0, 1] as const;

const CommunityCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % CARDS.length);
    }, 4000);
    return () => window.clearInterval(t);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + CARDS.length) % CARDS.length);
  };

  const visible = [
    CARDS[index],
    CARDS[(index + 1) % CARDS.length],
    CARDS[(index + 2) % CARDS.length],
  ];

  return (
    <section
      id="community-gallery"
      className="fm-section px-6 py-14 md:py-20 lg:px-10"
      aria-label="Community photos"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-pp mb-10 text-[32px] leading-[0.95] text-[#2c2c2c] md:text-[44px] lg:max-w-[700px]">
          Life at the Islamic Institute of Torrance
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visible.map((card, i) => (
                <motion.article
                  key={`${card.label}-${index}-${i}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40, scale: 0.95 }}
                  transition={{ duration: 0.7, ease }}
                  className={`fm-card group relative h-[380px] overflow-hidden rounded-2xl md:h-[500px] ${
                    i > 0 ? "hidden md:block" : ""
                  } ${i > 1 ? "hidden lg:block" : ""}`}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/70">
                      {card.label}
                    </p>
                    <p className="font-pp text-xl leading-tight text-white md:text-2xl">
                      {card.text}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#dee2de] text-[#2c2c2c] transition-colors hover:border-[#b8beb8] hover:bg-[#eef1ed]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#dee2de] text-[#2c2c2c] transition-colors hover:border-[#b8beb8] hover:bg-[#eef1ed]"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityCarousel;
