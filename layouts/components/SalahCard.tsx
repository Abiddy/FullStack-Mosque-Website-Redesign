import { markdownify } from "@lib/utils/textConverter";
import moment from "moment";
import SunriseSunset from "./SunriseSunset";
import RandomVerse from "./AyahGenerator";

const SalahCard = ({ salah, colors }: any) => {
  const timings = salah?.data[0]?.attributes;

  console.log({salah})

  const formatTime = (time: any) => {
    return moment(time, "HH:mm:ss.SSS").format("hh:mm A");
  };

  return (
    <div className="container mx-auto">

      <div className="mt-20"></div>

  
      <RandomVerse />
      <div id="salah"></div>
      {/* Prayer Times */}
      <div className="bg-white p-6 rounded-xl" style={{ backgroundColor: '#F8F8F8' }}>
        <div className="text-left mb-10">
          <div className="flex justify-content">
        <img src="/images/app.png" alt="Fajr" className="h-6 w-6 mr-3 mt-2" />
        <div>
          <h2 className="text-xl font-semibold">ICT Prayer Times</h2>
          <p className="text-sm text-gray-500">Torrance, California</p>
          </div>
          </div>        
        </div>
        <div className="flex flex-col gap-4">
          {/* Fajr */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="/images/dawn.png" alt="Fajr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Fajr</p>
              </div>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.fajr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Dhuhr */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="/images/clock.png" alt="Dhuhr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Dhuhr</p>
              </div>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.dhuhr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Asr */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="/images/afternoon.png" alt="Asr" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Asr</p>
              </div>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.asr)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Maghrib */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="/images/sunset.png" alt="Maghrib" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Maghrib</p>
              </div>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.maghrib)}</p>
            </div>
            <hr className="my-2 border-gray-200" />
          </div>

          {/* Isha */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src="/images/night.png" alt="Isha" className="h-6 w-6 mr-4" />
                <p className="text-md font-semibold">Isha</p>
              </div>
              <p className="text-md font-normal text-gray-600">{formatTime(timings?.isha)}</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <SunriseSunset />
        <br/>
    </div>
  );
};

export default SalahCard;