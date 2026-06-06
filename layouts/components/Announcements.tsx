import TextFade from "./ui/TextFade";

const ANNOUNCEMENTS = [
  {
    heading: "Halaqah",
    description:
      "IIT Weekly programs by Shaykh Ahmed Umarji — Tafseer on Tuesday and Seerah on Thursday after Isha.",
    date: "Tuesday / Thursday after Isha",
  },
  {
    heading: "Recite Quran in Group Setting",
    description:
      "Morning Quran Halqa from Monday to Saturday after Fajr Salat. Recite Quran in a group setting.",
    date: "Every morning after Fajr",
  },
  {
    heading: "First Friday Khutba 12:20 pm · Salat 12:40–45 pm",
    description: "KHUTBA — 12:20 pm · KHATIB — TBA · SALAT — 12:40–45 pm",
    date: "Fridays",
  },
  {
    heading: "Second Jumu'ah 1:20 pm · Salat 1:40–45 pm",
    description: "KHUTBA — 1:20 pm · KHATIB — IIT TBA · SALAT — 1:40–45 pm",
    date: "Fridays",
  },
];

const Announcements = () => {
  return (
    <section id="announcements" className="fm-section px-6 py-14 md:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <TextFade className="mb-12 md:mb-16">
          <p className="mb-4 text-sm text-[#646464]">Community updates</p>
          <h2 className="font-pp max-w-[900px] text-[32px] leading-[0.95] text-[#2c2c2c] md:text-[50px] lg:max-w-[700px] lg:text-[56px]">
            Events & announcements from IIT
          </h2>
          <p className="mt-5 max-w-[620px] text-base leading-relaxed text-[#444141] lg:max-w-[520px] md:text-lg">
            Stay updated with the latest programs, Jumu&apos;ah times, and news
            from our community.
          </p>
        </TextFade>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {ANNOUNCEMENTS.map((item, i) => (
            <article
              key={i}
              className="fm-card flex flex-col rounded-2xl p-6 md:p-8"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#b4b8b4]">
                {item.date}
              </p>
              <h3 className="font-pp mb-3 text-xl leading-tight text-[#2c2c2c] md:text-2xl">
                {item.heading}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-[#444141] md:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
