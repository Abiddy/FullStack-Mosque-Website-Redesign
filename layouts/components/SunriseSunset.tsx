import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";

const SunriseSunset = () => {
  const [times, setTimes] = useState({ sunrise: '', sunset: '' });

  useEffect(() => {
    const fetchSunriseSunset = async () => {
      try {
        const response = await axios.get('https://api.sunrise-sunset.org/json', {
          params: {
            lat: 33.8358,
            lng: -118.3406,
            formatted: 0,
          },
        });

        const sunrise = new Date(response.data.results.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(response.data.results.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setTimes({ sunrise, sunset });
      } catch (error) {
        console.error('Error fetching sunrise and sunset times:', error);
      }
    };

    fetchSunriseSunset();
  }, []);

  const formatTime = (time: any) => {
    return moment(time, "HH:mm:ss.SSS").format("hh:mm A");
  };

  return (
<div className="flex justify-between items-center bg-white p-3 rounded-xl  mb-4 pl-14 pr-14"  style={{ backgroundColor: '#F8F8F8' }}>
  <div className="flex flex-col items-center">
    <img src="/images/horizon.png" alt="Sunrise" className="h-10 mb-2" />
    <p className="text-xs text-gray-500">Sunrise</p>
    <p className="text-lg font-semibold">{formatTime(times?.sunrise)}</p>
  </div>
  <div className="h-16 w-px bg-gray-300 mx-8"></div> 
  <div className="flex flex-col items-center">
    <img src="/images/ocean.png" alt="Sunset" className="h-10 mb-2" />
    <p className="text-xs text-gray-500">Sunset</p>
    <p className="text-lg font-semibold">{formatTime(times?.sunset)}</p>
  </div>
</div>

  );
};

export default SunriseSunset;
