import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_073438_071156e5-2a7a-45d8-a8d9-c628d2144e88.mp4";

const VideoShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="video" className="fm-section px-6 py-12 md:py-16 lg:px-10">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border-2 border-[#dee2de] bg-[#eef1ed]"
      >
        <video
          className="aspect-video w-full object-cover"
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="glass-card max-w-lg rounded-2xl px-6 py-5 text-center md:px-8 md:py-6">
            <p className="font-pp text-lg italic leading-snug text-[#2c2c2c] md:text-2xl">
              Which of the Favors of Your Lord will you Deny?
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#646464]">
              — Surah Ar-Rahman (55:13)
            </p>
            <p className="mt-5 font-pp text-base text-[#444141] md:text-lg">
              Join us at the Islamic Institute of Torrance.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoShowcase;
