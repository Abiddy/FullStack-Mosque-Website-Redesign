import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import SunriseSunset from "./SunriseSunset";
import Ayahs from "@layouts/components/ayahCarousal/Ayahs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, // for Fajr
  faClock, // for Dhuhr
  faCloudSun, // for Asr
  faMoon, // for Maghrib
  faStarAndCrescent // for Isha
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const SalahCard = ({ salah, adhanResponse, colors }: any) => {
  const timings = salah?.data[0]?.attributes;

  const adhan = adhanResponse?.data?.timings

  const formatTime = (time: any, addMinutes: number = 0) => {
    const formattedTime = moment(time, "HH:mm:ss.SSS").add(addMinutes, 'minutes').format("hh:mm a").replace(/^0/, '');
    return formattedTime;
  };

  const currentTime = moment().format("MMMM D, YYYY");

  const iconColor = "#D4AF37"; // Golden color matching the logo

  return (
    <div className="container mx-auto" style={{ backgroundColor: 'white'}}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {/* Donation Banner - Spans 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold mb-2">Ramadan Links</h3>
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl mt-4">
                {/* Donate Now */}
                <a
                  href="/#donate"
                  className="flex flex-col items-center p-4 w-[130px] bg-[#EEEAFF] rounded-lg hover:shadow-md transition-all"
                >
                  <svg 
                    className="w-10 h-10 mb-2 text-[#4040FF]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm text-center font-medium text-[#4040FF]">Donate</span>
                </a>
                {/* Ramadan Schedule */}
                <a
                  href="/images/IIT-Ramadan-Schedule.pdf"
                  download
                  className="flex flex-col items-center p-4 w-[130px] bg-[#FFEAF6] rounded-lg hover:shadow-md transition-all"
                >
                  <svg 
                    className="w-10 h-10 mb-2 text-[#E040BB]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="text-sm text-center font-medium text-[#E040BB]">Ramadan Schedule</span>
                </a>
                {/* WhatsApp Group */}
                <a
                  href="https://chat.whatsapp.com/DSInNauAvtSDRDKUPol8hb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 w-[130px] bg-[#E5FFEA] rounded-lg hover:shadow-md transition-all"
                >
                  <svg 
                    className="w-10 h-10 mb-2 text-[#30B050]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm text-center font-medium text-[#30B050]">Itikaf Group</span>
                </a>
                {/* Expenses */}
                <a
                  href="/images/IIT-Expenses.pdf"
                  download
                  className="flex flex-col items-center p-4 w-[130px] bg-[#FFF0EA] rounded-lg hover:shadow-md transition-all"
                >
                  <svg 
                    className="w-10 h-10 mb-2 text-[#FF4040]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-center font-medium text-[#FF4040]">IIT Expenses</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-3 p-2 lg:col-span-3">
        <p className="text-xs text-gray-600">
          "O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may attain Taqwa (God consciousness)"
        </p>
        <p className="text-xs font-medium mt-1 text-[#D4AF37]">
          - Surah Al-Baqarah, Verse 183
        </p>
      </div>

        {/* Prayer Times Card - Spans 2 columns on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 shadow-md rounded-xl">
            <div className="flex justify-center mb-4">
              <img 
                src="/images/iitlogo-2.png" 
                alt="IIT Logo"
                className="h-40 w-60"
              />
            </div>
            <div className="flex items-center justify-center mt-1 mb-5">
              <p className="text-[12px] font-light text-gray-500">{currentTime}</p>
              <img src="/images/updated.png" alt="App" className="h-3 w-3 ml-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 items-center justify-items-center">
              <div >

              </div>
              <div>
                <p className="text-md font-md text-gray-450">Adhan</p>
              </div>
              <div>
                <p className="text-md font-md text-gray-600">Iqama</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* Fajr */}
              <div>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                  <div className="flex justify-self-start">
                    <FontAwesomeIcon 
                      icon={faSun as IconProp} 
                      className="h-5 w-5 mr-4 mt-[4px]"
                      style={{ color: iconColor }} 
                    />
                    <p className="text-md font-semibold">Fajr</p>
                  </div>
                  <p className="text-md font-light text-gray-450">{formatTime(adhan?.Fajr)}</p>
                  <p className="text-md font-semibold text-gray-600">{formatTime(timings?.fajr)}</p>
                </div>
                <hr className="my-2 border-gray-200" />
              </div>

              {/* Dhuhr */}
              <div>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                  <div className="flex justify-self-start">
                    <FontAwesomeIcon 
                      icon={faClock as IconProp} 
                      className="h-5 w-5 mr-4 mt-[4px]"
                      style={{ color: iconColor }} 
                    />
                    <p className="text-md font-semibold">Dhuhr</p>
                  </div>
                  <p className="text-md font-light text-gray-450">{formatTime(adhan?.Dhuhr)}</p>
                  <p className="text-md font-semibold text-gray-600">{formatTime(timings?.dhuhr)}</p>
                </div>
                <hr className="my-2 border-gray-200" />
              </div>

              {/* Asr */}
              <div>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                  <div className="flex justify-self-start">
                    <FontAwesomeIcon 
                      icon={faCloudSun as IconProp} 
                      className="h-5 w-5 mr-4 mt-[4px]"
                      style={{ color: iconColor }} 
                    />
                    <p className="text-md font-semibold">Asr</p>
                  </div>
                  <p className="text-md font-light text-gray-450">{formatTime(adhan?.Asr)}</p>
                  <p className="text-md font-semibold text-gray-600">{formatTime(timings?.asr)}</p>
                </div>
                <hr className="my-2 border-gray-200" />
              </div>

              {/* Maghrib */}
              <div>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                  <div className="flex justify-self-start">
                    <FontAwesomeIcon 
                      icon={faStarAndCrescent as IconProp} 
                      className="h-5 w-5 mr-4 mt-[4px]"
                      style={{ color: iconColor }} 
                    />
                    <p className="text-md font-semibold">Maghrib</p>
                  </div>
                  <p className="text-md font-light text-gray-450">{formatTime(adhan?.Maghrib)}</p>
                  <p className="text-md font-semibold text-gray-600">{formatTime(adhan?.Maghrib, 5)}</p>
                </div>
                <hr className="my-2 border-gray-200" />
              </div>

              {/* Isha */}
              <div>
                <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
                  <div className="flex justify-self-start">
                    <FontAwesomeIcon 
                      icon={faMoon as IconProp} 
                      className="h-5 w-5 mr-4 mt-[4px]"
                      style={{ color: iconColor }} 
                    />
                    <p className="text-md font-semibold">Isha</p>
                  </div>
                  <p className="text-md font-light text-gray-450">{formatTime(adhan?.Isha)}</p>
                  <p className="text-md font-semibold text-gray-600">{formatTime(timings?.isha)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column for Sunrise/Sunset and Ayahs */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Sunrise/Sunset Card */}
          <div className="mt-10">
            <SunriseSunset 
              fridayKhutbah={timings?.fridayKhutbah} 
              fridayPrayer={timings?.fridayPrayer} 
            />
          </div>

          {/* Ayahs Card */}
          <div className="">
            <Ayahs/>
          </div>
        </div>
      </div>

      {/* Add some bottom spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default SalahCard;
