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
import WeeklyProgram from './WeeklyProgram';

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto">

        {/* Quran Verse */}
        <div className="text-center mb-3 p-2 lg:col-span-3">
          <p className="text-xs text-gray-600">
            "Say, "Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allāh, Lord of the worlds."
          </p>
          <p className="text-xs font-medium mt-1 text-[#D4AF37]">
            - Surah Al-Baqarah, Verse 162
          </p>
        </div>

        {/* Prayer Times Card - Spans 2 columns on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Prayer Times</h3>
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
