import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import SunriseSunset from "./SunriseSunset";
import Ayahs from "@layouts/components/ayahCarousal/Ayahs";

const SalahCard = ({ salah, colors }: any) => {
  const timings = salah?.data[0]?.attributes;
  const [adhan, setAdhan] = useState<any>();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get("/api/prayerTimes");
        setAdhan(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  console.log({adhan})

  const formatTime = (time: any) => {
    return moment(time, "HH:mm:ss.SSS").format("hh:mm a").replace(/^0/, '');
  };

  const currentTime = moment().format("MMMM D, YYYY");

  return (
    <div className="container mx-auto pt-10" style={{ backgroundColor: '#004AAD'}}>
    
      {/* Prayer Times */}

    <div className="bg-white p-6 shadow-md rounded-xl " style={{backgroundColor: '#F8F8F8' }}>
      <h2 className="flex  text-2xl font-light mb-2 mt-4">ICT Prayer Times</h2>
      <div className="flex items-center mt-1 mb-5">
          <p className=" flex justify-centertext-xs font-light text-gray-500">{currentTime}</p>
          <img src="/images/updated.png" alt="App" className="h-4 w-4 ml-2" />
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
                <img src="/images/dawn.png" alt="Fajr" className="h-6 w-6 mr-4" />
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
                <img src="/images/clock.png" alt="Dhuhr" className="h-6 w-6 mr-4" />
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
                <img src="/images/afternoon.png" alt="Asr" className="h-6 w-6 mr-4" />
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
                <img src="/images/sunset.png" alt="Maghrib" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Maghrib</p>
              </div>
              <p className="text-md font-light text-gray-450">{formatTime(adhan?.Maghrib)}</p>
              <p className="text-md font-semibold text-gray-600">{formatTime(timings?.maghrib)}</p>
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
              <p className="text-md font-light text-gray-450">{formatTime(adhan?.Isha)}</p>
              <p className="text-md font-semibold text-gray-600">{formatTime(timings?.isha)}</p>
            </div>
          </div>
        </div>
    </div>
      <br/>
      <SunriseSunset friday={formatTime(timings?.fridayPrayer)} />
      <br/>
      <Ayahs/>
      <br/>
      <br/>
    </div>
  );
};

export default SalahCard;
