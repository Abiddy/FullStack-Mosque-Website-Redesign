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

async function getSalah() {
  const res = await fetch("/api/salah");
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

  return (
    <div>
    <Header announcements={announcements}/>
    <Base title={title}>  
        <NextUIProvider>
        <section id="salah"   style={{ backgroundColor: '#004AAD'}} 
        >
                <Banner/>
          <SalahCard salah={salah} colors={colors} />
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
      <div className="container mx-auto  text-center">
        <h2 className=" font-light  mb-8">About Us</h2>
          The Islamic Center of Torrance, previously known as the Islamic Institute of Torrance was established with the puprose of providing a place of worship and education for those of the Islamic faith within the 
          Torrance and surrounding areas. 
          <br/><br/>
          <h4 className="text-lg leading-relaxed mb-8">
            Meet Our Resident Imam!
          </h4>
          <div className="flex align-center justify-center">
          <img
          src="/images/imam.jpeg"
          alt="Refresh"      
        />
        </div>
        <h5 className="text-md mt-4 font-md">Sheikh Ahmad Umarji</h5>
        <br/>
          <p className="font-light pl-8 pr-8">Imam Ahmed Umarji graduated from the Tahfidh and Alimiyyah programs in South Africa, where he studied under esteemed scholars such as Mufti Radha Ul Haq and Mufti Sulaiman Moola. He holds Ijazahs in Qiraaat, Tafseer, and Hadith. In addition, he has a BS degree from Cal Poly Pomona. After graduation, Imam Ahmed served as a Quran and Islamic Studies teacher. Currently, he is the Imam and Religious Director at IIT.</p>
          <br/>
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
