import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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
      const textArea = document.createElement("textarea");
      textArea.value = zelleEmail;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const btnClass =
    "w-full py-4 md:py-5 rounded-sm border border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-transparent text-[var(--ink)] text-sm md:text-[15px] font-sans font-medium tracking-wide text-center transition-colors hover:border-[var(--terracotta)] hover:bg-[color-mix(in_srgb,var(--terracotta)_6%,transparent)]";

  return (
    <div className="px-4 md:px-8">
      <header className="text-center mb-16 md:mb-24 max-w-xl mx-auto">
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--ink)] mb-8">Support Our Mission</p>
        <p className="font-serif text-sm md:text-base text-stone-700 leading-[1.85] mb-6">
          &quot;Those who in charity spend of their goods by night and by day, in secret and in public, have their reward
          with their Lord: on them shall be no fear, nor shall they grieve.&quot;
        </p>
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[var(--terracotta)]">
          — Quran (2:274)
        </p>
      </header>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex w-full max-w-md flex-col gap-4">
          <a href="https://venmo.com/u/IITMasjid" target="_blank" rel="noopener noreferrer" className="block w-full">
            <button type="button" className={btnClass}>
              Donate via Venmo
            </button>
          </a>

          <button type="button" onClick={copyToClipboard} className={`${btnClass} relative flex items-center justify-center gap-3`}>
            <div className="flex flex-col items-center">
              <span>Donate via Zelle</span>
              <span className="text-[10px] md:text-xs text-stone-500 font-serif font-light mt-1">{zelleEmail}</span>
            </div>
            <FontAwesomeIcon
              icon={faCopy}
              className={`h-3 md:h-4 shrink-0 ${copied ? "text-emerald-600" : "text-stone-400"}`}
            />
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-11 left-1/2 -translate-x-1/2 bg-[var(--terracotta)] text-white text-[9px] font-sans font-bold uppercase tracking-widest py-2 px-4 rounded-full shadow-lg"
              >
                Copied
              </motion.div>
            )}
          </button>

          <a href="https://www.paypal.com/paypalme/torrancemasjid" target="_blank" rel="noopener noreferrer" className="block w-full">
            <button type="button" className={btnClass}>
              Donate via PayPal
            </button>
          </a>
        </div>

        <p className="mt-10 sm:mt-12 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-stone-500 text-center max-w-md px-2">
          Every contribution makes a difference
        </p>
      </div>
    </div>
  );
};

export default Donate;
