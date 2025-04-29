import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Program {
  id: string;
  title: string;
  time: string;
  days: string;
  image: string;
}

const programs: Program[] = [
  {
    id: 'quran-halaqah',
    title: 'Qur\'an Halaqah',
    time: 'After Fajr',
    days: 'Monday - Saturday',
    image: '/images/banner4.jpeg'
  },
  {
    id: 'hadith-session',
    title: 'Hadith Session',
    time: 'After Isha',
    days: 'Sunday - Friday',
    image: '/images/banner4.jpeg'
  },
  {
    id: 'tafsir-session',
    title: 'Tafsīr Session',
    time: 'After Maghrib',
    days: 'Tuesday',
    image: '/images/banner4.jpeg'
  },
  {
    id: 'sirah-session',
    title: 'Sīrah Session',
    time: 'After Maghrib',
    days: 'Thursday',
    image: '/images/banner4.jpeg'
  },
  {
    id: 'fundamentals-program',
    title: 'Fundamentals Program',
    time: 'After Maghrib',
    days: 'Friday',
    image: '/images/banner4.jpeg'
  }
];

const WeeklyProgram = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + programs.length) % programs.length;
    setPage([newPage, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-3xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10 rounded-3xl" />
            <img
              src={programs[page].image}
              alt={programs[page].title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            />
            <div className="relative z-20 p-6 flex flex-col h-full text-white">
              <div className="inline-block mb-4">
                <h2 className="px-3 py-1 bg-white rounded-full text-sm w-fit">
                  {programs[page].title}
                </h2>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="px-3 py-1 bg-orange-500 rounded-full text-sm w-fit">
                  {programs[page].time}
                </span>
                <span className="px-3 py-1 bg-orange-500/80 rounded-full text-sm w-fit">
                  {programs[page].days}
                </span>
                {programs[page].id === 'fundamentals-program' && (
                  <span className="text-sm mt-2 text-white/90">
                    Module One: Beliefs - Studying ʿAqīdah al-Ṭaḥāwiyyah
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {programs.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-all ${
              page === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgram; 