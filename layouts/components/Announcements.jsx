import React from "react";

const Announcements = () => {
  const announcements = {
    data: [
      {
        attributes: {
          Heading: "Halaqah",
          Description:
            "IIT Weekly programs by Shaykh Ahmed Umarji- for Tafseer on Tuesday and Seerah on Thursday after Isha",
          Date: "TUESDAY/THURSDAY AFTER ISHA",
        },
      },
      {
        attributes: {
          Heading: "Recite Quran in Group Setting",
          Description:
            "Morning Quran Halqa from Monday to Saturday after Fajr Salat. Recite Quran in Group Setting",
          Date: "EVERY MORNING AFTER FAJR",
        },
      },
      {
        attributes: {
          Heading: "First Friday Khutba 12:20 pm 12:40-45 pm",
          Description: "KHUTBA - 12:20 pm KHATIB - TBA SALAT - 12:40-45 pm",
          Date: "RECENT",
        },
      },
      {
        attributes: {
          Heading: "Friday Khutba First 12:20 Salat 12:40-45 Second 1:20 Salat 1:40-45",
          Description: "KHUTBA - 12:20 pm KHATIB - IIT TBA SALAT - 1:20-1:40-45 pm",
          Date: "RECENT",
        },
      },
    ],
  };

  return (
    <div className="px-4 md:px-8">
      <header className="text-center mb-16 md:mb-24 max-w-xl mx-auto">
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white mb-8">
          IIT Events & Announcements
        </p>
        <p className="font-serif text-sm md:text-base text-white/80 leading-[1.85]">
          Stay updated with the latest announcements and news from our community.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-20 gap-x-10 md:gap-x-16 max-w-5xl mx-auto">
        {announcements.data.map((announcement, index) => (
          <article
            key={index}
            className="text-center bg-transparent border-0 shadow-none px-2 md:px-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-6 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-white/55">
              <span className="text-white/90">Event</span>
              <span className="text-white/25" aria-hidden>
                ·
              </span>
              <span>{announcement.attributes.Date || "Recent"}</span>
            </div>

            <h3 className="font-sans text-sm md:text-base font-medium uppercase tracking-[0.18em] text-white mb-5 leading-snug">
              {announcement.attributes.Heading || "Announcement"}
            </h3>

            <p className="font-serif text-sm md:text-[15px] text-white/85 leading-[1.85] max-w-md mx-auto">
              {announcement.attributes.Description || "No description available."}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
