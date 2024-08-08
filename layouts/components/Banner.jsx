import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const images = [
  "images/banner4.jpeg",
  "images/banner1.png",
  "images/banner2.png",
  "images/banner3.png",
  "images/banner5.jpeg",
];

export function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <div 
      className="mt-20" 
      ref={emblaRef} 
      style={{ overflow: 'hidden', backgroundColor: '#004AAD' }}
    >
      <div 
        className="" 
        style={{ display: 'flex' }}
      >
        <div 
          className="embla__slide" 
          style={{ flex: '0 0 100%', minWidth: '0' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', backgroundColor: '#004AAD', padding: '20px', boxSizing: 'border-box' }}>
            <img
              src="images/arrow.png"
              alt="logo"
              onClick={handleNext}
              style={{ width: '25px', height: 'auto', marginBottom: '20px', position: 'absolute', right: '30px', top: '30px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginBottom: '22px' }}>
              <img
                src="images/newLogo.png"
                alt="logo"
                style={{ width: '110px', height: 'auto', marginBottom: '20px' }}
              />
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: '400', color: 'white', margin: '0' }}>
                ISLAMIC INSTITUTE TORRANCE
              </h1>
            </div>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'rgba(255, 255, 255, 1.2)', maxWidth: '90%', marginTop: '20px', fontWeight: '300' }}>
              Welcome to Islamic Institute of Torrance masjid! Though small, we are blessed with Allah's barakah. IIT serves not only Torrance but also Lawndale, Inglewood, Gardena, and Redondo Beach!
            </p>
          </div>
        </div>

        {images.map((image, index) => (
          <div 
            key={index} 
            className="embla__slide" 
            style={{ flex: '0 0 100%', minWidth: '0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', boxSizing: 'border-box' }}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        ))}
      
      </div>

    </div>
  );
}
