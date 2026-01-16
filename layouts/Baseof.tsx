import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type base = {
  title?: string,
  meta_title?: string,
  description?: string,
  image?: string,
  noindex?: string,
  canonical?: string,
  children?: any,
}

const BackgroundLayer = ({ src, active }: { src: string, active: boolean }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: active ? 1 : 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-[-5%] z-[-1] bg-cover bg-center bg-no-repeat will-change-opacity pointer-events-none"
    style={{ 
      backgroundImage: `url(${src})`,
      height: '110dvh',
      width: '110vw'
    }}
  />
);

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}: base) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();
  const [activeImage, setActiveImage] = useState("/3.png");

  const images = ["/1.png", "/2.png", "/3.png", "/4.png"];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          switch (sectionId) {
            case 'home':
            case 'announcements':
              setActiveImage("/3.png");
              break;
            case 'activities':
              setActiveImage("/2.png");
              break;
            case 'about':
              setActiveImage("/1.png");
              break;
            case 'donate':
              setActiveImage("/4.png");
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = document.querySelectorAll('section[id], div[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [router.asPath]);

  return (
    <>
      <Head>
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        </title>

        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(description ? description : meta_description)}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description ? description : meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url}${image ? image : meta_image}`}
        />

        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Background Layers */}
      {images.map((src) => (
        <BackgroundLayer key={src} src={src} active={activeImage === src} />
      ))}

      {/* main site */}
      <div className="page-content-wrapper min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Base;
