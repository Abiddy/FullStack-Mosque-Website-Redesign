import config from "@config/config.json";
import theme from "@config/theme.json";
import Base from "@layouts/Baseof";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { useEffect, useState } from "react";
import Banner from "@layouts/components/Announcements";
import SalahList from "@layouts/components/SalahList";
import ContactUs from "@layouts/components/ContactUs";
import FeatureCard from "@layouts/components/FeatureCard";
import OverviewCard from "@layouts/components/OverviewCard";
import SalahCard from "@layouts/components/SalahCard";
import SalahTable from "@layouts/components/SalahTable";
import Announcements from "@layouts/components/Announcements";
import Donate from "@layouts/components/Donate";

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
    <Base title={title}>

      {/* salah times 2 */}
      {salah_type === 2 && (
        <section 
        className="section" 
        // id="salah"
        >
          <SalahCard salah={salah} colors={colors} />
        </section>
      )}

      {/* Banner */}
      <section className="section bg-theme-light pb-[50px]" id="announcements">
        <Announcements announcements={announcements} />
      </section>

      {/* Features */}
      <section className="section">
        <FeatureCard feature={feature} theme={theme} />
      </section>

      {/* salah times 1 */}
      {salah_type === 1 && (
        <section key={`salah-${1}`} className={`section bg-theme-light`}>
          <SalahList salat={salat} />
        </section>
      )}

      {/* salah table */}
      <section className="section bg-theme-light" id="about">
      <div className="container mx-auto  text-center">
          <h2 className=" font-light  mb-8">About Us</h2>
          The Islamic Center of Torrance, previously known as the Islamic Institute of Torrance was established with the puprose of providing a place of worship and education for those of the Islamic faith within the 
          Torrance and surrounding areas. 
          <br/><br/>
          <h4 className="text-lg leading-relaxed mb-8">
            Meet Our Imam!
          </h4>
          <img
          src="/images/imam.jpeg"
          alt="Refresh"      
        />
        <h5 className="text-md mt-4">Sheikh Ahmad Umarji</h5>
          <br/>
          <br/>
          Sheikh Ahmad Umarji is ...
   
  
        </div>
      </section>

      <section className="section" id="donate">
      
        <div className="container mx-auto text-center">
       
          <h2 className="text-4xl font-light  mb-8">Donate</h2>
          {/* <p className="text-lg leading-relaxed mb-4">
            Islamic Center of Torrance is solely reliant on donations in order to meet its financial needs.  All donations are gratefully received.
          </p> */}
          <div className="text-center pl-4 pr-4 my-8">
          <p className="text-md italic font-light text-gray-500">
            {"The example of those who spend their wealth in the way of Allah is like a seed [of grain] that sprouts seven ears; in every ear are a hundred grains. And Allah multiplies [His reward] for whom He wills. Allah is all-Encompassing and Knowing."}
          </p>
            <p className="text-lg font-medium text-gray-800 mt-2">
              Surah Al-Baqarah (2:261)
            </p>
          </div>
          <br/>
          <Donate/>
          <p className="text-lg leading-relaxed mb-8">
            Donations can be made by mail & check at:
          </p>
          <p className="text-lg font-semibold mb-4">
            Islamic Institute of Torrance <br />
            18103, Prairie Ave, Torrance, CA 90503
          </p>
       
        </div>
      </section>



      {/* Contact Us */}
      <section className="section bg-theme-light" id="contactUs">
        <ContactUs questions={questions} theme={theme} />
      </section>
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
