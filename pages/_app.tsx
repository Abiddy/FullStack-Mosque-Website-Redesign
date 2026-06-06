import config from "@config/config.json";
import Head from "next/head";
import { useEffect } from "react";
import "styles/style.scss";
import "styles/globals.css";
import "styles/landing.css";
import "styles/flowmate-theme.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config as fConfig } from "@fortawesome/fontawesome-svg-core";
import { GoogleAnalytics } from "nextjs-google-analytics";
import {
  Instrument_Sans,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Script from "next/script";
import Lenis from "@studio-freight/lenis";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-instrument-sans",
});

fConfig.autoAddCss = false;

const App = ({ Component, pageProps }: any) => {
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className={`${instrumentSerif.variable} ${manrope.variable} ${instrumentSans.variable} antialiased`}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>

      <GoogleAnalytics trackPageViews gaMeasurementId={config.params.ga_tag} />

      {config.params.tag_manager_id && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${config.params.tag_manager_id}');
            `,
          }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
