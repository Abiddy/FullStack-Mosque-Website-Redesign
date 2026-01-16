import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import "styles/globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config as fConfig } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Outfit } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

fConfig.autoAddCss = false

const App = ({ Component, pageProps }: any) => {
  const router = useRouter();

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
  }, []);

  return (
    <div className={`${outfit.variable} ${outfit.className} antialiased`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={config.params.ga_tag} />
      
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
