import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", href: "#home" },
    { title: "Announcements", href: "#announcements" },
    { title: "Activities", href: "#activities" },
    { title: "About", href: "#about" },
    { title: "Donate", href: "#donate" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`bg-transparent transition-[box-shadow,background-color] duration-300 ${
          isScrolling ? "bg-[color-mix(in_srgb,var(--sand-hero)_88%,white)]/85 backdrop-blur-md shadow-sm shadow-stone-900/5" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 md:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold text-[var(--ink)] whitespace-normal md:whitespace-nowrap max-w-[150px] md:max-w-none">
              Islamic Institute of Torrance
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="uppercase tracking-[0.15em] text-[10px] md:text-[11px] font-bold text-stone-600 transition-colors hover:text-[var(--terracotta)]"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-10">
            <Link
              href="#donate"
              className="flex items-center gap-2 px-4 md:px-6 py-2 border border-[var(--terracotta)] text-[var(--terracotta)] text-[9px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--terracotta)] hover:text-white transition-all duration-300"
            >
              Support Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
