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
    <div className="container mx-auto mt-20" style={{ backgroundColor: 'white'}}>

      <div className="bg-white p-6 shadow-md rounded-xl mb-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Ramadan 2025!</h3>
          <p className="text-sm text-gray-600 mb-4 text-center pb-3">
            Get ready for the blessed month of spiritual growth and increased rewards! Download our Ramadan prayer schedule to stay updated with prayer times during the blessed month
          </p>
          <a
            href="/images/IIT-Ramadan-Schedule.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#c19b20] transition-colors"
          >
            <svg 
              className="w-4 h-4 mr-2" 
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
            Download Schedule
          </a>
        </div>
      </div>



    
      {/* Prayer Times */}

      <div className="bg-white p-6 shadow-md rounded-xl " >
      <div className="flex justify-center mt-4 mb-4">
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
                    icon={faSun} 
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
                    icon={faClock} 
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
                    icon={faCloudSun} 
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
                    icon={faStarAndCrescent} 
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
                    icon={faMoon} 
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
      <br/>
      <SunriseSunset fridayKhutbah={timings?.fridayKhutbah} fridayPrayer={timings?.fridayPrayer}  />
      <br/>
      <Ayahs/>
      <br/>
      <br/>
    </div>
  );
};

export default SalahCard;
