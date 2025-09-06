import React from 'react';

const Announcements = ({ announcements }) => {
  if (!announcements || !announcements.data) {
    return (
      <div className="container mx-auto py-12 px-6">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          IIT Events & Announcements
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Stay updated with the latest announcements and news from our community.
        </p>
      </div>

      {/* Announcements Grid - Mobile: Single column, Desktop: Two columns */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {announcements.data.map((announcement, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${announcement.attributes.image?.data.attributes.url}`;
          return (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer group"
            >
              {/* Card Header */}
              <div className="flex items-center mb-3">
                <span className="bg-orange-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                  Event
                </span>
                <span className="text-gray-400 text-xs mx-2">•</span>
                <span className="text-gray-500 text-xs uppercase">
                  {announcement.attributes.Date || 'Recent'}
                </span>
              </div>

              {/* Card Content */}
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:underline">
                    {announcement.attributes.Heading || announcement.attributes.title || 'Announcement'}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {announcement.attributes.Description || announcement.attributes.content || 'No description available.'}
                  </p>
                </div>
                
      
        
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
