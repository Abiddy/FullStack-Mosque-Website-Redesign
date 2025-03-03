import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const images = [
  "images/banner4.jpeg",
  "images/banner1.png",
  "images/banner5.jpeg",
];

export function Banner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <div 
      ref={emblaRef} 
      style={{ overflow: 'hidden',   marginTop: '110px' }}
    >
      <div 
        className="" 
        style={{ display: 'flex' }}
      >
        <div 
          className="embla__slide" 
          style={{ flex: '0 0 100%', minWidth: '0' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', padding: '15px', boxSizing: 'border-box' }}>
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
              <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: '400', color: 'black', margin: '0' }}>
                ISLAMIC INSTITUTE OF TORRANCE
              </h1>
            </div>
            <p style={{ textAlign: 'center', fontSize: '13px', color: 'black', maxWidth: '90%', marginTop: '5px', fontWeight: '300' }}>
            Located on 182nd Street in Torrance, The Islamic Institute of Torrance is a small mosque with a big heart, dedicated to fostering a close-knit community and offering spiritual guidance, educational programs, and support to the surrounding areas including Lawndale, Inglewood, Gardena, and Redondo Beach.
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
