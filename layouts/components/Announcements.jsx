import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Announcements = ({ announcements }) => {
  if (!announcements || !announcements.data) {
    return <div>Loading...</div>;
  }

  console.log({announcements})

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px', // Increase padding to ensure proper spacing
  };

  return (
    <div className="container mx-auto py-5 px-6">
      <div className="row text-center">
        <div className="mx-auto lg:col-10">
          <div className="flex justify-center">
            <img src="/images/megaphone.png" alt="Megaphone" style={{ height: '4rem', width: 'auto' }} />
          </div>
          <div className="flex justify-center mt-5 ml-2 mb-10 text-white relative">
            <h3 className="text-2xl font-normal relative">
              Announcements
              <span className="absolute -top-2 -right-5 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {announcements.data.length}
              </span>
            </h3>
          </div>
          <Slider {...settings}>
            {announcements.data.map((announcement) => {
              const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${announcement.attributes.image.data.attributes.url}`;
              return (
                <div key={announcement.id} className="p-3 rounded-lg text-left" style={{ backgroundColor: 'white', margin: '10px' }}>
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={imageUrl}
                      alt="Speaker"
                      className="shadow-md h-30 w-30 object-cover rounded-t-lg mb-4"
                      style={{ borderRadius: '20px' }}
                    />
                    <div className="text-lg leading-relaxed w-full text-center">
                      <p className="font-normal text-black">{announcement.attributes.Heading}</p>
                      <p className="text-gray-500 text-sm">Date: {new Date(announcement.attributes.EventDate).toLocaleDateString()}</p>
                      <p className="font-extralight text-gray-500 text-s mt-1 mb-2">{announcement.attributes.Description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
