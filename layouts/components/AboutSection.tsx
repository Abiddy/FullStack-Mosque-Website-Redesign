import Image from "next/image";
import TextFade from "./ui/TextFade";

export default function AboutSection() {
  return (
    <section id="about" className="fm-section px-6 py-14 md:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <TextFade className="mb-12 md:mb-16">
          <h2 className="font-pp max-w-[900px] text-[32px] leading-[0.95] text-[#2c2c2c] md:text-[50px] lg:max-w-[700px]">
            About the Islamic Institute of Torrance
          </h2>
          <p className="mt-5 max-w-[620px] text-base leading-relaxed text-[#444141] lg:max-w-[520px] md:text-lg">
            Established to provide a place of worship and education for Muslims
            in Torrance and the surrounding South Bay.
          </p>
        </TextFade>

        <div className="fm-card grid grid-cols-1 gap-10 rounded-2xl p-6 md:p-10 lg:grid-cols-12 lg:items-start">
          <figure className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative aspect-[3/4] w-[200px] overflow-hidden rounded-2xl border-2 border-[#dee2de] bg-[#eef1ed]">
              <Image
                src="/images/imam.jpeg"
                alt="Sheikh Ahmad Umarji"
                fill
                sizes="200px"
                className="object-cover object-top"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center lg:text-left">
              <p className="font-pp text-lg text-[#2c2c2c]">Sheikh Ahmad Umarji</p>
              <p className="mt-1 text-sm text-[#646464]">Resident Imam</p>
            </figcaption>
          </figure>

          <div className="lg:col-span-8">
            <p className="mb-6 text-sm font-medium uppercase tracking-widest text-[#b4b8b4]">
              Meet our resident imam
            </p>
            <p className="text-base leading-relaxed text-[#444141] md:text-lg">
              Imam Ahmed Umarji graduated from the Tahfidh and Alimiyyah programs
              in South Africa, studying under esteemed scholars such as Mufti
              Radha Ul Haq and Mufti Sulaiman Moola. He holds Ijazahs in
              Qiraaat, Tafseer, and Hadith, and has a BS degree from Cal Poly
              Pomona. After graduation, he served as a Quran and Islamic Studies
              teacher. He is currently the Imam and Religious Director at IIT.
            </p>
            <p className="mt-8 text-sm text-[#646464]">
              18103 Prairie Ave, Torrance, CA 90504 · (310) 956-8006
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
