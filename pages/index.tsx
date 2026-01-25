import React from "react";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import "swiper/swiper.min.css";
import { NextUIProvider } from "@nextui-org/react";
import Hero from "@layouts/components/Hero";
import Announcements from "@layouts/components/Announcements";
import FeatureCard from "@layouts/components/FeatureCard";
import Donate from "@layouts/components/Donate";
import ImageCarousel from "@layouts/components/ImageCarousel";
import { getListPage } from "@lib/contentParser";

const Home = ({ frontmatter }: any) => {
  const { title } = config.site;
  const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/images/banner1.png"];
  const images2 = ["w1.jpg", "w2.jpg", "w3.jpg", "w4.jpg", "w5.jpg"];

  return (
      <Base title={title}>  
        <NextUIProvider>
          {/* Hero Section */}
          <div id="home">
            <Hero />
          </div>

        {/* Content Sections */}
        <div className="relative z-10 bg-white">
          {/* Carousel before Announcements */}
          <ImageCarousel images={images} direction="left" speed={30} />

          {/* Announcements */}
          <section className="py-10" id="announcements">
            <div className="container mx-auto">
              <Announcements />
            </div>
          </section>

          {/* Activities */}
          <section className="py-10" id="activities">
            <div className="container mx-auto">
              <FeatureCard  />
            </div>
          </section>


          {/* about us */}
          <section className="py-10 md:py-20" id="about">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-6xl font-light mb-8 md:mb-12 text-left text-gray-900 tracking-tight italic">About Us</h2>
                <div className="text-left text-lg md:text-xl text-gray-600 leading-relaxed mb-12 md:mb-20 font-light max-w-3xl">
                  The Islamic Institute of Torrance was established with the purpose of providing a place of worship and education for those of the Islamic faith within the 
                  Torrance and surrounding areas. 
                </div>

                {/* Imam Section */}
                <div className="mt-16 md:mt-24 border-t border-gray-100 pt-12 md:pt-20">
                  <h4 className="text-lg md:text-xl font-medium mb-8 md:mb-12 text-left text-gray-900 tracking-widest uppercase">
                    Meet Our Resident Imam
                  </h4>
                  
                  <div className="flex flex-col lg:flex-row items-start gap-10 md:gap-16">
                    {/* Image Container */}
                    <div className="w-full lg:w-1/3">
                      <div className="relative group max-w-[280px] mx-auto lg:mx-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                          src="/images/imam.jpeg"
                          alt="Sheikh Ahmad Umarji"
                          className="relative rounded-lg shadow-2xl w-full h-auto transition-all duration-700"
                        />
                      </div>
                      <h5 className="text-lg font-medium mt-6 text-center lg:text-left text-gray-900">
                        Sheikh Ahmad Umarji
                      </h5>
                    </div>

                    {/* Text Container */}
                    <div className="lg:w-2/3">
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light italic text-left">
                        &quot;Imam Ahmed Umarji graduated from the Tahfidh and Alimiyyah programs in South Africa, 
                        where he studied under esteemed scholars such as Mufti Radha Ul Haq and Mufti Sulaiman Moola. 
                        He holds Ijazahs in Qiraaat, Tafseer, and Hadith. In addition, he has a BS degree from 
                        Cal Poly Pomona. After graduation, Imam Ahmed served as a Quran and Islamic Studies teacher. 
                        Currently, he is the Imam and Religious Director at IIT.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Carousel before Donate */}
          <ImageCarousel images={images2} direction="right" speed={45} />

          <section className="py-10 md:py-20" id="donate">
            <div className="container mx-auto px-4">
              <Donate/>
            </div>
          </section>
        </div>
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
