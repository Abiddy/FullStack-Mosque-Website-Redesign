import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Link from "next/link";

const Hero = () => {
  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Content */}
      <div className="flex-grow flex items-center justify-center text-white px-6 md:px-10 lg:px-20 pt-24 md:pt-0">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 md:mb-8 text-white leading-tight">
              Community Based on the Quran and Sunnah
            </h1>
            
            <p className="text-lg md:text-2xl font-light text-white/80 max-w-2xl mb-8 md:mb-12 italic leading-relaxed">
              "Establish prayer and give zakah and bow with those who bow [in worship]." <br/>
              <span className="text-xs md:text-sm font-medium uppercase tracking-widest text-orange-600 not-italic mt-4 block">— Surah Al-Baqarah (2:43)</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12">
              <Link 
                href="#announcements"
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 rounded-sm overflow-hidden shadow-lg shadow-orange-500/20 text-center"
              >
                <span className="relative z-10 uppercase tracking-widest text-[10px] md:text-xs font-bold whitespace-nowrap">Announcements ↓</span>
              </Link>
              <Link 
                href="#donate"
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:border-white hover:bg-white/20 transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
              >
                <img src="/images/heart-3.png" alt="heart" className="w-3 md:w-4 h-3 md:h-4" />
                <span className="relative z-10 uppercase tracking-widest text-[10px] md:text-xs font-bold whitespace-nowrap">Support Us •</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Salah Times Widget */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="w-full max-w-[340px] rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
              <iframe 
                src="https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=JdGOl7dP" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowTransparency={true}
                title="Prayer Timings"
                className="w-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;