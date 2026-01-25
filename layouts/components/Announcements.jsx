import React from 'react';

const Announcements = () => {
  const announcements = {
    data: [
      {
        attributes: {
          Heading: "Halaqah",
          Description: "IIT Weekly programs by Shaykh Ahmed Umarji- for Tafseer on Tuesday and Seerah on Thursday after Isha",
          Date: "TUESDAY/THURSDAY AFTER ISHA",
        }
      },
      {
        attributes: {
          Heading: "Recite Quran in Group Setting",
          Description: "Morning Quran Halqa from Monday to Saturday after Fajr Salat. Recite Quran in Group Setting",
          Date: "EVERY MORNING AFTER FAJR",
        }
      },
      {
        attributes: {
          Heading: "First Friday Khutba 12:20 pm 12:40-45 pm",
          Description: "KHUTBA - 12:20 pm KHATIB - TBA SALAT - 12:40-45 pm",
          Date: "RECENT",
        }
      },
      {
        attributes: {
          Heading: "Friday Khutba First 12:20 Salat 12:40-45 Second 1:20 Salat 1:40-45",
          Description: "KHUTBA - 12:20 pm KHATIB - IIT TBA SALAT - 1:20-1:40-45 pm",
          Date: "RECENT",
        }
      }
    ]
  };

  return (
    <div className="px-4 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-6xl font-light text-gray-900 mb-4 md:mb-6 tracking-tight">
          IIT Events & Announcements
        </h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Stay updated with the latest announcements and news from our community.
        </p>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {announcements.data.map((announcement, index) => {
          return (
            <div 
              key={index} 
              className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-orange-500/50 transition-all duration-500 group"
            >
              {/* Card Header */}
              <div className="flex items-center mb-4 md:mb-6">
                <span className="bg-orange-500 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Event
                </span>
                <span className="text-gray-200 text-xs mx-3">|</span>
                <span className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {announcement.attributes.Date || 'Recent'}
                </span>
              </div>

              {/* Card Content */}
              <div>
                <h3 className="font-medium text-gray-900 text-lg md:text-xl leading-tight mb-3 md:mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {announcement.attributes.Heading || 'Announcement'}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                  {announcement.attributes.Description || 'No description available.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Announcements;
