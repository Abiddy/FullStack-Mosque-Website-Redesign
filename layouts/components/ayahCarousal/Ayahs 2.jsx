import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import ayahs from './ayahs.json';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Ayahs = () => {
  const [expandedCards, setExpandedCards] = useState({});
  const [overflowingCards, setOverflowingCards] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card && card.scrollHeight > card.clientHeight) {
        setOverflowingCards(prev => ({ ...prev, [index]: true }));
      }
    });
  }, []);

  const toggleExpand = (index) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="container mx-auto">
      <h2 className="flex justify-center text-2xl font-light mb-4">Ponder on the Quran</h2>
      <Slider {...settings}>
        {ayahs.map((verse, index) => (
          <div key={index} className="p-4">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg" style={{  minHeight: '200px', position: 'relative' }}>
              <p className="font-light mb-2">{verse.number}</p>
              <p 
                ref={(el) => (cardRefs.current[index] = el)}
                className={`leading-relaxed ${expandedCards[index] ? '' : 'h-24 overflow-hidden relative'}`}
              >
                {verse.ayah}
                {!expandedCards[index] && overflowingCards[index] && (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-blue-600 to-transparent"></div>
                )}
              </p>
              {overflowingCards[index] && (
                <div className='flex items-center justify-center mt-4'>
                  <button 
                    className="text-gray-200 text-sm"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedCards[index] ? 'Show Less' : 'Show More'}
                    {/* <img 
                      src={expandedCards[index] ? "/images/down.png" : "/images/up.png"} 
                      alt="Toggle" 
                      style={{ height: '1.4rem', width: 'auto' }} 
                    /> */}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Ayahs;
