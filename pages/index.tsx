import React from "react";
import config from "@config/config.json";
import theme from "@config/theme.json";
import Base from "@layouts/Baseof";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { useEffect, useState } from "react";
import ContactUs from "@layouts/components/ContactUs";
import FeatureCard from "@layouts/components/FeatureCard";
import SalahCard from "@layouts/components/SalahCard";
import Announcements from "@layouts/components/Announcements";
import Duas from "@layouts/components/Duas/Duas";
import Donate from "@layouts/components/Donate";
import Header from "@layouts/partials/Header";
import { NextUIProvider } from "@nextui-org/react";
import {Snippet} from "@nextui-org/react";
import { Banner } from "@layouts/components/Banner";
import SalahTimer from "@layouts/components/SalahTimer";

async function getSalah() {
  const res = await fetch("/api/salah");
  return res.json();
}
async function getAdhan() {
  const res = await fetch("/api/prayerTimes");
  return res.json();
}

async function getAnnouncements() {
  const res = await fetch("/api/announcements");
  return res.json();
}

async function getQuestions() {
  const res = await fetch("/api/questions");
  return res.json();
}

const Home = ({ frontmatter }: any) => {
  const { feature, salat, contact_us } = frontmatter;
  const { title, salah_type } = config.site;
  const { colors } = theme;
  const [salah, setSalah] = useState<any>();
  const [adhan, setAdhan] = useState<any>();
  const [announcements, setAnnouncements] = useState<any>();
  const [questions, setQuestions] = useState<any>();


  useEffect(() => {
    async function _getSalah() {
      const data = await getSalah();
      setSalah(data);
    }
    _getSalah();
  }, []);

  useEffect(() => {
    async function _getAdhan() {
      const data = await getAdhan();
      setAdhan(data);
    }
    _getAdhan();
  }, []);

  useEffect(() => {
    async function _getAnnouncements() {
      const data = await getAnnouncements();
      setAnnouncements(data);
    }
    _getAnnouncements();
  }, []);

  useEffect(() => {
    async function _getQuestions() {
      const data = await getQuestions();
      setQuestions(data);
    }
    _getQuestions();
  }, []);

  console.log({ 'salah': salah, 'adhan': adhan })

  return (
    <div>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top Left */}
        <div className="absolute -left-20 -top-20 opacity-[0.03] rotate-[-15deg]">
          <img src="/images/logo-pattern.png" alt="" className="w-96 h-96" />
        </div>
        {/* Top Right */}
        <div className="absolute -right-20 top-1/4 opacity-[0.03] rotate-[15deg]">
          <img src="/images/logo-pattern.png" alt="" className="w-96 h-96" />
        </div>
        {/* Bottom Left */}
        <div className="absolute left-1/4 bottom-1/4 opacity-[0.03] rotate-[45deg]">
          <img src="/images/logo-pattern.png" alt="" className="w-96 h-96" />
        </div>
        {/* Center Right */}
        <div className="absolute right-1/3 center opacity-[0.03] rotate-[-25deg]">
          <img src="/images/logo-pattern.png" alt="" className="w-96 h-96" />
        </div>
        {/* Bottom Right */}
        <div className="absolute -right-20 -bottom-20 opacity-[0.03] rotate-[30deg]">
          <img src="/images/logo-pattern.png" alt="" className="w-96 h-96" />
        </div>
      </div>

      <Header announcements={announcements}/>
      <Base title={title}>  
          <NextUIProvider>
          <section id="salah"  
          >
            <SalahTimer salah={salah} adhanResponse={adhan} />
         
            {/* <Banner/> */}
            <br/>
            <SalahCard salah={salah} adhanResponse={adhan} colors={colors}  />
          </section>
      

        {/* Announcements */}
        <section className="section bg-theme-light pb-[50px]" id="announcements">
          <Announcements announcements={announcements} />
        </section>

        {/* Features */}
        <section className="section" >
          <FeatureCard  />
        </section>

        {/* about us */}
        <section className="section bg-theme-light" id="about">
          <div className="container mx-auto px-4">
            <h2 className="font-light mb-8 text-center">About Us</h2>
            <div className="text-center lg:text-left mb-8">
              The Islamic Center of Torrance, previously known as the Islamic Institute of Torrance was established with the purpose of providing a place of worship and education for those of the Islamic faith within the 
              Torrance and surrounding areas. 
            </div>

            {/* Imam Section */}
            <div className="mt-12">
              <h4 className="text-lg mb-8 text-center">
                Meet Our Resident Imam!
              </h4>
              
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Image Container */}
                <div className="lg:w-1/3">
                  <img
                    src="/images/imam.jpeg"
                    alt="Sheikh Ahmad Umarji"
                    className="rounded-lg shadow-md max-w-full h-auto"
                  />
                  <h5 className="text-md font-medium mt-4 text-center lg:text-left">
                    Sheikh Ahmad Umarji
                  </h5>
                </div>

                {/* Text Container */}
                <div className="lg:w-2/3 flex items-center">
                  <p className="font-light lg:pl-8 text-center lg:text-left">
                    Imam Ahmed Umarji graduated from the Tahfidh and Alimiyyah programs in South Africa, 
                    where he studied under esteemed scholars such as Mufti Radha Ul Haq and Mufti Sulaiman Moola. 
                    He holds Ijazahs in Qiraaat, Tafseer, and Hadith. In addition, he has a BS degree from 
                    Cal Poly Pomona. After graduation, Imam Ahmed served as a Quran and Islamic Studies teacher. 
                    Currently, he is the Imam and Religious Director at IIT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="donate" style={{ backgroundColor: '#004AAD'}}>
            <Donate/>
        </section>



        {/* Contact Us */}
        <section className="section bg-theme-light" id="contactUs">
          <ContactUs questions={questions} theme={theme} />
        </section>
        </NextUIProvider>
      </Base>
    </div>
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
