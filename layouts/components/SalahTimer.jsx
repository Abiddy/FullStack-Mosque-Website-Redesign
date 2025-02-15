import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, // for Fajr and Ishraaq
  faMoon, // for Isha and Tahajjud
  faClock, // for other prayers
  faStarAndCrescent, // for Maghrib
  faCloudSun, // for Dhuhr
  faCloudSunRain, // for Asr
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const SalahTimer = ({ salah, adhanResponse }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const timing = salah?.data[0]?.attributes;

  const adhan = adhanResponse?.data?.timings

  const formatTime = (time, addMinutes) => {
    const formattedTime = moment(time, "HH:mm:ss.SSS").add(addMinutes, 'minutes').format("hh:mm a").replace(/^0/, '');
    return formattedTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to get the remaining time until the next event
  const getTimeRemaining = (eventTime) => {
    const now = new Date();
    const event = new Date(eventTime);
    const difference = event - now;
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h:${minutes}m:${seconds}s`;
  };

  // Define prayer times with their icons and descriptions
  const prayerConfig = {
    isha: {
      icon: faMoon,
      name: 'Isha',
      getTime: (adhan) => {
        const time = new Date(`${getCurrentDateString()}T${adhan?.Isha}`);
        // If this time is in the future, it's from yesterday
        if (time > currentTime) {
          time.setDate(time.getDate() - 1);
        }
        return time;
      }
    },
    tahajjud: {
      icon: faMoon,
      name: 'Tahajjud',
      getTime: (adhan) => {
        // Get Isha time
        const ishaTime = new Date(`${getCurrentDateString()}T${adhan?.Isha}`);
        if (ishaTime > currentTime) {
          ishaTime.setDate(ishaTime.getDate() - 1);
        }
        
        // Get Fajr time
        const fajrTime = new Date(`${getCurrentDateString()}T${adhan?.Fajr}`);
        if (fajrTime < ishaTime) {
          fajrTime.setDate(fajrTime.getDate() + 1);
        }

        // Calculate the night duration
        const nightDuration = fajrTime.getTime() - ishaTime.getTime();
        
        // Last third of night starts at: Isha + (2/3 * night duration)
        const tahajjudTime = new Date(ishaTime.getTime() + (nightDuration * 2/3));
        
        return tahajjudTime;
      }
    },
    fajr: {
      icon: faSun,
      name: 'Fajr',
      getTime: (adhan) => new Date(`${getCurrentDateString()}T${adhan?.Fajr}`)
    },
    ishraaq: {
      icon: faSun,
      name: 'Ishraaq',
      // 20 minutes after sunrise
      getTime: (adhan) => {
        const sunriseTime = new Date(`${getCurrentDateString()}T${adhan?.Sunrise}`);
        return new Date(sunriseTime.getTime() + 20 * 60000);
      }
    },
    dhuhr: {
      icon: faCloudSun,
      name: 'Dhuhr',
      getTime: (adhan) => new Date(`${getCurrentDateString()}T${adhan?.Dhuhr}`)
    },
    asr: {
      icon: faCloudSunRain,
      name: 'Asr',
      getTime: (adhan) => new Date(`${getCurrentDateString()}T${adhan?.Asr}`)
    },
    maghrib: {
      icon: faStarAndCrescent,
      name: 'Maghrib',
      getTime: (adhan) => {
        const time = new Date(`${getCurrentDateString()}T${adhan?.Maghrib}`);
        // If this time is in the future, it's from yesterday
        if (time > currentTime) {
          time.setDate(time.getDate() - 1);
        }
        return time;
      }
    }
  };

  const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Update timings object to use the new config
  const timings = Object.entries(prayerConfig).reduce((acc, [key, config]) => {
    acc[key] = config.getTime(adhanResponse?.data?.timings);
    return acc;
  }, {});

  const getCurrentAndNextEvent = () => {
    const now = currentTime.getTime();
    const events = Object.entries(timings).sort((a, b) => a[1].getTime() - b[1].getTime());
    
    // Find the first prayer time that hasn't happened yet
    const nextEventIndex = events.findIndex(event => event[1].getTime() > now);
    
    // If no future prayer found, next is first prayer of tomorrow
    if (nextEventIndex === -1) {
      return {
        currentEvent: events[events.length - 1], // Last prayer of today
        nextEvent: events[0] // First prayer of tomorrow
      };
    }
    
    // If we're before the first prayer of the day
    if (nextEventIndex === 0) {
      return {
        currentEvent: events[events.length - 1], // Last prayer of yesterday
        nextEvent: events[0] // First prayer of today
      };
    }
    
    // Return current prayer (the one before next) and next prayer
    return {
      currentEvent: events[nextEventIndex - 1],
      nextEvent: events[nextEventIndex]
    };
  };

  const { currentEvent, nextEvent } = getCurrentAndNextEvent();

  const logoColor = "#D4AF37"; // Golden color matching the logo
  const logoColorLight = "#e8f3d4"; // Light version of the golden color for background

  return (
    <section
      id="salah"
      style={{
        padding: '10px',
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '360px',
        backgroundColor: '#fff',
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '17px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', gap: '8px', fontSize: '10px', opacity: 0.7 }}>
          <span style={{ flex: 1, textAlign: 'center' }}>Current</span>
          <span style={{ width: '10px' }}></span>
          <span style={{ flex: 1, textAlign: 'center' }}>Next</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', justifyContent: 'space-between' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '4px 12px',
              backgroundColor: '#faf6e9',
              borderRadius: '5px',
              border: `1px solid ${logoColor}`,
              color: logoColor,
              flex: 1,
            }}
          >
            <FontAwesomeIcon icon={prayerConfig[currentEvent[0]].icon} />
            <span style={{ marginRight: 'auto' }}>{prayerConfig[currentEvent[0]].name}</span>
            <span>
              {currentEvent[1].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <FontAwesomeIcon 
            icon={faArrowRight} 
            style={{ fontSize: '10px', opacity: 0.5, color: logoColor }} 
          />

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              padding: '4px 12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
              flex: 1,
            }}
          >
            <FontAwesomeIcon icon={prayerConfig[nextEvent[0]].icon} />
            <span style={{ marginRight: 'auto' }}>{prayerConfig[nextEvent[0]].name}</span>
            <span>
              {nextEvent[1].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalahTimer;
