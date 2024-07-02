import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import SunriseSunset from "./SunriseSunset";
import Ayahs from "@layouts/components/ayahCarousal/Ayahs";

interface AdhanTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const SalahCard = ({ salah, colors }: any) => {
  const timings = salah?.data[0]?.attributes;
  const [adhan, setAdhan] = useState<AdhanTimings | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get("http://api.aladhan.com/v1/timingsByCity", {
          params: {
            city: "Torrance",
            country: "USA",
            method: 2, // Method 2 corresponds to ISNA
            school: 1,
            apiKey: process.env.NEXT_PUBLIC_ALADHAN_API_KEY,
          },
        });
        setAdhan(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  console.log({adhan})

  const formatTime = (time: any) => {
    return moment(time, "HH:mm:ss.SSS").format("hh:mm a");
  };

  const currentTime = moment().format("hh:mm A");

  return (
    <div className="container mx-auto">
      <div className="mt-16"></div>
      <div id="salah"></div>
      {/* Prayer Times */}
      <div className="bg-white p-6 rounded-xl" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="text-left mb-10">
          <div className="flex justify-content">
            <img src="/images/frame1.png" alt="App" className="h-11 w-11 mr-4 mt-1" />
            <div>
              <h2 className="text-xl font-light">Islamic Center of Torrance</h2>
              <div className="flex items-center mt-1">
              <div className="flex items-center mt-1">
                <p className="text-xs font-light text-gray-500">Torrance, CA  -  {currentTime}</p>
                <img src="/images/updated.png" alt="App" className="h-4 w-4 ml-2" />
              </div>
              </div>
            </div>
          </div>        
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4 items-center justify-items-center">
          <div>

          </div>
          <div>
            <p className="text-md font-light">Adhan</p>
          </div>
          <div>
            <p className="text-md font-light">Iqama</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* Fajr */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div className="flex justify-self-start">
                <img src="/images/dawn.png" alt="Fajr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Fajr</p>
              </div>
              <p className="text-md font-light text-gray-600">{formatTime(adhan?.Fajr)}</p>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.fajr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Dhuhr */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div className="flex justify-self-start">
                <img src="/images/clock.png" alt="Dhuhr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Dhuhr</p>
              </div>
              <p className="text-md font-light text-gray-600">{formatTime(adhan?.Dhuhr)}</p>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.dhuhr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Asr */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div className="flex justify-self-start">
                <img src="/images/afternoon.png" alt="Asr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Asr</p>
              </div>
              <p className="text-md font-light text-gray-600">{formatTime(adhan?.Asr)}</p>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.asr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Maghrib */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div className="flex justify-self-start">
                <img src="/images/sunset.png" alt="Maghrib" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Maghrib</p>
              </div>
              <p className="text-md font-light text-gray-600">{formatTime(adhan?.Maghrib)}</p>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.maghrib)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Isha */}
          <div>
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <div className="flex justify-self-start">
                <img src="/images/night.png" alt="Isha" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Isha</p>
              </div>
              <p className="text-md font-light text-gray-600">{formatTime(adhan?.Isha)}</p>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.isha)}</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <SunriseSunset friday={formatTime(timings?.fridayPrayer)} />
      <br/>
      <Ayahs/>
    </div>
  );
};

export default SalahCard;
