import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Intro */}
      <header className="text-center px-1 sm:px-0">
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/95 mb-5 sm:mb-6 md:mb-7">
          About Us
        </p>
        <p className="font-serif text-[15px] sm:text-base md:text-[17px] text-white/85 leading-[1.75] sm:leading-[1.8] max-w-[34rem] mx-auto">
          The Islamic Institute of Torrance was established with the purpose of providing a place of worship and education
          for those of the Islamic faith within the Torrance and surrounding areas.
        </p>
      </header>

      {/* Imam block — visually separated, one grid on lg */}
      <div className="mt-12 sm:mt-14 md:mt-20 pt-10 sm:pt-12 md:pt-16 border-t border-white/15">
        <p className="font-sans text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-white/60 mb-8 sm:mb-10 md:mb-11 text-center lg:text-left px-1 sm:px-0">
          Meet Our Resident Imam
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-11 md:gap-12 lg:gap-12 lg:items-start">
          <figure className="lg:col-span-4 flex flex-col items-center lg:items-start mx-auto lg:mx-0">
            {/* ~3:4 frame sized so portrait height sits close to the bio paragraph beside it */}
            <div className="relative aspect-[3/4] w-[min(100%,176px)] sm:w-[192px] lg:w-[200px] rounded-md overflow-hidden bg-black/20 ring-1 ring-white/25 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/imam.jpeg"
                alt="Sheikh Ahmad Umarji"
                fill
                sizes="(max-width: 1024px) 192px, 200px"
                className="object-cover object-top"
                priority
              />
            </div>
            <figcaption className="mt-4 sm:mt-5 w-full max-w-[200px] lg:max-w-[200px] text-center lg:text-left">
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-white/90 block">
                Sheikh Ahmad Umarji
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/45 mt-1.5 block">
                Resident Imam
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-8 min-w-0 pt-0 lg:pt-0.5">
            <p className="font-serif text-[15px] sm:text-base md:text-[17px] text-white/88 leading-[1.75] sm:leading-[1.82] text-center lg:text-left max-w-prose mx-auto lg:mx-0">
              &quot;Imam Ahmed Umarji graduated from the Tahfidh and Alimiyyah programs in South Africa, where he studied
              under esteemed scholars such as Mufti Radha Ul Haq and Mufti Sulaiman Moola. He holds Ijazahs in Qiraaat,
              Tafseer, and Hadith. In addition, he has a BS degree from Cal Poly Pomona. After graduation, Imam Ahmed
              served as a Quran and Islamic Studies teacher. Currently, he is the Imam and Religious Director at
              IIT.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
