import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const zelleEmail = "iit@torrancemasjid.org";

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(zelleEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = zelleEmail;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="px-0 md:px-4">
      <div className="max-w-5xl mx-auto bg-black/50 backdrop-blur-md p-8 md:p-20 rounded-3xl border border-white/10 shadow-2xl">
        <h2 className="text-3xl md:text-6xl font-light mb-8 md:mb-12 text-left text-white tracking-tight italic">Support Our Mission</h2>
        
        <div className="text-left mb-12 md:mb-20 max-w-3xl">
          <p className="text-lg md:text-xl italic font-light text-white/90 leading-relaxed mb-4 md:mb-6">
            "Those who in charity spend of their goods by night and by day, in secret and in public, have their reward with their Lord: on them shall be no fear, nor shall they grieve."
          </p>
          <p className="text-xs md:text-sm font-medium text-orange-500 tracking-widest uppercase">
            — Quran (2:274)
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 max-w-lg">
          <div className="w-full space-y-4">
            <a
              href="https://venmo.com/u/IITMasjid"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button
                className="w-full py-4 md:py-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group flex items-center justify-center gap-4"
              >
                <img src="images/v.png" alt="Venmo" className="h-5 md:h-6 brightness-0 invert group-hover:invert-0 transition-all" />
                <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:text-orange-500 transition-colors">Donate via Venmo</span>
              </button>
            </a>

            <button
              onClick={copyToClipboard}
              className="w-full py-4 md:py-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group relative flex items-center justify-center gap-4"
            >
              <img src="images/zelle.png" alt="zelle" className="h-5 md:h-6 brightness-0 invert group-hover:invert-0 transition-all" />
              <div className="flex flex-col items-center text-center">
                <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:text-orange-500 transition-colors">Donate via Zelle</span>
                <span className="text-[10px] md:text-xs text-white/40 font-light">{zelleEmail}</span>
              </div>
              <FontAwesomeIcon 
                icon={faCopy} 
                className={`h-3 md:h-4 ml-2 transition-colors ${copied ? 'text-green-500' : 'text-white/30 group-hover:text-orange-500'}`}
              />
              {copied && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full"
                >
                  Copied to clipboard
                </motion.div>
              )}
            </button>

            <a href="https://www.paypal.com/paypalme/torrancemasjid" target="_blank" rel="noopener noreferrer" className="block w-full">
              <button className="w-full py-4 md:py-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 group flex items-center justify-center gap-4">
                <img src="images/paypal.png" alt="PayPal" className="h-5 md:h-6 brightness-0 invert group-hover:invert-0 transition-all" />
                <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:text-orange-500 transition-colors">Donate via PayPal</span>
              </button>
            </a>
          </div>

          <div className="pt-8 md:pt-12 text-white/40 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase text-center w-full">
            Every contribution makes a difference
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
