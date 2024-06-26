

const Announcements = ({ announcements }) => {
  // Check if announcements and announcements.data exist
  if (!announcements || !announcements.data) {
    return <div>Loading...</div>;
  }

  console.log({announcements})

  return (
    <div className="container mx-auto py-5 px-6">
      <div className="row text-center">
        <div className="mx-auto lg:col-10">
          <div className="flex ml-2 mb-10 text-white">
          <h3 className="text-2xl font-normal mr-2 ">{announcements.data.length} </h3>
            <h3 className="text-2xl font-normal "> Announcements</h3>
          </div>
          <div className="flex flex-col items-center">
            {announcements.data.map((announcement) => (
              <div
                key={announcement.id}
                className="p-6 rounded-lg shadow-md  text-left w-full max-w-lg mb-6"
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="/images/imam.jpeg"
                    alt="Speaker"
                    className="shadow-md h-16 w-16 rounded-full mr-4"
                  />
                  <div className="text-lg leading-relaxed">
                    <p className="font-normal text-black">{announcement.attributes.Heading}</p>
                    <p className="text-black-300 text-s">Date: {new Date(announcement.attributes.EventDate).toLocaleDateString()}</p>
                    <p className="font-light text-black-200">{announcement.attributes.Description}</p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
