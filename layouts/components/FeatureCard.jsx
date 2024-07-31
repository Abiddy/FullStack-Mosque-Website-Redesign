import React, { useState } from 'react';
import activities from './activities.json'; // Adjust the path as needed

const Modal = ({ title, body, handleClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleClose}>
      <div className="bg-white p-8 rounded-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl mb-4">{title}</h2>
        <p>{body}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const FeatureCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleExpand = (item) => {
    setModalContent({ title: item.name, body: item.readmore });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({ title: '', body: '' });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-light text-3xl">Our Activities</h2>
      </div>
      <div className="grid gap-4 grid-cols-2">
        {activities.map((item, i) => (
          <div key={`feature-${i}`} className="feature-card rounded-xl  bg-white p-3 sm:p-5 text-center transform transition-transform hover:scale-105">
            {item.icon && (
              <div className="flex justify-center mb-4">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                />
              </div>
            )}
            <div>
              <h5 className="font-medium text-sm sm:text-xl">{item.name}</h5>
              <p className="mt-3 text-xs sm:text-base text-gray-600">{item.content}</p>
              <a
                className=" font-medium text-xs sm:text-base text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleExpand(item)}
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal
          title={modalContent.title}
          body={modalContent.body}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FeatureCard;
