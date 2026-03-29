import React from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import "swiper/swiper.min.css";
import { NextUIProvider } from "@nextui-org/react";
import Hero from "@layouts/components/Hero";
import Announcements from "@layouts/components/Announcements";
import FeatureCard from "@layouts/components/FeatureCard";
import Donate from "@layouts/components/Donate";
import AboutSection from "@layouts/components/AboutSection";
import HeroArchSlideshow from "@layouts/components/HeroArchSlideshow";
import SectionDivider from "@layouts/components/SectionDivider";
import { getListPage } from "@lib/contentParser";

const Home = ({ frontmatter }: any) => {
  const { title } = config.site;

  return (
    <Base title={title}>
      <NextUIProvider>
        <Hero />

        <SectionDivider />

        <section className="relative z-10 bg-[var(--terracotta)] py-14 md:py-24 text-white" id="announcements">
          <div className="container mx-auto">
            <Announcements />
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 bg-[var(--sand-hero)] py-14 md:py-24 text-[var(--ink)]" id="activities">
          <div className="container mx-auto">
            <FeatureCard variant="light" />
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 bg-[var(--terracotta)] py-16 sm:py-20 md:py-24 text-white" id="about">
          <div className="container mx-auto">
            <AboutSection />
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 bg-[var(--sand-hero)] py-14 md:py-24 text-[var(--ink)]" id="donate">
          <div className="container mx-auto">
            <Donate />
          </div>
        </section>

        <SectionDivider />

        <section
          className="relative z-10 bg-[var(--terracotta)] py-14 md:py-24"
          id="community-gallery"
          aria-label="Community photos"
        >
          <div className="container mx-auto flex flex-col items-center justify-center">
            <HeroArchSlideshow intervalMs={300} variant="onTerracotta" />
          </div>
        </section>
      </NextUIProvider>
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
