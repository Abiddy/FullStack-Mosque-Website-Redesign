import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showWhiteNav, setShowWhiteNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only show white navbar when we're scrolling up AND not at the top
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsScrollingUp(true);
        setShowWhiteNav(true);
      } else {
        setIsScrollingUp(false);
        setShowWhiteNav(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { title: "About", href: "#about" },
    { title: "Programs", href: "#programs" },
    { title: "Announcements", href: "#announcements" },
    { title: "Contact", href: "#contactUs" },
    { title: "Donate", href: "#donate" },
  ];

  return (
    <>
      {/* Initial transparent navbar */}
      <nav className="absolute top-0 left-0 right-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img 
              src="/images/iitlogo.png" 
              alt="IIT Logo" 
              className="hidden md:block h-20 md:h-20 lg:h-20 w-auto transition-all" 
            />
            <img 
              src="/images/iitlogo-2.png" 
              alt="IIT Logo" 
              className="block md:hidden h-16 w-auto transition-all" 
            />
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link 
              href="#donate"
              className="p-1.5 md:p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <img
                src="/images/heart-3.png"
                alt="Donate"
                className="w-6 h-6"
              />
            </Link>

            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col space-y-1.5 p-1.5 md:p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              <span className="w-5 md:w-6 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 md:w-6 h-0.5 bg-white rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sliding white navbar */}
      <AnimatePresence>
        {showWhiteNav && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/">
                <img 
                  src="/images/iitlogo.png" 
                  alt="IIT Logo" 
                  className="hidden md:block h-16 w-auto transition-all" 
                />
                <img 
                  src="/images/iitlogo-2.png" 
                  alt="IIT Logo" 
                  className="block md:hidden h-12 w-auto transition-all" 
                />
              </Link>

              <div className="flex items-center space-x-2 md:space-x-4">
                <Link 
                  href="#donate"
                  className="p-1.5 md:p-2 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <img
                    src="/images/heart2.png"
                    alt="Donate"
                    className="w-6 h-6"
                  />
                </Link>

                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex flex-col space-y-1.5 p-1.5 md:p-2 rounded-lg hover:bg-black/5 transition-colors"
                  aria-label="Menu"
                >
                  <span className="w-5 md:w-6 h-0.5 bg-black rounded-full"></span>
                  <span className="w-5 md:w-6 h-0.5 bg-black rounded-full"></span>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-xl"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="pt-16 px-4">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block py-3 text-lg hover:text-[#004AAD] transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 