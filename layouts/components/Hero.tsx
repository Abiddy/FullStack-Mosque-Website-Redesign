import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import Navbar from "./Navbar";
import Link from "next/link";

const Hero = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen w-full overflow-hidden" ref={ref}>
      {/* Navbar */}
      <Navbar />
      
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale: 1.1 }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="/images/banner4.jpeg"
          alt="Islamic Center"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4"
        style={{ opacity }}
      >
        <h1 className="text-2xl md:text-6xl font-bold mb-4 text-center text-white px-4">
          Community Based on the Quran and Sunnah
        </h1>
        {/* <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white">
          Strengthening Faith
        </h1> */}
        <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
        "Establish prayer and give zakah and bow with those who bow [in worship]." - Surah Al-Baqarah (2:43)
        </p>
        <div className="flex gap-6">
          <Link 
            href="#salah"
            className="bg-white text-medium text-black px-8 py-3 rounded-md text-lg hover:bg-white/80 transition-colors rounded-xl"
          >
            Prayer Times
          </Link>
          <Link 
            href="#programs"
            className="bg-white text-medium text-black px-8 py-3 rounded-md text-lg hover:bg-white/80 transition-colors rounded-xl"
          >
            Weekly Programs
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator
      <motion.div 
        className="justify-center transform -translate-x-1/2 text-white text-center z-20 cursor-pointer"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity }}
      >
        <p className="text-base mb-3 font-medium">Weekly Programs</p>
        <FaChevronDown className="w-8 h-8 mx-auto" />
      </motion.div> */}
    </div>
  );
};

export default Hero; 