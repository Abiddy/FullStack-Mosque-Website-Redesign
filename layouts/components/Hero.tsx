import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import PrayerTimesMinimal from "./PrayerTimesMinimal";

const HeroShaderBackground = dynamic(
  () =>
    import("@/components/ui/hero-section-with-smooth-bg-shader").then(
      (m) => m.HeroShaderBackground
    ),
  { ssr: false }
);

const Hero = () => {
  return (
    <HeroShaderBackground
      id="home"
      className="min-h-screen overflow-hidden"
      colors={["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"]}
      distortion={0.8}
      swirl={0.6}
      speed={0.42}
      offsetX={0.08}
      veilOpacity="bg-white/20"
    >
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-24 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="hero-prayer-card w-full max-w-[460px] rounded-3xl border border-[#e8e8e8] bg-white px-3 py-3 text-center shadow-lg shadow-black/8 sm:max-w-[520px] sm:px-5 sm:py-5 md:max-w-[560px] md:px-6 md:py-6"
        >
          <PrayerTimesMinimal />
        </motion.div>
      </div>
    </HeroShaderBackground>
  );
};

export default Hero;
