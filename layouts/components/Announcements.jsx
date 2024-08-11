import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Announcements = ({ announcements }) => {
  if (!announcements || !announcements.data) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="container mx-auto py-5 px-6">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <img src="/images/megaphone.png" alt="Megaphone" className="h-16 w-auto mb-2" />
        </div>
        <div className="flex justify-center mt-5 ml-2 mb-10 text-white relative">
            <h3 className="text-2xl font-normal relative">
              Announcements
              <span className="absolute -top-2 -right-5 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {announcements.data.length}
              </span>
            </h3>
          </div>
      </div>
      <Slider {...settings}>
        {announcements.data.map((announcement, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${announcement.attributes.image?.data.attributes.url}`;
          return (
            <div key={index} className="p-4">
              <div className="p-4 rounded-lg text-left bg-white shadow-lg mx-2 mb-10" style={{ maxWidth: '300px', margin: '0 auto' }}>
                <div className="flex flex-col items-center">
                  <img
                    // src={imageUrl}
                    src='images/frame1.png'

                    alt="Announcement"
                    className="rounded-t-lg object-cover mb-4"
                    style={{ height: '200px', width: '100%', borderRadius: '10px' }}
                  />
                  <div className="text-center w-full">
                    <h4 className="font-light text-lg text-gray-800">{announcement.attributes.Heading}</h4>
                    <p className="font-semibold text-small text-gray-800 mb-5">{announcement.attributes.Date}</p>
                    <p className="text-gray-500 text-sm mb-2">{announcement.attributes.Description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Announcements;
