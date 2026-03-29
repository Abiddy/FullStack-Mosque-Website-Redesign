import React, { useState } from "react";
import activities from "./activities.json";
import { motion } from "framer-motion";
import Image from "next/image";

const Modal = ({ title, body, handleClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[var(--sandy-cream)] p-10 rounded-2xl max-w-lg w-full shadow-2xl border border-[color-mix(in_srgb,var(--ink)_10%,transparent)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-light mb-6 text-[var(--ink)] tracking-tight">{title}</h2>
        <p className="text-stone-600 leading-relaxed font-light mb-8 font-serif">{body}</p>
        <button
          className="w-full py-3 bg-[var(--terracotta)] text-white rounded-xl font-medium hover:bg-[var(--terracotta-hover)] transition-colors uppercase tracking-widest text-xs font-sans"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

function activityPreview(item) {
  const c = (item.content || "").trim();
  if (c) return c;
  const r = (item.readmore || "").trim();
  if (r.length <= 140) return r;
  return `${r.slice(0, 137).trim()}…`;
}

/** @param {{ variant?: 'terracotta' | 'light' }} props */
const FeatureCard = ({ variant = "terracotta" }) => {
  const light = variant === "light";
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  const handleExpand = (item) => {
    setModalContent({ title: item.name, body: item.readmore });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({ title: "", body: "" });
  };

  const titleClass = light
    ? "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--ink)] mb-8"
    : "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white mb-8";
  const subClass = light
    ? "font-serif text-sm md:text-base text-stone-600 leading-[1.85]"
    : "font-serif text-sm md:text-base text-white/80 leading-[1.85]";
  const h3Class = light
    ? "font-sans text-sm md:text-base font-medium uppercase tracking-[0.18em] text-[var(--ink)] mb-5 leading-snug"
    : "font-sans text-sm md:text-base font-medium uppercase tracking-[0.18em] text-white mb-5 leading-snug";
  const bodyClass = light
    ? "font-serif text-sm md:text-[15px] text-stone-700 leading-[1.85] max-w-md mx-auto mb-6 grow"
    : "font-serif text-sm md:text-[15px] text-white/85 leading-[1.85] max-w-md mx-auto mb-6 grow";
  const btnClass = light
    ? "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--terracotta)] hover:opacity-80 transition-opacity bg-transparent border-0 cursor-pointer"
    : "font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/70 hover:text-white transition-colors bg-transparent border-0 cursor-pointer";
  const iconClass = light
    ? "object-contain opacity-85"
    : "object-contain brightness-0 invert";

  return (
    <div className="px-4 md:px-8">
      <header className="text-center mb-16 md:mb-24 max-w-xl mx-auto">
        <p className={titleClass}>Our Activities</p>
        <p className={subClass}>Programs and gatherings that bring our community together.</p>
      </header>

      <div className="grid gap-y-16 md:gap-y-20 gap-x-10 md:gap-x-16 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        {activities.map((item, i) => (
          <article
            key={`feature-${i}`}
            className="text-center bg-transparent border-0 shadow-none px-2 md:px-4 flex flex-col items-center"
          >
            {item.icon && (
              <div className="relative h-10 w-10 md:h-12 md:w-12 mb-6 opacity-90">
                <Image src={item.icon} alt={item.name} fill className={iconClass} />
              </div>
            )}

            <h3 className={h3Class}>{item.name}</h3>

            <p className={bodyClass}>{activityPreview(item)}</p>

            <button type="button" className={btnClass} onClick={() => handleExpand(item)}>
              Read more →
            </button>
          </article>
        ))}
      </div>

      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Modal title={modalContent.title} body={modalContent.body} handleClose={handleCloseModal} />
        </motion.div>
      )}
    </div>
  );
};

export default FeatureCard;
